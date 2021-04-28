import React, { useEffect, useRef, useState } from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { Pokemon } from '../../interfaces/Pokemon'
import { PokemonCard } from '../../components/PokemonCard'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface PokemonApiResponse{
    count: number
    next: string
    previous: string
    results: { name: string, url: string }[]
}

function PokemonList() {

    // Fetch data
    const limit = 10
    const [nextPokemon, setNextPokemon] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
    const [loading, setLoading] = useState(false)

    // Pokemon list
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])

    // Scroll helper
    const listRef = useRef<FlatList>(null)
    const [isOnTop, setIsOnTop] = useState(true)
    function handleScroll({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) {
        
        if (nativeEvent.contentOffset.y === 0) return setIsOnTop(true)
        if (isOnTop && nativeEvent.contentOffset.y !== 0) return setIsOnTop(false)
    }

    useEffect(() => { fetchPokemon() }, [])

    async function fetchPokemon() {

        if (loading) return

        setLoading(true)

        try {
            
            const { data } = await axios.get<PokemonApiResponse>(nextPokemon)
            
            setNextPokemon(data.next)
    
            const list = data.results
    
            const newPokemons = await Promise.all(list.map(async pokemon => {
                const { data } = await axios.get<Pokemon>(pokemon.url)
                return data
            }))
    
            setPokemonList(previousPokemons => [...previousPokemons, ...newPokemons])
            
        } catch (error) {
            console.log(error)
        }

        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={pokemonList}
                renderItem={({ item }) => <PokemonCard pokemon={item} style={{ width: '47.5%', marginBottom: '5%' }}/>}
                keyExtractor={(pokemon, i) => `${i} ${pokemon.id.toString()}`}
                numColumns={2}
                contentContainerStyle={{ padding: 20 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                style={{ flex: 1 }}
                onEndReached={fetchPokemon}
                ref={listRef}
                onScroll={handleScroll}
            />
            {!isOnTop &&
                <TouchableOpacity
                    onPress={() => listRef.current?.scrollToOffset({ animated: true, offset: 0 })}
                    style={{ position: 'absolute', bottom: 30, right: 30, padding: 20, backgroundColor: 'rgba(0,0,0,.1)', borderRadius: 1000 }}
                >
                    <Icon name='chevron-up' size={30}/>
                </TouchableOpacity>
            }
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20
    }
})

export { PokemonList }



// function App() {

// 	const [loading, setLoading] = useState(false)

// 	const [resultsPerPage, setResultsPerPage] = useState(48)
// 	const [offset, setOffset] = useState(0)

// 	const [pokemons, setPokemons] = useState<Pokemon[]>([])
// 	const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>()

// 	useEffect(() => { fetchPokemon() }, [])

// 	const fetchPokemon = async () => {

// 		setLoading(true)

// 		const limit = resultsPerPage
// 		//const offset = limit * (page - 1)

// 		try {
// 			const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
// 			const { results: pokemonList }: PokemonApiResponse = await result.json()

// 			const pokemonData = await Promise.all(pokemonList.map(async pokemon => {
				
// 				try {
// 					const rawData = await fetch(pokemon.url)
// 					// console.log(rawData)
// 					const pokemonInfo = await rawData.json()
					
// 					return pokemonInfo
// 				} catch (error) {
// 					console.log(error)
// 					return null
// 				}
// 			}))