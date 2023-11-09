import { Container, Paper, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { formatDate } from "../../../Functions/formatDate"

const FormSummary = () => {
  const formData = useSelector(state => state.formData)
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2rem'
      }}
    >
      <Paper sx={{display: 'flex', flexDirection: "column", padding: '2rem', justifyContent: 'center', alignItems: 'begin' }}>
        <Typography variant="h4">Perustiedot</Typography>
        <Typography>Sivun tarkoitus: {formData.description}</Typography>
        <Typography>Kohdeyleisö: {formData.question1 === 'other' ? formData.question1Other : formData.question1}</Typography>
        <Typography>Teknologiset rajoitteet: {formData.question2 === 'other' ? formData.question2Other : formData.question2}</Typography>
        <Typography>Sisälönhallinta: {formData.question3}</Typography>
        <Typography>Toiminnallisuus: {formData.question4}</Typography>
        <Typography>Muuta: {formData.other}</Typography>

        <Typography variant="h4" >Ehdot</Typography>
        <Typography>Tarjouskilpailun takaraja: {formatDate(formData.date)}</Typography>
        <Typography>Ilmoitus julkaistaan avoimien ilmoitusten palstalle: {formData.isOpenFeedPost ? 'Kyllä' : 'Ei'}</Typography>
        <Typography>Hintahaarukka: {formData.minPrice}€ - {formData.maxPrice}€</Typography>
      </Paper>
    </Container>
  )
}

export default FormSummary