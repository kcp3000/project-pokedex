type Stat = {
        base_stat: number
        stat: {
            name: string
        }
    }

type Pokemon = {
        id: number
        name: string
        stats: Stat[]
    }

type PokemonStatsProp = {
    pokemonList: Pokemon[]
    currentIdx: number
}

export default function Stats ({pokemonList, currentIdx}: PokemonStatsProp) {
    const pokemon = pokemonList[currentIdx]
    let max: number = 255

    return (
        <div className="S_container">
                        <ul className="S_list">{pokemon?.stats?.map((stat) => (
                            <li className="S_item" key={stat.stat.name}>
                                <span className="S_span_name">
                                    <strong>{stat.stat.name.toUpperCase()}</strong>
                                </span> 
                                <div className="S_blocks">
                                    {Array.from({length: 9}).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`S_block ${
                                                i < Math.round(stat.base_stat / 25) ? "filled" : ""
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="S_base_stat">
                                    {stat.base_stat}
                                </span>
                            </li>
                            ))}
                        </ul>
                    </div>
    )
}