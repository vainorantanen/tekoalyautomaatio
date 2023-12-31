# Tekoalyautomaatio

Alusta, joka yhdistää tekoälyprojekteja etsivät asiakkaat ja niitä toteuttavat kehittäjät ja yritykset.

Katso verkossa: https://tekoalyautomaatio.onrender.com/

Ominaisuuksia:
- Rekisteröityminen ja kirjautuminen.
- Käyttäjiä voi olla kahdenlaisia: Kehittäjiä ja asiakkaita. Asiakkaat voivat lisätä projektipyyntöjä alustalle esittäen hinta ja toimitusaika toiveensa ja kuvailemalla projektin yksityiskohtia ja tavoitteita. Kehittäjät voivat tarjota näihin ilmoituksiin.
- Ilmoituksia on kahdenlaisia: avoimia ja portaali-ilmoituksia. Avoimet ilmoitukset ja niihin tehdyt tarjoukset ovat kaikkien nähtävillä, kun taas portaali-ilmoitukset näkevät vain kirjautuneet yritykset ja kyseisen portaali-ilmoituksen jättänyt henkilö. Portaali-ilmoituksen tarjoukset näkyvät myös vain tarjouksen jättäneelle yritykselle itselleen ja ilmoituksen jättäneelle asiakkaalle. Muut yritykset eivät siis näe toisten yritysten tekemiä portaali-tarjouksia.
- Portaali: Portaali on siis paikka, johon kirjautuneet käyttäjät pääsevät ja siellä ilmoitusten selaaminen on rajoitetumpaa. Muuten portaali-ilmoitukset toimivat samalla tavalla kuin avoimetkin eli ilmoituksen tekijä voi avata, sulkea, muokata ja poistaa niin avoimia kuin portaali-ilmoituksiakin.
- Reaaliaikainen chat: Projekteista on mahdollista neuvotella chatissa. Chatin voi aloittaa kunkin tarjouksen tai ilmoituksen kohdalla napista: "aloita neuvottelu". Chatissa viestin voi myös lähettää suoraan tarjouksena, jolloin vastakkainen osapuoli voi joko hyväksyä tai hylätä tarjouksen.
- Reaaliaikainen Projektinhallintapaneeli: Sovelluksessa on myös täysi projektinhallintapaneeli (mukailee esim. Trelloa), jossa asiakas ja kehittäjä voivat lisätä, poistaa ja muokata tehtäviä seuraten projektin etenemistä. Kaikki muutokset eli lisäykset, poistot ja päivitykset näkyvät kaikille projektipaneelissa oleville käyttäjille reaaliajassa. Kunkin kehittäjän julkisella sivulla (Valikosta kehittäjät => valitse kehittäjä ja avaa sen profiili) nappi "lähetä projektipyyntö", jonka avulla asiakaskäyttäjät voivat lähettää projektipyynnön kehittäjille. Jos kehittäjä hyväksyy projektipyynnön, aukee molemmille käyttäjille mahdollisuus siirtyä sen projektin hallintapaneeliin. 
- Kehittäjien ilmoitukset: Myös kehittäjät voivat lisätä alustalle omia ilmoituksia (ikään kuin myynti-ilmoitus), joidenka kautta asiakkaat voivat ottaa esimerkiksi chatin kautta yhteyttä kehittäjään.
- Käyttäjien blogit: Kukin käyttäjä voi kirjoittaa blogeja. Muut käyttäjät voivat lukea blogeja ja tarvittaessa merkitä niitä epäasiallisiksi. Blogin lisännyt käyttäjä voi myös poistaa ja muokata niitä.
- Kehittäjiä voi arvostella: avoin arvostelu + tähdet 1-5. Arvostelut näkyvät kunkin kehittäjän profiilissa.
- Alustalla on myös kullekin käyttäjälle oma "profiili" -näkymä, jossa näkyy omat tiedot, ilmoitukset, tarjoukset ja keskustelut.
- Profiili tarjoaa käyttäjille mahdollisuuden hallitta heidän luomaansa sisältöä alustalle: Ilmoituksia voi muokata ja poistaa, tarjouksia voi muokata ja poistaa, profiilin tietoja voi päivittää. Myös ilmoitusten tilaa voi muokata: Ilmoituksen voi sulkea, jolloin se poistuu muiden käyttäjien nähtäviltä, eikä siihen voi enää tarjota. Suljetun ilmoituksen voi myös avata uudelleen. Profiilista pystyy myös navigoimaan mm. portaaliin, omiin avoimiin ilmoituksiin, blogeihin ja yhteydenottoihin.
- Admin dashboard: Mahdollistaa sen, että admin käyttäjä voi hallita alustalla olevia käyttäjiä esimerkisi diabloimalla näitä tarvittaessa.
- Asiakaspalvelukanava: Adminin paneelissa on saatavilla asiakaspalvelupaneeli (kuka vain käyttäjä pystyy lähettämään asiakaspalvleuun etusivulla olevasta napista pyynnön). Asiakaspalelupyynnöissä on kaikki CRUD-operaatiot: Lisäys, admin voi poistaa niitä ja merkitä tehdyiksi tai tärkeiksi.
- Feed toiminnallisuus: Käyttäjät voivat lisätä ilmoituksia feediin eli kirjoittaa siitä, mitä heillä on mielessä. Kaikki pääsevät selaamaan feediä ja kirjautuneet käyttäjät voivat tykätä ja kommentoida feedin julkaisuja. Feedin lisännyt käyttäjä voi muokata ja poistaa julkaisujaan sekä poistaa julkaisuun tehtyjä kommentteja. Myös kommentin lisääjä voi poistaa oman kommenttinsa.
- Premium-ominaisuuden ostaminen kehittäjänä yrityksille-sivulla (ei oikeasti maksa mitään, vaikka applikaatiossa niin lukeekin). Vain kehittäjät voivat ostaa premium ominaisuuden ja tämän voi myös jälkeenpäin perua profiilista.
- Salasanan resetointi-ominaisuus: Jos käyttäjä unohtaa salasanasta, voi hän resetoida sen kirjaudu-sivulta, johon hän voi syöttää sähköpostiosoitteensa, ja sähköpostiosoitteeseen lähetetään salasanan alustus linkki, jos sähköposti löytyy sovelluksen tietokannasta.
- E2E Testit cypressillä: Sovellukseen on toteutettu e2e testit päätoiminnallisuuksiin, kuten ilmoituksen lisäämiseen sekä avoimelle palstalle että protaaliin ja tarjousten tekemiseen.
- CI/CD pipeline: Sovelluksessa on Github Actioneilla tehty pipeline, joka ajaa testit ja siten suojaa main-branchia vialliselta koodilta.

Tech Stack: React, Express, MongoDB, Node.js, Redux, MaterialUI, Rest API
