import { Box, Typography } from '@mui/material'
import React from 'react'

const AiHow = () => {
  return (
    <Box sx={{ marginTop: '5rem', paddingLeft: '6rem', background: '#121212',
    paddingRight: '6rem', paddingTop: '3rem', paddingBottom: '3rem',
    '@media (max-width: 800px)': {
        padding: '1rem'
      },
    }}>
      <Typography variant="h4" gutterBottom>
        Miten tekoälyä voi hyödyntää liiketoiminnassa?
      </Typography>
      <Typography variant="body1">
        Tekoälyn hyödyntäminen liiketoiminnassa voi tapahtua monin eri tavoin eri toimialoilla ja organisaatioiden tarpeiden mukaan. Alla on joitakin tapoja, joilla tekoälyä voi hyödyntää liiketoiminnassa:
        <ul>
          <li>Asiakaskokemuksen parantaminen:
            <ul>
              <li>Personoidut suositukset ja tarjoukset asiakkaille.</li>
              <li>Chatbotit ja virtuaaliavustajat, jotka tarjoavat nopeaa ja tehokasta asiakaspalvelua.</li>
              <li>Tunteiden tunnistaminen asiakaspalautteesta ja -keskusteluista.</li>
            </ul>
          </li>
          <li>Markkinointi ja myynti:
            <ul>
              <li>Kohdennettu mainonta ja markkinointikampanjat tekoälyn analysoiman datan perusteella.</li>
              <li>Myyntiennustaminen ja potentiaalisten asiakkaiden tunnistaminen.</li>
              <li>Automaattiset myyntiprosessit ja hinnoitteluanalyysit.</li>
            </ul>
          </li>
          {/* Jatka samalla tavalla muilla tavoilla */}
        </ul>
        On tärkeää tunnistaa oman liiketoimintasi tarpeet ja mahdollisuudet ennen kuin päätät, miten aiot hyödyntää tekoälyä. Yhteistyö eri osastojen, asiantuntijoiden ja teknologisten kumppaneiden kanssa voi auttaa suunnittelemaan ja toteuttamaan tehokkaita tekoälyratkaisuja liiketoimintasi kasvattamiseksi.
      </Typography>
    </Box>
  )
}

export default AiHow
