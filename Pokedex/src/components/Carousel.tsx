import { useEffect, useRef, useState } from "react";
import { getPokemonByID } from "../api/pokemonApi";

export default function PokemonCarousel() {
    const [pokemonId, setPokemonId] = useState(1)//cycling through the id's of the pokemon using this useState
    const [pokemon, setPokemon] = useState(null)//after we get the id, we set the pokemon's data tied to the id to setPokemon
    const [click, setClick] = useState(true)//adding a click button to alternate btwn front and back sprites
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const handleClick = () => {
        setClick((click) => !click)
    }

    

    useEffect(() => {//fetching pokemon by id and applying the data to pokemon
        const fetchPokemon = async () => {
            const data = await getPokemonByID(pokemonId)
            setPokemon(data)
            console.log(data)
        }

        fetchPokemon()
    }, [pokemonId]) 

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



    // console.log(pokemon.stats)

    return (//rendering the pokemon, stats and everything else
        <div className="">
            <button onClick={() => setPokemonId(prev => prev - 1)}>Prev</button>
            
            {pokemon && (
                <div>
                    <h2>{pokemon.name.toUpperCase()}</h2>
                    <button onClick={() => {
                            const cry = new Audio(pokemon.cries.latest)
                            cry.volume = 0.1
                            cry.play()
                        }}
                        >
                            🔊
                    </button>
                    <button onClick={handleClick}>
                        click to see its back!
                        {click ? (
                            <img src={pokemon.sprites.front_default} alt="pokemon front" />
                        ) : (
                            <img src={pokemon.sprites.back_default} alt="pokemon back" />
                        )}
                    </button>
                    <ul>{pokemon?.stats?.map((stat) => (
                        <li key={stat.stat.name}>
                            <strong>{stat.stat.name.toUpperCase()}</strong>: {stat.base_stat}
                        </li>
                    ))}

                    </ul>
                    <h3>abilites</h3>
                    <ul>{pokemon.abilities.map((ability) => (
                            <li key={ability.ability.name}>
                                {ability.ability.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={() => setPokemonId(prev => prev + 1)}>Next</button>
        </div>
    )
}