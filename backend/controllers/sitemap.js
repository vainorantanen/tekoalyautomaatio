const router = require('express').Router()
const path = require('path')

router.get('/', async (request, response) => {
  const filePath = path.join(__dirname, '../sitemap.xml')
  response.sendFile(filePath, function (err) {
    if (err) {
      console.error(err)
      response.status(500).end()
    }
  })
})

module.exports = router