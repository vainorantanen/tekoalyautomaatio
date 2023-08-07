import React from 'react';
import { Box, Typography } from '@mui/material';
import iconsWeb from '../../Assets/network.png'
import robotPic from '../../Assets/robot.png'
import rulerPic from '../../Assets/ruler.png'
import okPic from '../../Assets/ok.png'
import arrowPic from '../../Assets/arrow.png'
import moneyPic from '../../Assets/money.png'
import analyticsPic from '../../Assets/analytics.png'

const AiWhy = () => {
  return (
    <Box sx={{ marginTop: '5rem', display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: '6rem',
    }}>
      <Typography
        sx={{
          fontSize: '1.8rem',
          textAlign: 'center',
          marginBottom: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1.3rem',
            marginBottom: '2rem',
          },
        }}
      >
        Miksi hyödyntää tekoälyä liiketoiminnassa?
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>1. Tehokkuus ja automaatio</Typography>
          <Typography>Tekoäly voi automatisoida monimutkaisia ja aikaa vieviä tehtäviä,
       vapauttaen resursseja tärkeämpiin liiketoimintaprosesseihin. Tämä parantaa tehokkuutta
       ja mahdollistaa henkilöstön keskittymisen luovempiin ja strategisempiin tehtäviin.</Typography>
        </Box>
        <Box>
          <img src={robotPic} alt='pic of robot' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box>
          <img src={rulerPic} alt='pic of ruler' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>2. Tarkkuus ja virheettömyys</Typography>
          <Typography>Tekoälyllä varustetut järjestelmät voivat suorittaa
       tehtäviä korkealla tarkkuudella ja minimoivat inhimilliset virheet.
       Tämä johtaa parempaan laatuun, vähempään virheiden määrään ja siten alentaa kustannuksia.</Typography>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>3. Parempi päätöksenteko</Typography>
          <Typography>Tekoäly voi analysoida suuria määriä dataa ja tuottaa arvokasta
       tietoa päätöksenteon tueksi. Tämä mahdollistaa
       faktoihin perustuvan päätöksenteon ja auttaa ennakoimaan trendejä ja mahdollisuuksia.</Typography>
        </Box>
        <Box>
          <img src={okPic} alt='pic of checkmark' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box>
          <img src={iconsWeb} alt='pic of people network' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>4. Personoidut asiakaskokemukset</Typography>
          <Typography>Tekoäly voi analysoida asiakastietoja ja tarjota
       yksilöllisiä suosituksia ja
       personoituja kokemuksia. Tämä parantaa asiakastyytyväisyyttä ja lisää sitoutumista brändiin.</Typography>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>5. Nopea reagointi ja ennustaminen</Typography>
          <Typography>Tekoäly voi havaita muutoksia markkinoilla
       nopeasti ja ennustaa tulevia trendejä. Tämä auttaa yrityksiä 
      sopeutumaan nopeasti muuttuvaan liiketoimintaympäristöön ja hyödyntämään uusia mahdollisuuksia.</Typography>
        </Box>
        <Box>
          <img src={arrowPic} alt='pic of grapgh' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box>
          <img src={moneyPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>6. Kustannussäästöt</Typography>
          <Typography>Tekoälyn avulla voidaan optimoida
       resurssien käyttöä, vähentää hukkaa ja säästää aikaa, mikä johtaa suoriin kustannussäästöihin.</Typography>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'flex-start',
        gap: '1rem'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '40vw',
          borderRadius: '1rem',
          padding: '1rem',
          '@media (max-width: 600px)': {
            width: '80vw',
          }
        }}>
          <Typography sx={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>7. Kilpailuetu</Typography>
          <Typography> Yritys, joka pystyy tehokkaasti hyödyntämään tekoälyä
       liiketoiminnassaan, voi saavuttaa merkittävän kilpailuedun suhteessa kilpailijoihin. Tekoäly voi mahdollistaa
       innovatiivisten tuotteiden ja palveluiden luomisen sekä uusien markkinoiden avaamisen.</Typography>
        </Box>
        <Box>
          <img src={analyticsPic} alt='pic of mobile app' style={{ maxWidth: '40vw', height: 'auto' }}/>
        </Box>
      </Box>
    </Box>
  );
};

export default AiWhy;
