import { useEffect, useState } from "react";
import { getGeneration } from "../api/pokemonApi";

type PokemonGen = {
    name: string;
    url: string;
}

type GenerationFitlerProps = {
    selectedGeneration: string;
    onTypeChange: (generation: string) => void;
}

export default function GenerationFitler({selectedGeneration, onTypeChange}: GenerationFitlerProps) {
    const [gen, setGen] = useState<PokemonGen[]>([])
    
    const extractID = (urlID:string|any) => {
        return urlID.split("/").filter(Boolean).pop()
    }

    useEffect(() => {
        const fetchGen = async () => {
            const data = await getGeneration()
            setGen(data.results)
            // console.log(data.results)
        }
        fetchGen()
    }, [])

    return (
        <div>
            <p>FILTER BY GEN</p>
            <select 
                value={selectedGeneration}
                onChange={(e) => onTypeChange(e.target.value)}
            >
                <option value="" disabled>FILTER BY GEN!</option>
                <option value="all">ALL</option>
                {gen.map((g) => {
                    const generationNumber = extractID(g.url)

                    return(
                        <option value={generationNumber} key={g.name}>
                            GEN {generationNumber}
                        </option>
                        )
                    }
                )}
            </select>
        </div>
    );
}