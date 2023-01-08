import React from 'react'

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import OnMyWayLofi from '../Assets/On-My-Way-Lofi-Study-Music.mp3'

const MusicPlayer = () => {
  return (
    <ReactJkMusicPlayer src={OnMyWayLofi} autoPlay controls />
  )
}

export default MusicPlayer