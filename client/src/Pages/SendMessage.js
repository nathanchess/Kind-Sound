import React from 'react'
import './SendMessage.css'

// If you want to you can move all the css in SendMessage to App.css

// TODO: Add similar animation as the send one button

const SendMessage = () => {
  return (
    <div className="send-message">
        <textarea id="message-input" placeholder="Ex: I hope you have a wonderful day! (max 200 characters)" maxLength="200"></textarea>
        <button className="submit-message">SEND!</button>
    </div>
  )
}

export default SendMessage