import { useEffect, useState } from "react";
import { getTypes, getPokemonByTypes } from "../api/pokemonApi";


export default function TypeFilter() {
    type PokemonType = {
        name: string
        url: string
    };
    
    type FilteredPokemon = {
        pokemons: {
            names: string
            url: string
        }
    };
    
    const [types, setTypes] = useState<PokemonType[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string>("");
    const [filteredPokemon, setFilteredPokemon] = useState<FilteredPokemon[]>([]);

    useEffect(() => {
        const fetchType = async () => {
            const data = await getTypes()
            setTypes(data.results)
            console.log(data.results)
        }
        fetchType()

    }, [])

    useEffect(() => {
        if (!selectedTypes) return

        const fetchPokemonByType = async () => {
            const data = await getPokemonByTypes(selectedTypes)
            
            const detailedPokemon = await Promise.all(//fetching for the url that's inside of the 
                data.pokemon.slice(0, 20).map((p: any) => 
                    fetch(p.pokemon.url).then(res => res.json())
                )
            )
            console.log(detailedPokemon)
            setFilteredPokemon(detailedPokemon)
        }
        fetchPokemonByType()

    }, [selectedTypes])

    return (
        <div>
            <select 
                value={selectedTypes}
                onChange={(e) => setSelectedTypes(e.target.value)}
            >
                <option value="">FILTER BY TYPE</option>
                {types.map((type) => (
                    <option value={type.name} key={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>
        </div>
    );
}