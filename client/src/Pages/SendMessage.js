import React from 'react'
import './SendMessage.css'

// If you want to you can move all the css in SendMessage to App.css

const SendMessage = () => {
  return (
    <div className="send-message">
        <textarea type="text" id="message-input" placeholder="Ex: I hope you have a wonderful day! (max 200 characters)" maxLength="200">

        </textarea>
    </div>
  )
}

export default SendMessage