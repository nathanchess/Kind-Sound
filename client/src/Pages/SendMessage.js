import React from 'react'
import './SendMessage.css'
import TopBar from '../Components/TopBar'

import { Store } from 'react-notifications-component'

import ReactAudioPlayer from 'react-audio-player';
import Audio from '../Assets/peacefulmusic.mp3'

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
        fetch('/api/add_phrase/', requestOptions).then(response => {
            console.log(response.status);
            messageInput.value = ""
            Store.addNotification({
                title: 'Message Added',
                message: "Thank you for your submission! Once we process this quote to see if it's safe, we'll add it so everyone can see!",
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
      <ReactAudioPlayer src={Audio} autoPlay />

      <h1 id='music-playing'>Now Playing: Peder B. Helland: Early in the Morning</h1>
    </>
  )
}


export default SendMessage
