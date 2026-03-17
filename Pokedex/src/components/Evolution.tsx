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
}

export default function EvolutionPairs ({evolutionChain}: EvolutionChainProp) {
    if (evolutionChain.length === 0) return

    return (
        <div className="E_container">
            <ul className="E_list">
            {evolutionChain.map((mon) => (
                <li className="E_item" key={mon.name}>
                    <img src={mon.sprites.front_default} alt={`Front Sprite of ${mon.name}`} />
                </li>
            ))}
            </ul>
        </div>
    )
}