| päivä     | aika (h) | mitä tein                                                                        |
|-----------|----------|----------------------------------------------------------------------------------|
| 5.8.23.   | 5        | - Luotu repositorio<br>- Tehty frontend create react appilla ja raakaversio backendista expressillä<br>- Tehty build-scripti ja varmistettu että prod- ja dev-versiot ok |
| 6.8.23    | 5        | - tehty sivua tekoälyn hyödyntämisestä (path /liiketoiminnassa)<br>- tehty renderin build commandi<br>- Julkaistu alustava versio renderissä |
| 7.8.23    | 5        | - aloitettu kirjautumisen ja reduxin kofigurointia frontendissä<br>- tehty liiketoimintasivua |
| 8.8.23    | 6        | - Tehty backendiin api käyttäjille (users)<br> - Tehty kirjautumis ja rekisteröinti ominaisuus backendiin ja frontendiin<br> - konfiguroitu mongoDB projektiin |
| 9.8.23    | 5        | - lisätty projektin lisäämisominaisuus ja api projectPosts<br>- vain kirjautunut käyttäjä voi lisätä projektin<br> - vain avoimien projektien lisääminen onnistuu |
| 10.8.23    | 8        | - konfiguroitu devitietokanta ja korjattu post tila<br>- korjattu virheenkäsittelyä projektien lisäämiselle<br> - tehty ominaisuus eli api ja sivu kehittäjien lisäämille ilmoituksille<br> - tehty profiilisivua ja users apia profiiliominaisuutta varten|
| 11.8.23  | 9        | - tehty ja tyylitelty sivu kehittäjien listaukselle <br> - tehty sivu ilmoituksen muokkaamiselle ostajalle<br> -tehty ominaisuus projektin poistamiselle <br> -tehty ominaisuus kehittäjien postauksien muokkauksille <br> -lisätty ominaisuus sähköpostin lisäämiselle <br> -lisätty feed-sivu|
| 12.8.23  | 5       | - lisätty ominaisuus frontendiin feedpostin lisäykselle<br>- tehty api feedpostien lisäykselle<br> - korjattu virheenkäsittelyä feedpostien lisäyksessä <br> -Tyylitelty feed sivua ja feedin lisäys formia|
| 13.8.23  | 5       | - feedin toiminnallisuus korjattu<br>- tehty kaikkien käyttäjien selauksen sivua<br> - lisätty ominaisuus kommentoinnille|
| 14.8.23  | 5       | - korjattu ja viilailtu kommentointi-ominaisuutta<br>- lisätty ominaisuus tarjouksen tekemiselle ja konfiguroitu offers api <br> - Paranneltu virheenkäsittelyä kommentoinnissa|
| 15.8.23  | 4       | - Tehty portaali ominaisuus frontendiin<br>- tehty portaalinäkymät devaajille ja ostajille <br> - tehty tarjouksen hyväksyntä ja poisto <br>- lisätty feedposteihin tykkäysominaisuus|
| 16.8.23  | 4       | - Löydetty ja korjattu bugi feedpostin kommentoinnissa ja poistossa<br>- Löydetty ja korjattu bugi tykkäysominaisuudessa <br> - lisätty dislike ominaisuus feedposteihin|
| 18.8.23  | 4       | -korjattu projectpostin bugi ja kehittäjien ilmoituksen lisäämisen virheekäsittely<br>- Tyylitelty frontendia |
| 24.8.23  | 5       | -lisätty portaali ilmoitusten api<br>- Tehty portaali ilmoituksen lisäämisen frontend |
| 25.8.23   | 7        | - Tehty ominaisuus ilmoituksen sulkemiselle<br>- Korjattu state bugi rekisteröinnissä<br>- Tehty API chateille ja luotu chat-näkymä frontendille<br>- Korjattu chatin lisäämisen bugi<br>- Lisätty route `/*` tuntemattomia reittejä varten, joka korjasi refreshauksen bugin |
| 26.8.23   | 10       | - Tehty websocketilla reaaliaikainen chat-toiminnallisuus<br>- Viety chatin toiminnallisuus tuotantoympäristöön<br>- Tyylitelty chat-näkymää ja lisätty chatille otsikko (title) |
| 27.8.23  | 10       | -tehty api ja frontend form ratingin lisäykselle<br>- ominaisuus ratingin poistolle ja näyttämiselle <br>- tehty salasanan resetointi ominaisuus <br> -lisätty path ja api sitemapille |
| 28.8.23  | 4       | -Konfiguroitu CI/CD pipelinea<br> |
| 29.8.23  | 3       | -Korjattu pipeline e2e testien virhe ja konfiguroitu CI/CD pipelinea lisää<br> - Tehty testejä cypressillä |
| 30.8.23  | 1       | -Tehty ominaisuus epäasiallisen feedpostin ilmoittamiselle<br> - Tehty route blogien lisäämiselle profiilinäkymään |
| 31.8.23  | 4       | -Blogin lisäys, muokkaus ja poisto<br> - blogin voi ilmoittaa epäasialliseksi<br>- Tyylitelty frontendiä <br> - Blogien näyttäminen käyttäjän profiilinäkymässä |
| 1.9.23  | 1       | -Tehty asiakaspalvelu apia ja admin paneelia<br>|
| 16.9.23  |  2      | -Tehty asiakaspalvelun adminpaneelia<br> -Luotu ominaisuus aspapyynnön merkitsemiselle tärkeäksi ja tehdyksi<br>- Aspapyynnön poisto<br> - Tehty chat-keskustelun aloituksen komponentti|
| 17.9.23  |  5      | -tehty frontendia devaajien postauksien osalta<br>- lisätty ominaisuuksia kuten hinta, aika ja paikka devaajien postauksille<br>-Muokattu tietokantaskeemaa ja backendiä tähän sopivaksi|
| 18.9.23  |  1      | -tehty subscription ominaisuutta frontendiin ja backendiin<br>|
| 23.9.23  |  2      | -subscription ominaisuuden tekoa frontendiin ja backendiin<br>- tehty tilauksen aktivointia ja lopettamist<br>- toteutettu api tilauksille|
| 27.9.23  |  1      | - korjailtu subscription ominaisuutta<br>- toteutettu ominaisuus tilauksen perumiselle|
| 23.10.23  |  8      | - Korjattu portaalin apia piilottamalla se muilta<br>- muokattu portaalin state managementtia laajasti<br>- lisätty oma api portaalitarjouksille|
| 26.10.23  |  8      | - Jatkettu portaalin apin korjausta<br>- Lisätty käyttäjän disabloinnin tarkitus backendiin<br>- korjattu sovelluksen virheenhallintaa|

Yhteensä: 142h