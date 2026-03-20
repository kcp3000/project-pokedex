import { useState } from "react"
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

type Pokemon = {
        id: number
        name: string
        sprites: {
            front_default: string
            back_default: string
        }
    }

type EvolutionChainProp = {
    evolutionChain: Pokemon[]
    onSelectPokemon: (mon: Pokemon) => void
}

export default function EvolutionPairs ({evolutionChain, onSelectPokemon}: EvolutionChainProp) {
    if (evolutionChain.length === 0) return

    const [startIdx, setStartIdx] = useState(0)

    return (
        <div className="E_container">
            {evolutionChain.length <= 3 ? (
                <ul className="E_list">
                    {evolutionChain.map((mon) => (
                        <li className="E_item" key={mon.name}>
                            <button
                                className="E_button"
                                onClick={() =>{
                                    onSelectPokemon(mon)
                                    // console.log("clicked:", evolutionChain)
                                }}
                            >
                                <img src={mon.sprites.front_default} alt={`Front Sprite of ${mon.name}`} />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="E_inside_list_carousel">
                    <button
                        onClick={() => {setStartIdx(prev => prev === 0 ? evolutionChain.length - 3 : prev - 1)}}
                    >
                        <ChevronLeft />
                    </button>
                        <ul className="E_list">
                            {evolutionChain.slice(startIdx, startIdx + 3).map((mon)=> (
                                <li className="E_item" key={mon.name}>
                                    <button
                                        className="E_button"
                                        onClick={() =>{
                                            onSelectPokemon(mon)
                                            // console.log("clicked:", evolutionChain)
                                        }}
                                    >
                                        <img src={mon.sprites.front_default} alt={`Front Sprite of ${mon.name}`} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    <button
                        onClick={() => {setStartIdx(prev => prev === evolutionChain.length - 3 ? 0 : prev + 1)}}
                    >
                        <ChevronRight />
                    </button>
                </div>    
            )}
        </div>
    )
}