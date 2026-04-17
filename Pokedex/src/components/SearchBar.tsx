import pokeball from "../images/pokeballpixel.png"

type PokemonByName = {
    getName: string
    setGetName: (name: string) => void
    onSearch: () => void
}

export default function PokemonByName({getName, setGetName, onSearch}: PokemonByName) {

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onSearch()
    }

    return (
        <div className="Srch_container">
            <section>
                <form className="Srch_form" onSubmit={handleSubmit}>
                    <input 
                        className="Srch_input"
                        type="text"
                        placeholder="Search Pokemon!"
                        value={getName}
                        onChange={(e) => setGetName(e.target.value)}
                    />
                    <button
                        className="Srch_button"
                        type="submit"
                    >
                        <img src={pokeball} alt="" className="Srch_pokeball"/>
                    </button>
                </form>
            </section>
        </div>
    )
}