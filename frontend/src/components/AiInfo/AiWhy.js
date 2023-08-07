import React from 'react';
import { Box, Typography } from '@mui/material';

const AiWhy = () => {
  return (
    <Box sx={{ marginTop: '5rem', paddingLeft: '6rem', background: '#121212',
    paddingRight: '6rem', paddingTop: '3rem', paddingBottom: '3rem',
    '@media (max-width: 800px)': {
        padding: '1rem'
      },
    }}>
      <Typography
        sx={{
          fontSize: '1.8rem',
          textAlign: 'left',
          marginBottom: '2rem',
          '@media (max-width: 442px)': {
            fontSize: '1.3rem',
            marginBottom: '2rem',
          },
        }}
      >
        Miksi hyödyntää tekoälyä liiketoiminnassa?
      </Typography>
      <Typography sx={{ fontSize: '1.3rem' }}>1. Tehokkuus ja automaatio</Typography>
      <Typography sx={{ margin: '2rem' }}>
       Tekoäly voi automatisoida monimutkaisia ja aikaa vieviä tehtäviä,
       vapauttaen resursseja tärkeämpiin liiketoimintaprosesseihin. Tämä parantaa tehokkuutta
       ja mahdollistaa henkilöstön keskittymisen luovempiin ja strategisempiin tehtäviin.
      </Typography>
      <Typography sx={{ fontSize: '1.3rem' }}>2. Tarkkuus ja virheettömyys</Typography>
      <Typography sx={{ margin: '2rem' }}>
      Tekoälyllä varustetut järjestelmät voivat suorittaa
       tehtäviä korkealla tarkkuudella ja minimoivat inhimilliset virheet.
       Tämä johtaa parempaan laatuun, vähempään virheiden määrään ja siten alentaa kustannuksia.
      </Typography>
      <Typography sx={{ fontSize: '1.3rem' }}>3. Parempi päätöksenteko</Typography>
      <Typography sx={{ margin: '2rem' }}>
      Tekoäly voi analysoida suuria määriä dataa ja tuottaa arvokasta
       tietoa päätöksenteon tueksi. Tämä mahdollistaa
       faktoihin perustuvan päätöksenteon ja auttaa ennakoimaan trendejä ja mahdollisuuksia.
      </Typography>
      <Typography sx={{ fontSize: '1.3rem' }}>4. Personoidut asiakaskokemukset</Typography>
      <Typography sx={{ margin: '2rem' }}>
      Tekoäly voi analysoida asiakastietoja ja tarjota
       yksilöllisiä suosituksia ja
       personoituja kokemuksia. Tämä parantaa asiakastyytyväisyyttä ja lisää sitoutumista brändiin.
      </Typography>
      <Typography sx={{ fontSize: '1.3rem' }}>5. Nopea reagointi ja ennustaminen</Typography>
      <Typography sx={{ margin: '2rem' }}>
      Tekoäly voi havaita muutoksia markkinoilla
       nopeasti ja ennustaa tulevia trendejä. Tämä auttaa yrityksiä 
      sopeutumaan nopeasti muuttuvaan liiketoimintaympäristöön ja hyödyntämään uusia mahdollisuuksia.
      </Typography>
      <Typography sx={{ fontSize: '1.3rem' }}>6. Kustannussäästöt</Typography>
      <Typography sx={{ margin: '2rem' }}>
      Tekoälyn avulla voidaan optimoida
       resurssien käyttöä, vähentää hukkaa ja säästää aikaa, mikä johtaa suoriin kustannussäästöihin.
      </Typography>
      <Typography sx={{ fontSize: '1.3rem' }}>7. Kilpailuetu</Typography>
      <Typography sx={{ margin: '2rem' }}>
      Yritys, joka pystyy tehokkaasti hyödyntämään tekoälyä
       liiketoiminnassaan, voi saavuttaa merkittävän kilpailuedun suhteessa kilpailijoihin. Tekoäly voi mahdollistaa
       innovatiivisten tuotteiden ja palveluiden luomisen sekä uusien markkinoiden avaamisen.
      </Typography>
    </Box>
  );
};

export default AiWhy;
