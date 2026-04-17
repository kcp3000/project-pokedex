import MyFavorites from './components/Favorites'
// import tvScreen from './images/y2kscreen.png'
import flowerBRoll from "./images/1yr/flower-bRoll.png"
import bRoll2 from "./images/1yr/bRoll2.png"
import bRoll3 from "./images/1yr/bRoll3.png"
import bRoll4 from "./images/1yr/bRoll4.png"
import bRoll5 from "./images/1yr/bRoll5.png"
import bRoll6 from "./images/1yr/bRoll6.png"
import valenBRoll from "./images/1yr/valen.png"
import valenBRoll2 from "./images/1yr/valen2.png"
import valenBRoll3 from "./images/1yr/valen3.png"
import valenBRoll4 from "./images/1yr/valen4.png"
import valenAsia from "./images/1yr/valen5.png"
import valenAsia2 from "./images/1yr/valen6.png"
import goofykev from "./images/1yr/goofy-kev.png"
import goofyasia from "./images/1yr/goofy-asia.jpg"
import together from "./images/1yr/valen7-together.jpg"
import together1 from "./images/1yr/together-pic.jpg"
import together2 from "./images/1yr/together-pic2.jpg"
import together3 from "./images/1yr/together-pic3.jpg"
import firstDateKev from "./images/1yr/firstDate-kev.png"
import firstDateAsia from "./images/1yr/firstDate-asia.png"
import notePad from './images/notepadIcon.png'
import pikaDance from './images/pikaDance.gif'
import pokemonLogo from './images/Pokemon-Logo-1998.png'
import littleroot from './sound/Pokemon Ruby_Sapphire_Emerald-Littleroot Town.wav'
import './App.css'
import { useState, useRef } from 'react'

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null)       
  const [play, setPlay] = useState(false)

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(littleroot)
      audioRef.current.volume = 0.1
      audioRef.current.loop = true
    }

    if (play) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    } else {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }

    setPlay(prev => !prev)
  }

  return (
    <div className='MAIN_POKEDEX_CONTAINER'>
      <div className='TITLE_NAV_CONTAINER'>
        <h1 className='TITLE'>SA'ASIA'S POKEDEX</h1>
        <p className='anni'>HAPPY ONE YEAR ANNIVERSERY BABY {`<3`}</p>
      </div>
    
      <div className='Pokedex_components'>
          <button
            className='littleroot'
            onClick={handlePlay}
          >
            {play ? (
              <p>SONG ON</p>
            ) : (
              <p>SONG OFF</p>
            )}
          </button>
          <div className='anni_writing_container'>

          </div>
          <p className='album'>ALBUM ALBUM ALBUM</p>
          <div className='pics_container'>
            <img src={valenAsia} alt="" />
            <img src={valenAsia2} alt="" />
            <img src={together} alt="" />
            <img src={goofyasia} alt="" />
            <img src={goofykev} alt="" />
            <img src={together1} alt="" />
            <img src={together2} alt="" />
            <img src={together3} alt="" />
            <img src={firstDateKev} alt="" />
            <img src={firstDateAsia} alt="" />

            <img src={flowerBRoll} alt="" />
            <img src={bRoll2} alt="" />
            <img src={bRoll3} alt="" />
            <img src={bRoll4} alt="" />
            <img src={bRoll5} alt="" />
            <img src={bRoll6} alt="" />
            <img src={valenBRoll3} alt="" />
            <img src={valenBRoll4} alt="" />
            <img src={valenBRoll} alt="" />
            <img src={valenBRoll2} alt="" />
            <p>ONE YEAR ANNIVERSERY</p>
            <p>ONE YEAR ANNIVERSERY</p>
          </div>
          {/* <img src={notePad} alt={`notepad icon`} className='notepad3'/> */}
          <img src={notePad} alt={`notepad icon`} className='notepad2'/>
          <img src={notePad} alt={`notepad icon`} className='notepad'/>
          {/* <img src={tvScreen} alt="old_tv_screen" className='tv'/> */}
          <MyFavorites />
      </div>
      <div className='pokemon_container'>
        <img src={pikaDance} alt="pikachu dance" className='pikadance'/>
        <img src={pokemonLogo} alt="pokemon logo" className='pklogo'/>
        <img src={pikaDance} alt="pikachu dance" className='pikadance'/>
      </div>
    </div>
  )
}

export default App
