import React from 'react'
import './SendMessage.css'
import TopBar from '../Components/TopBar'

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// If you want to you can move all the css in SendMessage to App.css

// TODO: Add similar animation as the send one button

const SendMessage = () => {

  function sentToDatabase() {
    const messageInput = document.getElementById('message-input');
    const messageInputValue = messageInput.value;
    console.log(messageInputValue)
    if (messageInputValue.length === 0) {
      // ERROR
    } else {

        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json', 'phrase': messageInputValue },
            body: JSON.stringify({ phrase: messageInputValue })
        };
        fetch('http://localhost:5000/api/add_phrase', requestOptions).then(response => {
            console.log(response.status);
            if (response.status === 403) {

            } else if (response.status === 200) {
                messageInput.value = ""
            } else {

            }
        })


    }
  }

  return (
    <>
      <TopBar text='HOME' location='/' />
      <div className="send-message">
        <textarea id="message-input" placeholder="Ex: I hope you have a wonderful day! (max 200 characters)" maxLength="200"></textarea>
          <button className="submit-message" onClick={sentToDatabase}>SEND!</button>
      </div>
    </>
  )
}


export default SendMessage