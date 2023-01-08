import React from 'react'
import './SendMessage.css'
import TopBar from '../Components/TopBar'

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// If you want to you can move all the css in SendMessage to App.css

// TODO: Add similar animation as the send one button

const SendMessage = () => {

  function sentToDatabase() {
    var messageInput = document.getElementById('message-input').value;
    console.log(messageInput)
    if (messageInput.length === 0) {
      // ERROR
    } else { 

      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };

      axios.post('http://localhost:5000/api/add_phrase', {phrase: messageInput}, axiosConfig)
      .then(function(response) {
        console.log(response)
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

/*
const requestOptions = {
  method: 'POST',
  mode: 'no-cors',
  headers: { 'Content-Type': 'application/json', 'phrase': messageInput },
  body: JSON.stringify({ phrase: messageInput })
};

fetch('http://localhost:5000/api/add_phrase', requestOptions).then(response => console.log(response))
*/

export default SendMessage