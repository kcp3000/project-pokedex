import { useEffect, useState } from 'react'
import { getPokemonByTypes, getPokemon, getPokemonByName } from './api/pokemonApi'
import PokemonCarousel from './components/Carousel'
import TypeFilter from './components/TypeFilter'
import PokemonByName from './components/SearchBar'
import './App.css'

type Types = {
  type: {
    name: string
  }
}

type Ability = {
        ability: {
            name: string
        }
    }

type Stat = {
        base_stat: number
        stat: {
            name: string
        }
    }

type Pokemon = {
        id: number
        name: string
        abilities: Ability[]
        stats: Stat[]
        cries: {
            latest: string
        }
        sprites: {
            front_default: string
            back_default: string
        }
        types: Types[]
    }

function App() {
      const [getName, setGetName] = useState("")
      const [currentIdx, setCurrentIdx] = useState(0)
      const [selectedType, setSelectedType] = useState<string>("all");
      const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

      useEffect(() => {
            if (selectedType === "") return
            if (selectedType === "all") {
              const fetchDefaultPokemon = async () => {// this will be rendering default pokemons if nothing is selected in the filter
                const data = await getPokemon()

                const detailedDefaultPokemon = await Promise.all(
                  data.results.slice(0, 30).map((p: any) => 
                    fetch(p.url).then(res => res.json())
                  )
                )

                setFilteredPokemon(detailedDefaultPokemon)
                setCurrentIdx(0)
                setGetName("")
                // console.log(detailedDefaultPokemon)
              }
              fetchDefaultPokemon()
              return
            }

            const fetchPokemonByType = async () => {
                const data = await getPokemonByTypes(selectedType)
                
                const detailedPokemon = await Promise.all(//fetching for the url that's inside of the 
                    data.pokemon.slice(0, 30).map((p: any) => 
                        fetch(p.pokemon.url).then(res => res.json())
                    )
                )
                // console.log(detailedPokemon)
                setFilteredPokemon(detailedPokemon)
                setGetName("")
                setCurrentIdx(0)
            }
            fetchPokemonByType()

        }, [selectedType])

        const handleSearch = async () => {
          if (!getName) return

          try {
            const data = await getPokemonByName(getName.toLowerCase())
            setSelectedType("")
            setFilteredPokemon([data])
            setCurrentIdx(0)
            
          } catch (err) {
            console.error("Pokemon not found")
          }
        }
          
  return (
    <div>
      <h1>CHECK</h1>
      <div>
        <TypeFilter 
          selectedType={selectedType} 
          onTypeChange={setSelectedType}
        />
        <PokemonByName 
          getName={getName}
          setGetName={setGetName}
          onSearch={handleSearch}
        />
      </div>
      <PokemonCarousel 
        pokemonList={filteredPokemon}
        currentIdx={currentIdx}
        setCurrentIdx={setCurrentIdx}
      />
    </div>
  )
}

export default App
