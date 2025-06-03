import Hero from "./components/hero/Hero";
import Navbar from "./components/nav/Navbar";



export default function App(){
  return <div className="hero-container">
    <Navbar/>
    <Hero/>
  </div>
}