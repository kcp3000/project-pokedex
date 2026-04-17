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

export type PokemonGlobal = {
  id: number
  name: string
  abilities: Ability[]
  stats: Stat[]
  cries: { latest: string }
  sprites: {
    front_default: string
    back_default: string
  }
  types: Types[]
  description: string
};