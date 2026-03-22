import { useEffect, useState } from 'react'
import { getPokemonByTypes, getPokemon, getPokemonByName, getPokemonByGeneration, getPokemonByID, getPokemonSpecies } from './api/pokemonApi'
import PokemonCarousel from './components/Carousel'
import Stats from './components/Stats'
import TypeFilter from './components/TypeFilter'
import PokemonByName from './components/SearchBar'
import GenerationFitler from './components/GenerationFilter'
import EvolutionPairs from './components/Evolution'
import PokemonVariants from './components/Variants'
import MyFavorites from './components/Favorites'
import type { PokemonGlobal } from './types/Pokemon'
import tvScreen from './images/y2kscreen.png'
import notePad from './images/notepadIcon.png'
import pikaDance from './images/pikaDance.gif'
import pokemonLogo from './images/Pokemon-Logo-1998.png'
import './App.css'

/*
**NOTE TO SELF**

ADD FILTER BY GENERATION?? ✅✅✅✅

its has been done :D

ADD EVOLUTION CHAIN?? ✅✅✅✅
*/

type PokemonSpecies = {
  id: number
  name: string
  varieties: {
    pokemon: {
      name: string
      url: string
    }
  }[]
  generation: {
    name: string
    url: string
  }
}

function App() {
      const [getName, setGetName] = useState("")
      const [currentIdx, setCurrentIdx] = useState(0)
      const [selectedType, setSelectedType] = useState<string>("all");
      const [selectedGeneration, setSelectedGeneration] = useState<string>("all")
      const [filteredPokemon, setFilteredPokemon] = useState<PokemonGlobal[]>([]);
      const [evolutionChain, setEvolutionChain] = useState<PokemonGlobal[]>([])
      const [variantList, setVariantList] = useState<PokemonGlobal[]>([])

      const extractID = (urlID:string|any) => {
        return urlID.split("/").filter(Boolean).pop()
      }

      //TYPE FITLER
      //TYPE FITLER
      //TYPE FITLER
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

        //GEN FITLER
        //GEN FITLER
        //GEN FITLER
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

        //SEARCH FUNCTION
        //SEARCH FUNCTION
        //SEARCH FUNCTION
        const handleSearch = async () => {
          if (!getName) return

          try {
            const data = await getPokemonSpecies(getName.toLowerCase())
            const properPokemonInfo = await getPokemonByName(data.varieties[0].pokemon.name)
            
            const gen = data.generation.name
            const genData = await getPokemonByGeneration(gen)
            const detailedSearch = await Promise.all(
              genData.pokemon_species.slice(0, 151).map(async(species: any) => {
                const speciesData = await getPokemonSpecies(extractID(species.url))
                return fetch(speciesData.varieties[0].pokemon.url).then(res => res.json())
              })
            )

            const newIndex = detailedSearch.findIndex(p => p.id === properPokemonInfo.id)

            setSelectedGeneration("")
            setSelectedType("")
            setFilteredPokemon(detailedSearch)
            setCurrentIdx(newIndex === -1 ? 0 : newIndex)
            setGetName("")
            
          } catch (err) {
            console.error("Pokemon not found")
          }
        }
        
        //EVOLUTION
        //EVOLUTION
        //EVOLUTION
        const currentPokemon = filteredPokemon[currentIdx];

        const extractName = (chain: any): number[] => {
            const ids: number[] = []
            const traverse = (node: any) => {
                ids.push(extractID(node.species.url))

                node.evolves_to.forEach((evolution: any) => {
                    traverse(evolution)
                })
            }

            traverse(chain)

            return ids
          };

        useEffect(() => {
          if (!currentPokemon) return
          if (!currentPokemon.id) return
          // setEvolutionChain([])

          const fetchSpecies = async () => {
            const data = await getPokemonSpecies(currentPokemon.id)
            const chainEvo = await fetch(data.evolution_chain.url).then(res => res.json())
            const extractedNames = extractName(chainEvo.chain)
            const detailedEvoPokemon = extractedNames.map(async(id) => {
              return await getPokemonByID(id)
            })
            const evoMons = await Promise.all(detailedEvoPokemon)
            // if (evoMons.length === 0) return null
            setEvolutionChain(evoMons)
          }
          fetchSpecies()
          
        }, [currentPokemon])

        const handleSelectPokemon = async (mon: PokemonGlobal) =>{
          const index = filteredPokemon.findIndex((p) => 
            p.id === mon.id
          )

          if (index !== -1) {
            setCurrentIdx(index)
          } else {
            const data = await getPokemonSpecies(mon.id)
            const getGen = await getPokemonByGeneration(data.generation.name)
            const detailedNewList = await Promise.all(
              getGen.pokemon_species.slice(0, 151).map((species: any) => {
                return getPokemonByID(extractID(species.url))
              })
            )

            const newIndex = detailedNewList.findIndex(p => p.id === mon.id)
            setFilteredPokemon(detailedNewList)
            setCurrentIdx(newIndex)
          }
        }

        //VERIANTS
        //VERIANTS
        //VERIANTS

        useEffect(() => {
          if (!currentPokemon) return
          if (!currentPokemon.id) return
          setVariantList([])

          const fetchVariants = async () => {
            const data: PokemonSpecies = await getPokemonSpecies(currentPokemon.id)
            const variantData = data.varieties.map(async(v) => {
              return await fetch(v.pokemon.url).then(res => res.json())
            });

            const variantMons = await Promise.all(variantData)
            setVariantList(variantMons)
          }
          fetchVariants()

        }, [currentPokemon])

        const handleSelectVariant = async (mon: PokemonGlobal) =>{
          const index = filteredPokemon.findIndex((p) => 
            p.id === mon.id
          )

          if (index !== -1) {
            setCurrentIdx(index)
          } else {
            const data = await getPokemonByID(mon.id)
            const species = await getPokemonSpecies(data.species.name) 

            const detailedVariants = await Promise.all(
                species.varieties.map(async (mon: any) => {
                return await fetch(mon.pokemon.url).then(res => res.json())
              })
            ) 

            const newIndex = detailedVariants.findIndex(p => p.id === mon.id)
            if (newIndex === -1) {
              setCurrentIdx(0)
            }

            setVariantList([])
            setFilteredPokemon(detailedVariants)
            setCurrentIdx(newIndex === -1 ? 0 : newIndex)
          }
        }
        
  return (
    <div className='MAIN_POKEDEX_CONTAINER'>
      <div className='TITLE_NAV_CONTAINER'>
        <h1 className='TITLE'>POKEDEX</h1>
        <PokemonByName 
          getName={getName}
          setGetName={setGetName}
          onSearch={handleSearch}
        />
      </div>
      <div className='POKEDEX_FILTER'>
        <TypeFilter 
          selectedType={selectedType} 
          onTypeChange={setSelectedType}
        />
        
        <GenerationFitler 
          selectedGeneration={selectedGeneration}
          onTypeChange={setSelectedGeneration}
        />
      </div>
      
        
      <div className='Pokedex_components'>
          <div className='APP_block3'></div>
          <div className='APP_block4'></div>
          <div className='APP_block5'></div>
          <div className='APP_block6'></div>
          <div className='APP_block7'></div>
          <div className='APP_block8'></div>
          <div className='APP_block9'></div>
          <div className='APP_block10'></div>
          <div className='APP_block11'></div>
          
          <p className='STAT_LINE'>STAT LINE</p>
          <PokemonCarousel 
            pokemonList={filteredPokemon}
            currentIdx={currentIdx}
            setCurrentIdx={setCurrentIdx}
          />
          <PokemonVariants
            variantList={variantList}
            onSelectVariant={handleSelectVariant}
          />
          <Stats  
            pokemonList={filteredPokemon}
            currentIdx={currentIdx}
          />
          <EvolutionPairs 
            evolutionChain={evolutionChain}
            onSelectPokemon={handleSelectPokemon}
          />
          <img src={notePad} alt={`notepad icon`} className='notepad3'/>
          <img src={notePad} alt={`notepad icon`} className='notepad2'/>
          <img src={notePad} alt={`notepad icon`} className='notepad'/>
          <img src={tvScreen} alt={`old tv screen`} className='tv'/>
          <MyFavorites />
      </div>
      <div className='pokemon_container'>
        <img src={pikaDance} alt="pikachu dance" className='pikadance'/>
        <img src={pokemonLogo} alt="pokemon logo" className='pklogo'/>
        <img src={pikaDance} alt="pikachu dance" className='pikadance'/>
      </div>
    </div>
  )
}

export default App
