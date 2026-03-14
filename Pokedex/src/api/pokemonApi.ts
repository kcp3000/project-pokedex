const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemon = async () => {
    const res = await fetch (`${BASE_URL}/pokemon?limit=30`);

    if (!res.ok) {
        throw new Error("Failed to fetch pokemon");
    };

    return res.json();
}; 

export const getPokemonByName = async (name:string) => {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`);

    if (!res.ok) {
        throw new Error("Failed to fetch Name of pokemon");
    };

    return res.json();
};

export const getTypes = async () => {
    const res = await fetch (`${BASE_URL}/type`);
    return res.json();
};

export const getPokemonByTypes = async (type:string) => {
    const res = await fetch (`${BASE_URL}/type/${type}`);
    return res.json();
};