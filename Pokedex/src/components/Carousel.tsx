import { useState, useEffect, useRef } from "react";

type Types = {
  type: {
    name: string
  }
}

type Ability = {
        ability: {
            name: string
        }
    }

type Stat = {
        base_stat: number
        stat: {
            name: string
        }
    }

type Pokemon = {
        id: number
        name: string
        abilities: Ability[]
        stats: Stat[]
        cries: {
            latest: string
        }
        sprites: {
            front_default: string
            back_default: string
        }
        types: Types[]
    }

type PokemonCarousel = {
    pokemonList: Pokemon[]
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
                    <div className="C_name_aud">
                        <h2>{pokemon.name.toUpperCase()}</h2>
                        <button onClick={() => {
                                const cry = new Audio(pokemon.cries.latest)
                                cry.volume = 0.1
                                cry.play()
                            }}
                        >
                            🔊
                        </button>
                    </div>
                    <ul className="C_type">
                        {pokemon?.types?.map((type) => (
                        <li key={type.type.name}>
                            {type.type.name.toUpperCase()}
                        </li>
                        ))}
                    </ul>
                    
                    <div className="C_img_nxt_prv">
                        <button 
                            onClick={() => setCurrentIdx((prev: number) => prev === 0 ? pokemonList.length - 1 : prev - 1)}
                        >
                            {`<`}
                        </button>
            
                        {/* <p>click to see its back!</p> */}
                        <div className="Pokemon_sprite">
                            <button onClick={handleClick}>
                                {click ? (
                                    <img src={pokemon.sprites.front_default} alt="pokemon front" />
                                ) : (
                                    <img src={pokemon.sprites.back_default} alt="pokemon back" />
                                )}
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => setCurrentIdx((prev: number) => prev === pokemonList.length - 1 ? 0 : prev + 1)}
                        >
                            {`>`}
                        </button>
                    </div>
                    <div className="C_abilities_container">
                        <h3>abilites</h3>
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