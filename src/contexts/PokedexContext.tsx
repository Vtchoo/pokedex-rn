import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Pokemon } from '../interfaces/Pokemon'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface PokedexContextData {
    myPokemons: { [id: number]: Pokemon }
    addPokemon: (pokemon: Pokemon) => Promise<void>
    removePokemon: (pokemon: number | Pokemon) => Promise<void>
}

interface PokedexProviderProps {
    children: ReactNode
}

const PokedexContext = createContext({} as PokedexContextData)



function PokedexProvider({ children, ...props }: PokedexProviderProps) {
    
    const [myPokemons, setMyPokemons] = useState<{ [id: number]: Pokemon }>({})

    useEffect(() => { loadMyPokemons() }, [])

    async function loadStoredPokemons() {
        const data = await AsyncStorage.getItem('@pokedex:myPokemons')
        return data ? JSON.parse(data) : {}
    }

    async function loadMyPokemons() {
        try {
            const myPokemons = await loadStoredPokemons()
            setMyPokemons(myPokemons)
        } catch (error) {
            throw error
        }
    }

    async function addPokemon(pokemon: Pokemon) {
        try {
            const myPokemons = await loadStoredPokemons()
            myPokemons[pokemon.id] = pokemon
            await AsyncStorage.setItem('@pokedex:myPokemons', JSON.stringify(myPokemons))
            setMyPokemons(myPokemons)
        } catch (error) {
            throw error
        }
    }

    async function removePokemon(pokemon: Pokemon | number) {
        try {
            const myPokemons = await loadStoredPokemons()
            delete myPokemons[typeof pokemon === 'number' ? pokemon : pokemon.id]
            await AsyncStorage.setItem('@pokedex:myPokemons', JSON.stringify(myPokemons))
            setMyPokemons(myPokemons)
        } catch (error) {
            throw error
        }
    }

    return (
        <PokedexContext.Provider value={{
            myPokemons,
            addPokemon,
            removePokemon
        }}>
            {children}
        </PokedexContext.Provider>
    )
}

function usePokedex() { return useContext(PokedexContext) }

export { PokedexProvider, usePokedex }