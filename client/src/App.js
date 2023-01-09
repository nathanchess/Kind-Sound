import './App.css';
import 'react-notifications-component/dist/theme.css'


import QuoteScroll from './Components/QuoteScroll';
import SendMessage from './Pages/SendMessage';
import ParticleRenderer from './Components/ParticleRenderer'

import TopBar from './Components/TopBar';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactNotifications } from 'react-notifications-component'

function App() {
  return (
    <BrowserRouter>
        <ParticleRenderer></ParticleRenderer>
        <ReactNotifications />
        <Routes>
            <Route path='/' element={<QuoteScroll />}/>
            <Route path='/send' element={<SendMessage />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
