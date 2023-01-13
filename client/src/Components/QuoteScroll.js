import React, { useEffect, useState } from 'react'
import TopBar from './TopBar'

import shortid from 'shortid'

import { Store } from 'react-notifications-component'
import { MovingComponent } from 'react-moving-text'

import ReactAudioPlayer from 'react-audio-player';

import Audio from '../Assets/peacefulmusic.mp3'

const QuoteScroll = () => {

    const [liked, setLiked] = useState(null)
    const [currentQuote, setQuote] = useState(<div id='quote' className='fade-in-text'>'I once though college was difficult as well, but we will get through it together'</div>)

    function dislike() {
        const likeButton = document.getElementById('like-button')
        const dislikeButton = document.getElementById('dislike-button')
        if (liked !== false) {
            setLiked(false)
            dislikeButton.style.fill = '#f26363'
            likeButton.style.fill = 'white'
            Store.addNotification({
                title: 'Oh No!',
                message: 'We will try our best to avoid quotes like these :(',
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
        }
    }

    function like() {
        const likeButton = document.getElementById('like-button')
        const dislikeButton = document.getElementById('dislike-button')
        if (liked !== true) {
            setLiked(true)
            dislikeButton.style.fill = 'white'
            likeButton.style.fill = '#71f36d'
            Store.addNotification({
                title: 'Like added!',
                message: 'We will try our best to personalize the quotes to your likes!',
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
        }
    }

    function getQuote() {
        const likeButton = document.getElementById('like-button')
        const dislikeButton = document.getElementById('dislike-button')
        fetch('/api/random_phrase/').then(response => response.json()).then(phrase => {
            setQuote(<div key={getId()} id="quote"
                          className={'fade-in-text'} style={{animationPlayState: 'running'}}>{phrase.phrase.replace(/['"]+/g, '')}</div>);
        })
        dislikeButton.style.fill = 'white'
        likeButton.style.fill = 'white'
        setLiked(null)
    }

    useEffect(() => {
        document.getElementById('quote').style.animationPlayState = 'running'
    }, [])

    const getId = () => {
        const id = shortid.generate()
        console.log(id)
        return id
    }

    return (
        <>
            <TopBar text='SEND ONE!' location='/send' />
            <div id='quote-section'>
                <div className='text'>
                    {currentQuote}
                    <hr></hr>
                    <MovingComponent id='sender' type="fadeIn" duration="1000ms" delay="0s" direction="normal" timing="ease" iteration="1" fillMode="forwards">All these messages have been sent by anonymous internet users and scanned by a cutting edge natural language AI!</MovingComponent>
                </div>
                <div class='options'>
                <svg id='dislike-button' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" onClick={dislike}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
</svg>
                    <button class='newQuote hover-underline-animation-black' onClick={getQuote}>Find more kindness!</button>
                    <svg id='like-button' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" onClick={like}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
</svg>
                </div>
            </div>

            <ReactAudioPlayer src={Audio} autoPlay />

            <h1 id='music-playing'>Now Playing: Peder B. Helland: Early in the Morning</h1>
        </>
    )
}

export default QuoteScroll
