import { Box, Button, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'
import { useNotification } from '../../../hooks'
import { modifyProjectApprovedState } from '../../../reducers/activeProjects'

const ProjectsList = () => {

    const user = useSelector(({user}) => user)
    const usersProjects = useSelector(({activeProjects}) => activeProjects)

    const dispatch = useDispatch()
    const notify = useNotification()

    if (!user) {
        return null
    }

    const modifyApprovedState = async (project, newState) => {
        try {
            const result = await dispatch(modifyProjectApprovedState({ ...project, isApproved: newState }))
            if (result && result.error) {
                notify('Tapahtui virhe hyväksyimsessä', 'error')
                return
            } else {
                notify('Hyväksytty onnistuneesti')
            }
        } catch (error) {
            notify('Tapahtui virhe hyväksyimsessä', 'error')
        }
    }

    const activeProjects = usersProjects.filter(p => p.isApproved === 'accepted' && !p.isReady)
    const projectRequests = usersProjects.filter(p => p.isApproved === 'waiting')
    const readyProjects = usersProjects.filter(p => p.isReady)
    const declinedProjects = usersProjects.filter(p => p.isApproved === 'rejected')

  return (
    <Container sx={{ marginTop: '5rem', minHeight: '80vh' }}>
        <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>Aktiiviset projektit</Typography>
        <Divider sx={{ my: 4 }} />
        {usersProjects && activeProjects.length > 0 ? (
           activeProjects.map(project => (
            <Box key={project.id}>
                 <ProjectCard project={project}/>
               
      <Button component={Link} to={`/profiili/projektit/${project.id}`}
      variant='contained'>Tarkastele</Button>
                             <Divider sx={{ my:2 }}/>
            </Box>
           ))
        ): <Typography>Ei projekteja</Typography>}
        <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>Projektipyynnöt</Typography>
        <Divider sx={{ my: 4 }} />
        {usersProjects && projectRequests.length > 0 ? (
           projectRequests.map(project => (
            <Box key={project.id}>
                 <ProjectCard project={project}/>
      <Button variant='contained' onClick={() => modifyApprovedState(project, 'accepted')}>Hyväksy</Button>
      <Button sx={{ color: 'red' }} onClick={() => modifyApprovedState(project, 'rejected')}>Hylkää</Button>
                             <Divider sx={{ my:2 }}/>
            </Box>
           ))
        ): <Typography>Ei projekteja</Typography>}
        <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>Valmiit</Typography>
        <Divider sx={{ my: 4 }} />
        {usersProjects && readyProjects.length > 0 ? (
           readyProjects.map(project => (
            <Box key={project.id}>
                <ProjectCard project={project}/>
                <Button component={Link} to={`/profiili/projektit/${project.id}`}
      variant='contained'>Tarkastele</Button>
            </Box>
           ))
        ): <Typography>Ei projekteja</Typography>}
        <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>Hylätyt</Typography>
        <Divider sx={{ my: 4 }} />
        {usersProjects && declinedProjects.length > 0 ? (
           declinedProjects.map(project => (
            <Box key={project.id}>
                <ProjectCard project={project}/>
                <Button variant='contained'  onClick={() => modifyApprovedState(project, 'accepted')}>Hyväksy</Button>
            </Box>
           ))
        ): <Typography>Ei projekteja</Typography>}
    </Container>
  )
}

export default ProjectsList