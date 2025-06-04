import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Contact from "./components/contact/Contact";
import Hero from "./components/hero/Hero";
import Navbar from "./components/nav/Navbar";
import About from './components/about/About'
export default function App(){
  return <div className="hero-container">
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element = {<Hero/>}/>
          <Route path="about" element = {<About/>}/>
          <Route path="contact" element = {<Contact/>}/>
      </Routes>
    </Router>
  </div>
}