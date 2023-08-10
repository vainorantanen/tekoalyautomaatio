const router = require('express').Router()
const ProjectPost = require('../models/projectPost')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const projectPosts = await ProjectPost
    .find({})
    .populate('user', { name: 1 })
  response.json(projectPosts)
})

router.post('/', userExtractor, async (request, response) => {
  //console.log("RBODY", request.body)
  const { description, timeStamp, title } = request.body
  //console.log("aINFO", additionalinfo)
  const projectPost = new ProjectPost({
    description,
    timeStamp,
    title
  })

  const user = request.user

  if (!user || user.isDeveloper === true) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  projectPost.user = user._id

  let createdprojectPost = await projectPost.save()

  user.projectPosts = user.projectPosts.concat(createdprojectPost._id)
  await user.save()

  createdprojectPost = await ProjectPost.findById(createdprojectPost._id).populate('user')

  response.status(201).json(createdprojectPost)
})

router.put('/:id', async (request, response) => {
  const { description, isOpen } = request.body

  let updatedprojectPost = await ProjectPost.findByIdAndUpdate(request.params.id,  { description, isOpen }, { new: true })

  updatedprojectPost = await ProjectPost.findById(updatedprojectPost._id).populate('user')

  response.json(updatedprojectPost)
})
/*
router.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )

  await user.save()
  await blog.remove()

  response.status(204).end()
})
*/
module.exports = router