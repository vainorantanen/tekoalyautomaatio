import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LoginSuggestion from '../LoginSuggestion'
import { Box, Container, Grid, IconButton, TextField,
    Button, Typography, useMediaQuery, Checkbox, FormControlLabel } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { useNotification } from '../../hooks'
import { socket } from '../../socket'
import customerinfoService from '../../services/customerinfo'

const Chat = () => {
    const [message, setMessage] = useState('');
    const [ isOffer, setIsOffer ] = useState(false)
    const [messages, setMessages] = useState([]);

    const { id } = useParams()
    const user = useSelector(({user}) => user)
    const customerInfo = useSelector(({customerInfos}) => customerInfos).find(c => c.id === id)
    const notify = useNotification()

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchData = async () => {
            socket.emit('join_room', id);
            
            try {
                const chatData = await customerinfoService.getAll();
                
                const chatFromDb = chatData.find(c => c.id === id);
                if (chatFromDb) {
                    setMessages(chatFromDb.messages);
                }
            } catch (error) {
                console.error("Error fetching chat data:", error);
            }
        };
        
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessages(data.updatedCustomerInfo.messages)
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [socket]);

    const handleCheckboxChange = (e) => {
        setIsOffer(e.target.checked)
      }

    const handleSendMessage = async (event) => {
      event.preventDefault()
      if (isOffer) {
        const confirmed = window.confirm(`Olet lähettämässä viestiä tarjouksena. Vahvistetaanko lähetys?`)
        if (!confirmed) {
            return // If the user clicks "Cancel," do nothing
        }
      }

      try {
        const updatedCustomerInfo = await customerinfoService.sendMessage({ id: customerInfo.id, content: message, isOffer })
      //const result = await dispatch(addMessage({id: customerInfo.id, content: message, isOffer }))
        if (updatedCustomerInfo && updatedCustomerInfo.error) {
          notify('Tapahtui virhe palvelimella', 'error')
          return
        } else {
            setMessages(updatedCustomerInfo.messages)
            socket.emit("send_message", { updatedCustomerInfo, id });
            setMessage('')
            setIsOffer(false)
        }
    } catch (error) {
      notify('Ilmeni jokin ongelma tarjouksen teossa, yritä myöhemmin uudelleen', 'error')
    }
    };

    const handleAcceptMessageOffer = async (mes, operation) => {
          const confirmed = window.confirm(`${operation === 'accepted' ? 'Hyväksytäänkö': 'Hylätäänkö'} tarjous?`)
          if (!confirmed) {
              return // If the user clicks "Cancel," do nothing
          }
  
        try {
            const updatedCustomerInfo = await customerinfoService.updateMessage(customerInfo, {...mes, isApproved: operation })
        //const result = await dispatch(updateMessage(customerInfo, {...mes, isApproved: operation }))
          if (updatedCustomerInfo && updatedCustomerInfo.error) {
            notify('Tapahtui virhe palvelimella', 'error')
            return
          } else {
            setMessages(updatedCustomerInfo.messages)
            socket.emit("send_message", { updatedCustomerInfo, id });
            if (operation === 'accepted') {
                notify('Hyväksytty', 'success')
            } else {
                notify('Hylätty', 'success')
            }
          }
      } catch (error) {
        notify('Ilmeni jokin ongelma tarjouksen teossa, yritä myöhemmin uudelleen', 'error')
      }
      };

    if (!user || !customerInfo || (user.id !== customerInfo.targetDeveloper.id
        && user.id !== customerInfo.sender.id)) {
        return (
            <LoginSuggestion />
        )
    }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '70vh', 
        marginTop: '5rem' }}>
            <Typography sx={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem' }}>Chat</Typography>
            <Box>
                {messages.length > 0 ? (
                    messages.map(mes => {
                        return (
                            <Box key={mes.id} sx={{ display: 'flex', justifyContent: user.id === mes.user ? 'flex-end' : 'flex-start', marginBottom: '1rem' }}>
                                <Box sx={{ padding: '0.5rem', backgroundColor: user.id === mes.user ? '#B0D0FF' : '#ccb6f2', color: 'black', maxWidth: '70vw',
                                marginLeft: user.id === mes.user ? '0.5rem' : '0rem', marginRight: user.id === mes.user ? '0rem' : '0.5rem',
                                borderRadius: user.id === mes.user ? '0.5rem 0.5rem 0.1rem 1rem' : '0.5rem 0.5rem 1rem 0.1rem',
                                border: mes.isOffer
                                    ? mes.isApproved === 'accepted'
                                    ? '3px solid lightgreen'
                                    : mes.isApproved === 'rejected'
                                    ? '3px solid red'
                                    : mes.isApproved === 'waiting'
                                    ? '3px solid black'
                                    : 'none'
                                    : 'none',
                                }}>
                                    {mes.isOffer && (<Typography sx={{ textAlign: 'center',
                                borderBottom: '1px solid black' }}>Tarjous</Typography>)}
                                    <Typography sx={{ whiteSpace: 'break-spaces' }}>{mes.content}</Typography>
                                    <Typography sx={{ fontSize: '0.7rem', textAlign: user.id === mes.user ? 'right' : 'left' }}>{mes.user === user.id ? user.name : (user.id === customerInfo.sender.id ? customerInfo.targetDeveloper.name : customerInfo.sender.name)}</Typography>
                                    {mes.isOffer && user.id !== mes.user && mes.isApproved === 'waiting' && (
                                        <Button
                                        className="bn632-hover bn26"
                                        sx={{color: 'white',
                                        marginTop: '1rem',
                                        maxWidth: '10rem',
                                        }}
                                        onClick={() => handleAcceptMessageOffer(mes, 'accepted')}
                                        >Hyväksy tarjous</Button>
                                    )}
                                    {mes.isOffer && user.id !== mes.user && mes.isApproved === 'waiting' && (
                                        <Button
                                        
                                        sx={{color: 'red',
                                        marginTop: '1rem',
                                        maxWidth: '10rem',
                                        }}
                                        onClick={() => handleAcceptMessageOffer(mes, 'rejected')}
                                        >Hylkää tarjous</Button>
                                    )}
                                    {mes.isOffer && mes.isApproved === 'waiting' && (<Typography>Odottaa</Typography>)}
                                    {mes.isOffer && mes.isApproved === 'accepted' && (<Typography>Hyväksytty</Typography>)}
                                    {mes.isOffer && mes.isApproved === 'rejected' && (<Typography>Hylätty</Typography>)}
                                </Box>
                            </Box>
                        )
})
                ) : (
                    <Typography>Ei viestejä</Typography>
                )}
            </Box>
            <Box sx={{ padding: '1rem', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            type="text"
                            multiline
                            minRows={1}
                            maxRows={5} 
                            value={message}
                            placeholder="Kirjoita viesti"
                            required
                            onChange={({ target }) => setMessage(target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        {!isSmallScreen ? (
                            <Button
                            onClick={handleSendMessage}
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                            fullWidth
                            sx={{ textAlign: 'center' }}
                        >
                            Lähetä
                        </Button>
                        ): (
                            <IconButton onClick={handleSendMessage} color="primary">
                                <SendIcon />
                            </IconButton>
                        )}
                    </Grid>
                    <FormControlLabel
          control={
            <Checkbox
              checked={isOffer}
              onChange={handleCheckboxChange}
            />
          }
          label={
            <Typography>
              Lähetä viesti vastatarjouksena (toinen osapuoli voi hyväksyä sen)
            </Typography>
          }
          sx={{ marginBottom: '1rem' }}
        />
                </Grid>
            </Box>
        </Container>
    );
}

export default Chat