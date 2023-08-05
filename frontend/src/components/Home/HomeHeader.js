import { Box, Typography } from '@mui/material'
import React from 'react'
//import { Link } from 'react-router-dom'
import mobileAppPic from '../../Assets/mobileapp.png'
import Timeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import EmailInput from '../EmailInput'

const HomeHeader = () => {

  return (
    <Box sx={{ marginTop: '6rem' }}>
      <Typography
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          '@media (max-width: 442px)': {
            fontSize: '1.5rem',
            marginBottom: '2rem'
          },
        }}
      >Tekoälyautomaatio.fi</Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          textAlign: 'left',
          width: '40vw',
          '@media (max-width: 600px)': {
            width: '80vw',
          },
        }}>
          <Typography
            sx={{
              fontSize: '2.5rem',
              '@media (max-width: 442px)': {
                fontSize: '1.4rem',
              },
            }}
          ><span style={{ color: '#70A0FF' }}>Paras</span> tapa toteuttaa tekoälyprojektit.</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box>
              <Timeline sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector sx={{ bgcolor: 'primary.main' }}/>
                  </TimelineSeparator>
                  <TimelineContent sx={{ transition: '0.3s ease', '&:hover': {
            transform: 'scale(1.02)',
          }, }}>1. Määrittele tarpeesi</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    <TimelineConnector sx={{ bgcolor: 'primary.main' }}/>
                  </TimelineSeparator>
                  <TimelineContent sx={{ transition: '0.3s ease', '&:hover': {
            transform: 'scale(1.02)',
          }, }}>2. Lisää ilmoitus</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                  </TimelineSeparator>
                  <TimelineContent sx={{ transition: '0.3s ease', '&:hover': {
            transform: 'scale(1.02)',
          }, }}>3. Valitse paras tekijä</TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
            
          </Box>
          <EmailInput />
        </Box>
        <Box sx={{ transition: '0.3s ease', '&:hover': {
            transform: 'scale(1.05)',
          }, }}>
          <img src={mobileAppPic} alt='pic of mobile app' style={{ maxWidth: '35vw', height: 'auto',
        }}/>
        </Box>
      </Box>
    </Box>
  )
}

export default HomeHeader