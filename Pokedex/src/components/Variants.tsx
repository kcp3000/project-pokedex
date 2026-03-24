import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronsRight, ChevronsLeft } from "lucide-react";
import type { PokemonGlobal } from "../types/Pokemon";

type VariantProps = {
    variantList: PokemonGlobal[]
    onSelectVariant: (mon: PokemonGlobal) => void
};

export default function PokemonVariants ({variantList, onSelectVariant}: VariantProps) {
    const [variantIdx, setVariantIdx] = useState(0)
    const [onHoverRight, setOnHoverRight] = useState(false);
    const [onHoverLeft, setOnHoverLeft] = useState(false);

    const variant = variantList[variantIdx]

    if (!variant) return null
    if (variantList.length <= 1) return null

    return (
        <div className="V_container">
            <button
                onMouseEnter={() => setOnHoverLeft(true)}
                onMouseLeave={() => setOnHoverLeft(false)}
                className="V_prev_button"
                onClick={() => {
                    setVariantIdx(prev => prev === 0 ? variantList.length - 1 : prev - 1)
                }}
            >
                {onHoverLeft ? (
                    <div>
                        <ChevronsLeft size={16}/>
                    </div>
                ) : (
                    <div>
                        <ChevronLeft size={16}/>
                    </div>
                )}
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
                onMouseEnter={() => setOnHoverRight(true)}
                onMouseLeave={() => setOnHoverRight(false)}
                className="V_next_button"
                onClick={() => {
                    setVariantIdx(prev => prev === variantList.length - 1 ? 0 : prev + 1)
                }}
            >
                {onHoverRight ? (
                    <div>
                        <ChevronsRight size={16}/>
                    </div>
                ) : (
                    <div>
                        <ChevronRight size={16}/>
                    </div>
                )}
                
            </button> 
        </div>
    )
};