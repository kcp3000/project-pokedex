import { useEffect, useState } from "react";
import { getTypes } from "../api/pokemonApi";

type PokemonType = {
        name: string
        url: string
    };

type TypeFilterProps = {
    selectedType: string
    onTypeChange: (type:string) => void;
};

export default function TypeFilter({selectedType, onTypeChange}: TypeFilterProps) {
    const [types, setTypes] = useState<PokemonType[]>([]);

    useEffect(() => {
        const fetchType = async () => {
            const data = await getTypes()
            setTypes(data.results)
            // console.log(data.results)
        }
        fetchType()

    }, [])

    return (
        <div>
            <p>FILTER BY TYPE</p>
            <select 
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
            >
                <option value="" disabled>FILTER BY TYPE!</option>
                <option value="all">ALL</option>
                {types.map((type) => (
                    <option value={type.name} key={type.name}>
                        {type.name.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}