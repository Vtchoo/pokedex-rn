import { useRoute } from '@react-navigation/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { usePokedex } from '../../contexts/PokedexContext'
import { Pokemon } from '../../interfaces/Pokemon'
import StringUtils from '../../utils/StringUtils'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function PokemonInfo() {

    const route = useRoute()
    const { id } = route.params as { id: number }
    const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    const POKEMON_IMAGE = `https://pokeres.bastionbot.org/images/pokemon/${id}.png?width=30&height=30`

    const { colors } = usePokedex()

    // const [loading, setLoading] = useState(true)
    const [pokemon, setPokemon] = useState<Pokemon>()

    useEffect(() => { getPokemonInfo() }, [])

    async function getPokemonInfo() {

        try {
            
            const { data } = await axios.get<Pokemon>(POKEMON_URL)

            // console.log(JSON.stringify(data))

            setPokemon(data)
            // setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    if (!pokemon)
        return <ActivityIndicator size='large' color='blue'/>

    return (
        <View style={[styles.container, { backgroundColor: colors[pokemon.types[0].type.name] || 'whitesmoke' }]}>
            {/* <ScrollView style={{ flex: 1 }}> */}
            <View style={styles.spriteContainer}>
                <Image
                    source={{ uri: POKEMON_IMAGE }}
                    style={styles.image}
                />
            </View>

            <Text style={styles.pokemonName}>{StringUtils.capitalize(pokemon.name)}</Text>

            <View style={styles.typeList}>
                {pokemon.types.map(({ type }) =>
                    <TouchableOpacity
                        key={type.name}
                        style={[styles.typeButton, { backgroundColor: colors[type.name] || 'whitesmoke' }]}
                    >
                        <Text style={{  }} >
                            {StringUtils.capitalize(type.name)}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.bodyInfo}>
                <View style={styles.bodyInfoItem}>
                    <Icon name='arrow-up-down' size={25}/>
                    <Text style={styles.infoText}>{pokemon.height}</Text>
                </View>
                <View style={styles.bodyInfoItem}>
                    <Icon name='weight' size={25}/>
                    <Text style={styles.infoText}>{pokemon.weight}</Text>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }}>
            <Text>{JSON.stringify(pokemon.abilities)}</Text>

            </ScrollView>
            {/* </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    spriteContainer: { 
        width: '70%',
        aspectRatio: 1,
        borderRadius: 1000,
        backgroundColor: 'rgba(255, 255, 255, .5)'
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    pokemonName: {
        marginVertical: 10,
        // lineHeight: 35,
        fontSize: 30,
        fontWeight: 'bold'
    },
    typeList: {
        flexDirection: 'row'
    },
    typeButton: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        elevation: 5,
    },
    bodyInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch'
    },
    bodyInfoItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoText: {
        fontSize: 20
    }
})

export { PokemonInfo }
