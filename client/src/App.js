import './App.css';

import QuoteScroll from './Components/QuoteScroll';
import SendMessage from './Pages/SendMessage';

import TopBar from './Components/TopBar';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <TopBar />
        <Routes>
            <Route path='/' element={<QuoteScroll />}/>
            <Route path='/send' element={<SendMessage />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
