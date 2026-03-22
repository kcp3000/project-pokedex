import { getPokemonByID } from "../api/pokemonApi";
import { useEffect, useState } from "react";
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';


type Pokemon = {
        id: number
        name: string
        sprites: {
            front_default: string 
        }
        description: string
    }

export default function MyFavorites () {
    const [currentIdx, setCurrentIdx] = useState(0)
    const [pokemonFavs, setPokemonFavs] = useState<Pokemon[]>([])
    
    const favsIDArray = [
        {
            id: 94,
            description: "i love gengar so much, so cool. just look at his mischievous smile :')"
        },

        {
            id: 461,
            description: "same boat as gengar but with a hint of edge. who doesn't like a little bit of edge?"
        },

        {
            id: 802,
            description: "so f-in CUTE"
        },
        
        {
            id: 6,
            description: "can't go wrong with an og favorite, so cool in the anime too"
        },

        {
            id: 644,
            description: "probably my favorite legendary ever. the duo btwn him and resh is too iconic"
        }, 

        {
            id: 807,
            description: "recent fav. love ora's design so much"
        },

        {
            id: 419,
            description: "love him in the anime with ash"
        },

        {
            id: 392,
            description: "Pokémon: DP Sinnoh EPS - 188, that's all"
        },

        {
            id: 448,
            description: "movies had me thinking he was a legendary :sob:. still cool though"
        },

        {
            id: 655,
            description: "so much fun using her in XY. del's new mega is sick too"
        }
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
            <div className="F_buttons_container">
                
                
            </div>
            <p className="F_myfavs">my favs :D</p>
            <h1 className="F_name">{fav.name}</h1>
            <div className="F_carousel">
                <button
                    className="F_button_prev"
                    onClick={() => {setCurrentIdx(prev => prev === 0 ? pokemonFavs.length - 1 : prev - 1)}}
                >
                    <ChevronLeft />
                </button>
                <img 
                    src={fav.sprites.front_default} 
                    alt={`Front sprite of ${fav.name}`} 
                    className="F_sprite"
                />
                <button
                    className="F_button_next"
                    onClick={() => {setCurrentIdx(prev => prev === pokemonFavs.length - 1 ? 0 : prev + 1)}}
                >
                    <ChevronRight />     
                </button>
            </div>
            <div className="F_des_container">
                <p className="F_description">
                    {fav.description}
                </p>
                
            </div>
        </div>
    )

    // [94, 461, 802, 6, 644, 807, 419, 392, 448]
}