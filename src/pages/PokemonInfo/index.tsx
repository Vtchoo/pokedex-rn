import { useRoute } from '@react-navigation/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import { Pokemon } from '../../interfaces/Pokemon'

function PokemonInfo() {

    const route = useRoute()
    const { id } = route.params as { id: number }
    const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

    const getPokemonImage = (id: number) => `https://pokeres.bastionbot.org/images/pokemon/${id}.png?width=30&height=30`


    // const [loading, setLoading] = useState(true)
    const [pokemon, setPokemon] = useState<Pokemon>()

    useEffect(() => { getPokemonInfo() }, [])

    async function getPokemonInfo() {

        try {
            
            const { data } = await axios.get<Pokemon>(POKEMON_URL)

            setPokemon(data)
            // setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    if (!pokemon)
        return <ActivityIndicator size='large' color='blue'/>

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={{ uri: getPokemonImage(pokemon.id) }}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1
    }
})

export { PokemonInfo }
