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

    return (
        <div className="S_container">
                        <ul className="S_list">{pokemon?.stats?.map((stat) => (
                            <li className="S_item" key={stat.stat.name}>
                                <span>
                                    <strong>{stat.stat.name.toUpperCase()}</strong>
                                </span> 
                                <span>
                                    {stat.base_stat}
                                </span>
                            </li>
                            ))}
                        </ul>
                    </div>
    )
}