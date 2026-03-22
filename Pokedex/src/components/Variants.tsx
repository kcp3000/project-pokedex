import { useState } from "react"
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import type { PokemonGlobal } from "../types/Pokemon";

type VariantProps = {
    variantList: PokemonGlobal[]
    onSelectVariant: (mon: PokemonGlobal) => void
};

export default function PokemonVariants ({variantList, onSelectVariant}: VariantProps) {
    const [variantIdx, setVariantIdx] = useState(0)

    const variant = variantList[variantIdx]

    if (!variant) return null
    if (variantList.length <= 1) return null

    return (
        <div className="V_container">
            <button
            
                className="V_prev_button"
                onClick={() => {
                    setVariantIdx(prev => prev === 0 ? variantList.length - 1 : prev - 1)
                }}
            >
                <ChevronLeft size={16} />
            </button>
            <ul className="V_list">
                <li 
                    className="V_item"
                    key={variant.name}
                >
                    <p className="V_forms">FORMS</p>
                    <button 
                        className="V_sprite"
                        onClick={() => {
                            onSelectVariant(variant)
                            setVariantIdx(0)
                        }}
                    >
                        <img src={variant.sprites.front_default} alt={`Front Sprite of ${variant.name}`} />
                    </button>
                </li>
            </ul>
            <button
                className="V_next_button"
                onClick={() => {
                    setVariantIdx(prev => prev === variantList.length - 1 ? 0 : prev + 1)
                }}
            >
                <ChevronRight size={16}/>
            </button> 
        </div>
    )
};