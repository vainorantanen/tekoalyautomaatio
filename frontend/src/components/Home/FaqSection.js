import React from 'react'
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FAQSection = () => {
  return (
    <Container sx={{ marginTop: '5rem', marginBottom: '5rem' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '4rem' }}>
        Usein kysytyt kysymykset
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Maksaako ilmoituksen jättäminen jotain?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ei maksa. Voit jättää ilmoituksen täysin ilmaiseksi.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Sitoudunko ostamaan tekoälyprojektin, jos jätän ilmoituksen?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Et sitoudu. Ilmoituksen jättäminen ei sido sinua ostamaan projektia.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Add more Accordion components for additional questions and answers */}
    </Container>
  )
}

export default FAQSection