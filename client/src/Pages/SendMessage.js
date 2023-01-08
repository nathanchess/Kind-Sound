import React from 'react'
import './SendMessage.css'
import TopBar from '../Components/TopBar'

import { Store } from 'react-notifications-component'
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
      Store.addNotification({
        title: 'Value Error',
        message: 'Please enter a nice message into the box above before sending!',
        type: 'danger',
        insert: 'bottom',
        container: 'bottom-right',
        animationIn: ['animate__animated animate__fadeIn'],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
          }
      })
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
              messageInput.value = ""
              Store.addNotification({
                title: 'Oh No!',
                message: 'Our AI seems to have detected some nefarious intent or keywords behind your message. Please retry with a new meessage...',
                type: 'danger',
                insert: 'bottom',
                container: 'bottom-right',
                animationIn: ['animate__animated animate__fadeIn'],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                  }
              })
            } else if (response.status === 200) {
                messageInput.value = ""
                Store.addNotification({
                  title: 'Message Added',
                  message: 'Head back to the home page to see if you can find your quote! Thank you for spreading the kindness!',
                  type: 'success',
                  insert: 'bottom',
                  container: 'bottom-right',
                  animationIn: ['animate__animated animate__fadeIn'],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
              })
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