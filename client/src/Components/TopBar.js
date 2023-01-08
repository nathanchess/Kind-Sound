import React from 'react'

import { Link } from 'react-router-dom'

/* TODO: change the SEND ONE! button to reroute back to main page */
const TopBar = ( { text, location }) => {
  return (
    <div id="topBarWrap">
        { location === '/send' ?
        
        <Link class="sendPhrase" to={`${location}`}>
          {text}
          <hr />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg> 
        </Link> :

        <Link class="sendHome" to={`${location}`}>
          {text}
          <hr />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </Link>

        }
        <div id="titleWrap">
            <h1>[ KIND SOUND ]</h1>
            <p>(Calm and healing music to spread kindness)</p>
        </div>
    </div>
  )
}

export default TopBar