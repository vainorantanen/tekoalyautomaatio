import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import LoginSuggestion from '../../LoginSuggestion'
import MessageCard from './MessageCard'
import PortalBidCard from '../../Portal/PortalBidCard'
import { Link } from 'react-router-dom'
import ProjectOfferCard from '../../OpenProjects/ProjectOfferCard'

const AllContactMessages = () => {

    const user = useSelector(({user}) => user)
    const customerInfos = useSelector(({customerInfos}) => customerInfos)
    const userPortalBids = useSelector(({portalBids}) => portalBids)
    const userPortalPosts = useSelector(({portalPosts}) => portalPosts)
    const userFeedPosts = useSelector(({projectPosts}) => projectPosts)
    const userFeedBids = useSelector(({projectOffers}) => projectOffers).filter(f => f.user.id === user.id)


    const contactsToFeedOffers = customerInfos.filter(c => c.relatedFeedBid && !c.relatesToDevPost)
    const contactsToPortalOffers = customerInfos.filter(c => c.relatedPortalBid && !c.relatesToDevPost)
    const contactsToDevPosts = customerInfos.filter(c => c.relatesToDevPost)

    if (!user) {
        return (
            <Box>
                <LoginSuggestion />
            </Box>
        )
    }

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography sx={{
            textAlign: 'center', fontSize: '1.3rem', marginBottom: '1rem'
        }}>{!user.isDeveloper ? 'Lähetetyt yhteydenottopyynnöt' : 'Vastaanotetut yhteydenottopyynnöt'}</Typography>
        <Typography sx={{ fontSize: '1.3rem', textAlign: 'center', borderBottom: '1px solid black' }}>Avoimiin ilmoituksiin liittyvät</Typography>
        {contactsToFeedOffers && contactsToFeedOffers.length > 0 ? (
            contactsToFeedOffers.map(customerinfo => (
                <Container key={customerinfo.id}>
                    <MessageCard customerinfo={customerinfo}/>
                            <Button component={Link} to={`/tarjouskilpailut/${customerinfo.relatedFeedPost}`}>Siirry ilmoitukseen</Button>
                            <Button component={Link} to={`/neuvottelu/${customerinfo.id}`}>Chat</Button>
                            <Typography>Liittyvä tarjous</Typography>
                            <ProjectOfferCard offer={userFeedBids.find(b => b.id === customerinfo.relatedFeedBid)}
                        post={userFeedPosts.find(p => p.id === customerinfo.relatedFeedPost)}
                        />
                        </Container>
            ))
        ) : (
            <Typography>Ei vielä yhteydenottoa</Typography>
        )}
        <Typography sx={{ fontSize: '1.3rem', textAlign: 'center', borderBottom: '1px solid black' }}>
            Portaali-ilmoituksiin liittyvät</Typography>
        {contactsToPortalOffers && contactsToPortalOffers.length > 0 ? (
            contactsToPortalOffers.map(customerinfo => (
                <Container key={customerinfo.id} sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <MessageCard customerinfo={customerinfo}/>
                            <Button component={Link} to={`/portaali/ilmoitukset/${customerinfo.relatedPortalPost}`}>Siirry ilmoitukseen</Button>
                            <Button component={Link} to={`/neuvottelu/${customerinfo.id}`}>Chat</Button>
                            <Typography>Liittyvä tarjous</Typography>
                        <PortalBidCard offer={userPortalBids.find(b => b.id === customerinfo.relatedPortalBid)}
                        post={userPortalPosts.find(p => p.id === customerinfo.relatedPortalPost)}
                        />
                        </Container>
            ))
        ) : (
            <Typography>Ei vielä yhteydenottoa</Typography>
        )}
        <Typography sx={{ fontSize: '1.3rem', textAlign: 'center', borderBottom: '1px solid black' }}>
           Kehittäjien ilmoituksiin liittyvät</Typography>
        {contactsToDevPosts && contactsToDevPosts.length > 0 ? (
            contactsToDevPosts.map(customerinfo => (
                <Container key={customerinfo.id} sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <MessageCard customerinfo={customerinfo}/>
                            <Button component={Link} to={`/kehittajienilmoitukset/${customerinfo.relatedDevPost}`}>Siirry ilmoitukseen</Button>
                            <Button component={Link} to={`/neuvottelu/${customerinfo.id}`}>Chat</Button>
                        </Container>
            ))
        ) : (
            <Typography>Ei vielä yhteydenottoa</Typography>
        )}
    </Container>
  )
}

export default AllContactMessages