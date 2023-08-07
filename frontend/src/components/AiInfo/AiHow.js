import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const AiHow = () => {
  return (
    <Box>
      <Container>
        <Typography
              sx={{
                fontSize: '2rem',
                '@media (max-width: 442px)': {
                  fontSize: '1.4rem',
                },
              }}
            >Miten tekoälyä voi hyödyntää liiketoiminnassa?</Typography>
        <Typography>
          Tekoälyn hyödyntäminen liiketoiminnassa voi tapahtua monin eri tavoin eri toimialoilla ja
          organisaatioiden tarpeiden mukaan. Alla on joitakin tapoja, joilla tekoälyä voi hyödyntää
          liiketoiminnassa:
        </Typography>
      </Container>
    <Box
      sx={{
        marginTop: '5rem',
        marginBottom: '4rem',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            color: 'black',
            padding: '0.5rem',
            width: '45vw',
            borderRadius: '0.5rem',
            '@media (max-width: 800px)': {
              width: '80vw',
            },
          }}
        >
          <Typography sx={{ fontSize: '1.5rem' }}>
            Asiakaskokemuksen parantaminen
          </Typography>
          <Typography><CheckIcon />Personoidut suositukset ja tarjoukset asiakkaille.</Typography>
          <Typography><CheckIcon />Chatbotit ja virtuaaliavustajat, jotka tarjoavat nopeaa ja tehokasta asiakaspalvelua.</Typography>
          <Typography><CheckIcon />Tunteiden tunnistaminen asiakaspalautteesta ja -keskusteluista.</Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: 'white',
            color: 'black',
            padding: '0.5rem',
            width: '45vw',
            borderRadius: '0.5rem',
            '@media (max-width: 800px)': {
              width: '80vw',
            },
          }}
        >
          <Typography sx={{ fontSize: '1.5rem' }}>
          Markkinointi ja myynti
          </Typography>
          <Typography><CheckIcon />Kohdennettu mainonta ja markkinointikampanjat tekoälyn analysoiman datan perusteella.</Typography>
          <Typography><CheckIcon />Myynnin ennustaminen ja potentiaalisten asiakkaiden tunnistaminen.</Typography>
          <Typography><CheckIcon />Automaattiset myyntiprosessit ja hinnoitteluanalyysit.</Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: 'white',
            color: 'black',
            padding: '0.5rem',
            width: '45vw',
            borderRadius: '0.5rem',
            '@media (max-width: 800px)': {
              width: '80vw',
            },
          }}
        >
          <Typography sx={{ fontSize: '1.5rem' }}>
          Tuotekehitys ja suunnittelu:
          </Typography>
          <Typography><CheckIcon />Prototyyppien luominen ja optimointi tekoälyn avulla.</Typography>
          <Typography><CheckIcon />Tekoäly avustamassa suunnittelutyökaluja ja -prosesseja.</Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            width: '45vw',
            '@media (max-width: 800px)': {
              width: '80vw',
            },
          }}
        >
          <Typography sx={{ fontSize: '1.5rem' }}>
          Logistiikka ja toimitusketju
          </Typography>
          <Typography><CheckIcon />Varastojen hallinta ja tuotantokapasiteetin optimointi.</Typography>
          <Typography><CheckIcon />Reaaliaikainen seuranta ja ennakoiva ylläpito.</Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            width: '45vw',
            '@media (max-width: 800px)': {
              width: '80vw',
            },
          }}
        >
          <Typography sx={{ fontSize: '1.5rem' }}>
          Rahoitus ja sijoitustoiminta
          </Typography>
          <Typography><CheckIcon />Sijoitusten analysointi ja riskinhallinta tekoälyn avulla.</Typography>
          <Typography><CheckIcon />Markkinatrendien ja taloudellisten indikaattoreiden ennustaminen.</Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            width: '45vw',
            '@media (max-width: 800px)': {
              width: '80vw',
            },
          }}
        >
          <Typography sx={{ fontSize: '1.5rem' }}>
          Teollisuus ja valmistus
          </Typography>
          <Typography><CheckIcon />Automaattinen laadunvalvonta ja virheiden havaitseminen tuotantolinjoilla.</Typography>
          <Typography><CheckIcon />Robottien ja autonomisten ajoneuvojen ohjaaminen ja optimointi.</Typography>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AiHow;
