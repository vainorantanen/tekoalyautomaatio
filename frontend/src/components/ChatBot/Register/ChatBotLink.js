import React from 'react'
import { Link } from 'react-router-dom'

const ChatBotLink = ({linkRoute}) => {
  return (
    <Link to={linkRoute}>
        Täällä
    </Link>
  )
}

export default ChatBotLink