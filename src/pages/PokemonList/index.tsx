import React, { useEffect, useRef, useState } from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import axios from 'axios'
import { Pokemon } from '../../interfaces/Pokemon'
import { PokemonCard } from '../../components/PokemonCard'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { usePokedex } from '../../contexts/PokedexContext'

interface PokemonPointer {
    name: string
    url: string
}

interface PokemonApiResponse{
    count: number
    next: string
    previous: string
    results: PokemonPointer[]
}

interface PokemonApiTypeResponse {

}

function PokemonList() {

    
    const { colors } = usePokedex()
    
    // Fetch data
    const limit = 10
    const INITIAL_FETCH_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
    const [loading, setLoading] = useState(false)
    const [nextPokemon, setNextPokemon] = useState(INITIAL_FETCH_URL)
    
    const [types, setTypes] = useState<{ name: string, url: string }[]>([])
    const [selectedType, setSelectedType] = useState<{ name: string, url: string }>()
    
    // Pokemon list
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])

    // Scroll helper
    const listRef = useRef<FlatList>(null)
    const [isOnTop, setIsOnTop] = useState(true)
    function handleScroll({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) {
        if (nativeEvent.contentOffset.y === 0) return setIsOnTop(true)
        if (isOnTop && nativeEvent.contentOffset.y !== 0) return setIsOnTop(false)
    }

    useEffect(() => {
        fetchTypes()
        // fetchPokemon()
    }, [])

    useEffect(() => {
        console.log(selectedType)
        if (selectedType)
            fetchPokemonByType(selectedType)
        else
            fetchPokemon()    
    }, [selectedType])

    async function fetchTypes() {
        try {
            const { data } = await axios.get<PokemonApiResponse>('https://pokeapi.co/api/v2/type/')
            setTypes(data.results)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchPokemon() {

        if (loading) return

        if (selectedType) return

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

    async function fetchPokemonByType(type: { name: string, url: string }) {
        
        setLoading(true)
        
        try {
            
            const { data } = await axios.get(type.url)

            const list = data.pokemon as { slot: number, pokemon: PokemonPointer }[]

            const newPokemons = await Promise.all(list.map(async pokemon => {
                const { data } = await axios.get<Pokemon>(pokemon.pokemon.url)
                console.log(data)
                return data
            }))

            setSelectedType(type)

            setPokemonList(newPokemons)
            // console.log(JSON.stringify(data, null, '\t'))
            // setNextPokemon(data.next)

            // const list = data.results
            // console.log(list)
    
            // const newPokemons = await Promise.all(list.map(async pokemon => {
            //     const { data } = await axios.get<Pokemon>(pokemon.url)
            //     return data
            // }))

            // setPokemonList(newPokemons)

        } catch (error) {
            console.log(error)
        }

        setLoading(false)
    }

    function resetTypeFilter() {
        setPokemonList([])
        setNextPokemon(INITIAL_FETCH_URL)
        setSelectedType(undefined)
    }

    return (
        <View style={styles.container}>
            <View>
                <ScrollView
                    horizontal
                >
                    <TouchableOpacity
                        style={[styles.typeButton, { backgroundColor: 'whitesmoke' }]}
                        onPress={resetTypeFilter}
                    >
                        <Text>All types</Text>
                    </TouchableOpacity>
                    {types.map(type =>
                        <TouchableOpacity
                            key={type.name}
                            style={[styles.typeButton, { backgroundColor: colors[type.name] || 'whitesmoke' }]}
                            // onPress={() => fetchPokemonByType(type)}
                            onPress={() => setSelectedType(type)}
                        >
                            <Text>{type.name}</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
            
            <FlatList
                data={pokemonList}
                renderItem={({ item }) => <PokemonCard pokemon={item} style={{ width: '47.5%', marginBottom: '5%' }} />}
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
                    <Icon name='chevron-up' size={30} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20
    },
    typeButton: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        elevation: 5,
    }
})

export { PokemonList }
