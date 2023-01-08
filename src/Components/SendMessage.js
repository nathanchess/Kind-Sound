import React from 'react'

const SendMessage = () => {
  return (
    <div class='center'>
        <div id='messageBox'>
            <textarea type="text" placeholder="Enter Name" rows={1}></textarea>
            <hr />
            <button class='sendPhrase'>
                Send
            </button>
            <p>Spread the kindness to others!</p>
        </div>
    </div>
  )
}

export default SendMessage