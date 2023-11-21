const router = require('express').Router()
const Project = require('../models/project')
const ProjectTask = require('../models/projectTask')

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
    const { title, developer, description } = request.body

    const user = request.user

    if (!user) {
      return response.status(401).json({ error: 'Palvelinvirhe (operaatiota ei sallittu)' })
    }


    const project = new Project({
      title,
      timeStamp: new Date(),
      developer: developer.id,
      description
    })

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
    const { content, state } = request.body

    const user = request.user

    const project = await Project.findById(request.params.id)

    if (!user || !project) {
      return response.status(401).json({ error: 'Palvelinvirhe (operaatiota ei sallittu)' })
    }

    const projectTaskToSend = new ProjectTask({
      content,
      timeStamp: new Date(),
      taskState: state
    })

    projectTaskToSend.user = user._id

    await projectTaskToSend.save()

    project.tasks = project.tasks.concat(projectTaskToSend._id)
    let updatedProject = await project.save()

    updatedProject = await Project.findById(project.id)
      .populate({ path: 'tasks' })
      .populate('customer', { name: 1 }).populate('developer', { name: 1 })

    response.status(201).json(updatedProject)
  } catch (error) {
    response.status(500).json({ error: 'Palvelimella tapahtui virhe, yritä myöhemmin uudelleen' })
  }
})

router.put('/:id/updateIsApprovedState', userExtractor, async (request, response) => {
  try {
    const { isApproved } = request.body

    const user = request.user

    const project = await Project.findById(request.params.id)

    if (!user || !project || (project.developer.toString() !== user.id.toString())) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    let updatedProject = await Project.findByIdAndUpdate(request.params.id,  { isApproved }, { new: true })

    updatedProject = await Project.findById(updatedProject._id)
      .populate('customer', { name: 1 }).populate('developer', { name: 1 }).populate({ path: 'tasks' })

    response.json(updatedProject)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }


})

router.put('/:id/updateProjectCompletionState', userExtractor, async (request, response) => {
  try {

    const user = request.user

    const project = await Project.findById(request.params.id)

    if (!user || !project || (project.developer.toString() !== user.id.toString() &&
    project.customer.toString() !== user.id.toString() )) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    let updatedProject

    if (project.developer.toString() === user.id.toString()) {
      updatedProject = await Project.findByIdAndUpdate(request.params.id,  { isCompletedByDev: true }, { new: true })
    } else if (project.customer.toString() === user.id.toString()) {
      updatedProject = await Project.findByIdAndUpdate(request.params.id,  { isCompletedByCustomer: true }, { new: true })
    }

    updatedProject = await Project.findById(updatedProject._id)
      .populate('customer', { name: 1 }).populate('developer', { name: 1 }).populate({ path: 'tasks' })

    response.json(updatedProject)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }


})

router.put('/:id/updateProjectTask/:mid', userExtractor, async (request, response) => {
  try {
    const user = request.user
    const { state, content } = request.body

    const projectTask = await ProjectTask.findById(request.params.mid)
    const project = await Project.findById(request.params.id)

    if (!projectTask || !project) {
      return response.status(400).json({ error: 'Tapahtui virhe! Projektia tai taskia ei löytynyt' })
    }

    if (!user) {
      return response.status(401).json({ error: 'Operaatio ei sallittu' })
    }

    const updatedProjectTask = await ProjectTask.findByIdAndUpdate(request.params.mid, { taskState: state, content }, { new: true })

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

router.delete('/:id/tasks/:tid', userExtractor, async (request, response) => {
  try {
    const project = await Project.findById(request.params.id)
    const user = request.user
    const taskId = request.params.tid

    const taskToDelete = await ProjectTask.findById(taskId)

    if (!user || !(taskToDelete.user.toString() === user._id.toString())) {
      return response.status(401).json({ error: 'operation not permitted' })
    }

    await taskToDelete.remove()

    project.tasks = project.tasks.filter(c => c._id.toString() !== taskId)
    let updatedProject = await project.save()

    updatedProject = await Project.findById(updatedProject.id)
      .populate('customer', { name: 1 }).populate('developer', { name: 1 })
      .populate({ path: 'tasks' })
    response.status(201).json(updatedProject)
  } catch (error) {
    response.status(500).json({ error: 'Palvelinvirhe' })
  }
})

module.exports = router