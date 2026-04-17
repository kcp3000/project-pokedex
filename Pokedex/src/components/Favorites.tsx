import { getPokemonByID } from "../api/pokemonApi";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import type { PokemonGlobal } from '../types/Pokemon'

export default function MyFavorites () {
    const [currentIdx, setCurrentIdx] = useState(0)
    const [pokemonFavs, setPokemonFavs] = useState<PokemonGlobal[]>([])
    const [onHoverRight, setOnHoverRight] = useState(false);
    const [onHoverLeft, setOnHoverLeft] = useState(false);

    
    const favsIDArray = [
        {
            id: 196,
            description: "espeon and sylveon got that sort of aura that matches yours..."
        },

        {
            id: 700,
            description: "...it's hard to describe but it's like a safe-- warm feeling, I love it"
        },

        {
            id: 197,
            description: "umbreon is the sassy part of you (jolteon better)"
        },
        
        {
            id: 470,
            description: "and leafeon is the down-to-earth you. humble, grounded, centered."
        },

        {
            id: 547,
            description: "you're whimsical (haha get it) and fun to be around. its never a dull moment with you by me"
        }, 

        {
            id: 151,
            description: "seeing mew smile in the movies always made me smile, just like yours. your smile brightens my day"
        },

        {
            id: 150,
            description: "auraful"
        },

        {
            id: 94,
            description: "wanna be me sooooooo bad teehee. i joke, we just twins fr"
        },

        {
            id: 4,
            description: "never wanna see the light within you threaten to be blown away. like char's tail, keep burning"
        },

        {
            id: 619,
            description: "u never beating me in a fade smh"
        },

        {
            id: 59,
            description:"(ask me what i was going to say here)"
        },

        {
            id: 778,
            description:"mimikyu is so tragically cute bruh"
        },

        {
            id: 104,
            description:"same with cubone :sob: but cubone is so fucking adorable, just like u >:)"
        },
    ]

    useEffect(() => {
        const fetchPokemonID = async () => {
            const favIDFETCH = favsIDArray.map(async (f) => {
                const apiDATA = await getPokemonByID(f.id)
                return {
                    ...apiDATA,
                    description: f.description
                }
            })

            const favList = await Promise.all(favIDFETCH)
            setPokemonFavs(favList)
        }   
        fetchPokemonID()
    }, [])

    const fav = pokemonFavs[currentIdx]

    if (!fav) return null;

    return (
        <div className="F_container">
            
            
            <div className="F_carousel">
                <p className="F_myfavs">tiny's favs {`<3`}</p>
                <h1 className="F_name">{fav.name.length > 10 ? `${fav.name.slice(0, 10)}...` : fav.name}</h1>
                <img 
                    src={fav.sprites.front_default} 
                    alt={`Front sprite of ${fav.name}`} 
                    className="F_sprite"
                />
                
            </div>
            <div className="F_des_container">
                <p className="F_description">
                    {fav.description}
                </p>
            </div>
            <div className="F_button_container">
                <button
                    onMouseEnter={() => setOnHoverLeft(true)}
                    onMouseLeave={() => setOnHoverLeft(false)}
                    className="F_button_prev"
                    onClick={() => {setCurrentIdx(prev => prev === 0 ? pokemonFavs.length - 1 : prev - 1)}}
                >
                    {onHoverLeft ? (
                        <div>
                            <ChevronsLeft />
                        </div>
                    ) : (
                        <div>
                            <ChevronLeft />
                        </div>
                    )}
                </button>
                <button
                    onMouseEnter={() => setOnHoverRight(true)}
                    onMouseLeave={() => setOnHoverRight(false)}
                    className="F_button_next"
                    onClick={() => {setCurrentIdx(prev => prev === pokemonFavs.length - 1 ? 0 : prev + 1)}}
                >
                    {onHoverRight ? (
                        <div>
                            <ChevronsRight />     
                        </div>
                    ) : (
                        <div>
                            <ChevronRight />     
                        </div>
                    )}
                    
                </button>
            </div>
        </div>
    )

    // [94, 461, 802, 6, 644, 807, 419, 392, 448]
}