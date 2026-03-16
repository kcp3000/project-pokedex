import { useEffect, useState } from 'react'
import { getPokemonByTypes, getPokemon, getPokemonByName, getPokemonByGeneration, getPokemonByID } from './api/pokemonApi'
import PokemonCarousel from './components/Carousel'
import TypeFilter from './components/TypeFilter'
import PokemonByName from './components/SearchBar'
import GenerationFitler from './components/GenerationFilter'
import './App.css'

/*
**NOTE TO SELF**

ADD FILTER BY GENERATION?? ✅✅✅✅

its has been done :D

ADD EVOLUTION CHAIN??
*/

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
      const [selectedGeneration, setSelectedGeneration] = useState<string>("all")
      const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

      const extractID = (urlID:string|any) => {
        return urlID.split("/").filter(Boolean).pop()
      }

      useEffect(() => {
            if (selectedType === "") return
            if (selectedType === "all") {
              const fetchDefaultPokemon = async () => {//this will be rendering default pokemons if nothing is selected in the filter
                const data = await getPokemon()

                const detailedDefaultPokemon = await Promise.all(
                  data.results.slice(0, 151).map((p: any) => 
                    fetch(p.url).then(res => res.json())
                  )
                )

                setFilteredPokemon(detailedDefaultPokemon)
                setSelectedGeneration("")
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
                    data.pokemon.slice(0, 151).map((p: any) => 
                        fetch(p.pokemon.url).then(res => res.json())
                    )
                )
                // console.log(detailedPokemon)
                setFilteredPokemon(detailedPokemon)
                setSelectedGeneration("")
                setGetName("")
                setCurrentIdx(0)
            }
            fetchPokemonByType()

        }, [selectedType])

        useEffect(() => {
            if (selectedGeneration === "") return
            if (selectedGeneration === "all") {
              const fetchDefaultPokemon = async () => {
                const data = await getPokemon()

                const detailedDefaultPokemon = await Promise.all(
                  data.results.slice(0, 151).map((p: any) => 
                    fetch(p.url).then(res => res.json())
                  )
                )

                setFilteredPokemon(detailedDefaultPokemon)
                setSelectedType("")
                setCurrentIdx(0)
                setGetName("")
                // console.log(detailedDefaultPokemon)
              }
              fetchDefaultPokemon()
              return
            }

            const fetchPokemonByGen = async () => {
              const data = await getPokemonByGeneration(selectedGeneration)

              const detailedPokemon = await Promise.all(
                data.pokemon_species.slice(0, 151).map((species: any) => {
                  return getPokemonByID(extractID(species.url))
                })
              )
              
              // console.log(data.pokemon_species)
              setFilteredPokemon(detailedPokemon)
              setSelectedType("")
              setCurrentIdx(0)
              setGetName("")
            }
            fetchPokemonByGen()
      
      }, [selectedGeneration])

        const handleSearch = async () => {
          if (!getName) return

          try {
            const data = await getPokemonByName(getName.toLowerCase())
            setSelectedGeneration("")
            setSelectedType("")
            setFilteredPokemon([data])
            setCurrentIdx(0)
            setGetName("")
            
          } catch (err) {
            console.error("Pokemon not found")
          }
        }
          
  return (
    <div className='MAIN_POKEDEX_CONTAINER'>
      <h1>POKEDEX</h1>
      <div>
        <section>
          <TypeFilter 
            selectedType={selectedType} 
            onTypeChange={setSelectedType}
          />
          <GenerationFitler 
            selectedGeneration={selectedGeneration}
            onTypeChange={setSelectedGeneration}
          />
        </section>
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
