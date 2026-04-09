# PROJECT-POKEDEX
Pokemon Pokedex!

Built a fully interactive Pokédex web app using React, TypeScript, and Vite, featuring dynamic data fetching, evolution chain traversal, variant handling, and generation-based filtering with a responsive and animated UI.
# Live Demo
👉 https://dexnav-pokedex.vercel.app/

# Key Implementation Details

## Installation
### Clone the repository:
```
</>Bash
git clone https://github.com/kcp3000/project-pokedex.git
cd project-pokedex/Pokedex
```

### Install dependencies:
```
</>Bash
npm install
```

### Run locally:
```
</>Bash
npm run dev
```

### Build for production:
```
npm run build
```
## Tech Stack
- Frontend: React + TypeScript
- Build Tool: Vite
- Animations: Framer Motion
- API: PokéAPI
- Deployment: Vercel
## Data Handling
### Uses pokemon-species to resolve:
- Evolution chains
- Variants/forms
- Generation mapping
## State Management
### Centralized around:
- filteredPokemon
- currentIdx
- evolutionChain
- variantList
## Smart Navigation Logic
### Clicking:
- Evolutions
- Variants
- Search results
### Rebuilds the correct Pokémon list context (e.g. generation-based)

# Notes
Pokémon forms (e.g. raichu-alola, zygarde-50) are resolved via:
pokemon → species → varieties
Generation grouping is based on original species, not forms
