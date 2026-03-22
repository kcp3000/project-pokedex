import { useState, useEffect, useRef } from "react";
import { Volume2 } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import type { PokemonGlobal } from "../types/Pokemon";

type PokemonCarousel = {
    pokemonList: PokemonGlobal[]
    currentIdx: number
    setCurrentIdx: any
}

export default function PokemonCarousel({pokemonList, currentIdx, setCurrentIdx}: PokemonCarousel) {
    const [click, setClick] = useState(true)//adding a click button to alternate btwn front and back sprites
    const pokemon = pokemonList[currentIdx];//fetching for the pokemon in the array by its index
    const audioRef = useRef<HTMLAudioElement | null>(null)
    
    useEffect(() => {
                    if (pokemon?.cries?.latest) {
                        if (audioRef.current) {
                            audioRef.current.pause()
                        }
            
                        const cry = new Audio(pokemon.cries.latest)
            
                        cry.volume = 0.1
                        cry.play()
            
                        audioRef.current = cry
                    }
                }, [pokemon])

    if (!pokemon) {//if the pokemon doesnt exist, we exit returning a quick error msg
        return (
            <div>
                <h1>THIS POKEMON DOES NOT EXIST</h1>
            </div>
        )
    };

    const handleClick = () => {
        setClick((click) => !click)
    }

    return (//fuctionality of how what will be displayed and how the carousel will move
        <div className="C_outside_container">
            {pokemon && (
                <div className="C_inside_container">
                    <div className="C_block1"></div>
                    <div className="C_block2"></div>
                    <div className="C_block3"></div>
                    <div className="C_name_aud">
                        {pokemon.name.length > 11 ? (
                            <h2 
                                className="C_pokemon_name"
                                title={pokemon.name.toUpperCase()}
                            >
                                {pokemon.name.slice(0, 10).toUpperCase()}...</h2>
                        ) : (
                            <h2>{pokemon.name.toUpperCase()}</h2>
                        )}
                        
                        <button 
                            onClick={() => {
                                const cry = new Audio(pokemon.cries.latest)
                                cry.volume = 0.1
                                cry.play()
                            }}
                        >
                        <Volume2 size={48} />
                        </button>
                    </div>
                        <div className="C_sprite_container">
                            <button 
                                className="C_sprite"
                                onClick={handleClick}>
                                {click ? (
                                    <img src={pokemon.sprites.front_default} alt="pokemon front" />
                                ) : (
                                    <img src={pokemon.sprites.back_default} alt="pokemon back" />
                                )}
                            </button>
                        </div>
                        <div className="C_button_container">
                            <button 
                                className="C_prev"
                                onClick={() => setCurrentIdx((prev: number) => prev === 0 ? pokemonList.length - 1 : prev - 1)}
                            >
                                <ChevronLeft />
                            </button>
                            <button 
                                className="C_nxt"
                                onClick={() => setCurrentIdx((prev: number) => prev === pokemonList.length - 1 ? 0 : prev + 1)}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    
                    <ul className="C_type">
                        {pokemon?.types?.map((type) => (
                        <li key={type.type.name}>
                            {type.type.name.toUpperCase()}
                        </li>
                        ))}
                    </ul>
                    <div className="C_abilities_container">
                        <h3>ABILITIES</h3>
                        <ul className="C_abilities_list">{pokemon.abilities.map((ability) => (
                                <li key={ability.ability.name}>
                                    {ability.ability.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
            )}

            
        </div>
    )
}