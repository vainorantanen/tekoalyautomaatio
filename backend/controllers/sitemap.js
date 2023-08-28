const router = require('express').Router()
//const path = require('path')
const { SitemapStream, streamToPromise } = require('sitemap')

router.get('/', async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: 'https://tekoalyautomaatio.fi',
    })

    // Add your URLs to the sitemap
    smStream.write({ url: '/' })
    smStream.write({ url: '/liiketoiminnassa' })
    smStream.write({ url: '/feed' })
    smStream.write({ url: '/yrityksille' })
    smStream.write({ url: '/lisaailmoitus' })
    smStream.write({ url: '/avoimetprojektit' })
    smStream.write({ url: '/kehittajat' })
    smStream.write({ url: '/users' })

    // End the stream
    smStream.end()

    const sitemapXml = await streamToPromise(smStream).then((data) => data.toString())

    res.header('Content-Type', 'application/xml')
    res.send(sitemapXml)
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

module.exports = router