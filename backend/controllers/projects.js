const router = require('express').Router()
const Project = require('../models/project')
const ProjectTask = require('../models/projectTask')
const DevsPost = require('../models/devsPost')
const ProjectPost = require('../models/projectPost')
const PortalPost = require('../models/portalPost')

const { userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    response.json([])
  } else if (user.username === 'admin') {
    const project = await Project
      .find({}).populate({ path: 'tasks' })
      .populate('customer', { name: 1 }).populate('developer', { name: 1 })
    response.json(project)
  } else if (!user.isDeveloper) {
    // normi käyttäjä voi hakea ne yhteydenotot, jotka hän itse on lähettänyt
    const project = await Project
      .find({ customer: user._id.toString() }).populate({ path: 'tasks' })
      .populate('customer', { name: 1 }).populate('developer', { name: 1 })
    response.json(project)
  } else if (user.isDeveloper) {
    // yrityskäyttäjät voi hakea ne, jotka on kohdistettu heille
    const project = await Project
      .find({ developer: user._id.toString() }).populate({ path: 'tasks' })
      .populate('customer', { name: 1 }).populate('developer', { name: 1 })
    response.json(project)
  } else {
    response.json([])
  }
})

router.post('/', userExtractor, async (request, response) => {
  try {
    // vain asiakas voi aloittaa projektin
    const { title, targetPostId, developer } = request.body

    const user = request.user

    if (!user) {
      return response.status(401).json({ error: 'Palvelinvirhe (operaatiota ei sallittu)' })
    }


    const project = new Project({
      title,
      timeStamp: new Date(),
      developer
    })

    const projectPost = await ProjectPost.findById(targetPostId)
    const portalPost = await PortalPost.findById(targetPostId)
    const devPost = await DevsPost.findById(targetPostId)

    if (projectPost) {
      project.relatedProjectPost = projectPost._id
    } else if (portalPost) {
      project.relatedPortalPost = portalPost._id
    } else if (devPost) {
      project.relatedDevPost = devPost._id
    } else {
      // return error
      return response.status(400).json({ error: 'Palvelinvirhe ilmoituksen löytämisessä' })
    }

    project.customer = user._id

    let createdProject = await project.save()

    createdProject = await Project.findById(createdProject._id)
      .populate('customer', { name: 1 }).populate('developer', { name: 1 })

    response.status(201).json(createdProject)
  } catch (error) {
    response.status(500).json({ error: 'Palvelimella tapahtui virhe, yritä myöhemmin uudelleen' })
  }
})

router.post('/sendProjectTask/:id', userExtractor, async (request, response) => {
  try {
    const { content } = request.body

    const user = request.user

    const project = await Project.findById(request.params.id)

    if (!user || !Project) {
      return response.status(401).json({ error: 'Palvelinvirhe (operaatiota ei sallittu)' })
    }

    const projectTaskToSend = new ProjectTask({
      content,
      timeStamp: new Date(),
    })

    projectTaskToSend.user = user._id

    await projectTaskToSend.save()

    project.tasks = Project.tasks.concat(projectTaskToSend._id)
    let updatedProject = await project.save()

    updatedProject = await Project.findById(Project.id)
      .populate({ path: 'tasks' })
      .populate('customer', { name: 1 }).populate('developer', { name: 1 })

    response.status(201).json(updatedProject)
  } catch (error) {
    response.status(500).json({ error: 'Palvelimella tapahtui virhe, yritä myöhemmin uudelleen' })
  }
})

router.put('/:id/updateProjectTask/:mid', userExtractor, async (request, response) => {
  try {
    const user = request.user
    const { isApproved, content } = request.body

    const projectTask = await ProjectTask.findById(request.params.mid)
    const project = await Project.findById(request.params.id)

    if (!projectTask || !project) {
      return response.status(400).json({ error: 'Tapahtui virhe! Projektia tai taskia ei löytynyt' })
    }

    if (!user) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    // Update the isApproved field of the specified ProjectTask
    const updatedProjectTask = await ProjectTask.findByIdAndUpdate(request.params.mid, { isApproved, content }, { new: true })

    const updatedProjectTaskArray = project.tasks.map(mes =>
      mes._id.equals(updatedProjectTask._id) ? updatedProjectTask : mes
    )

    const updatedProject = await Project.findByIdAndUpdate(
      request.params.id,
      { tasks: updatedProjectTaskArray },
      { new: true })
      .populate('tasks')
      .populate('customer', { name: 1 }).populate('developer', { name: 1 })

    response.json(updatedProject)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router