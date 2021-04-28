import React from 'react'
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Pokemon } from '../../interfaces/Pokemon'
import StringUtils from '../../../src/utils/StringUtils'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { usePokedex } from '../../contexts/PokedexContext'

interface PokemonCardProps {
    pokemon: Pokemon
    style?: StyleProp<ViewStyle>
}

function PokemonCard({ pokemon, ...props }: PokemonCardProps) {

    const { type } = pokemon.types[0]

    const { addPokemon, removePokemon, myPokemons } = usePokedex()

    const getPokemonImage = (id: number) => `https://pokeres.bastionbot.org/images/pokemon/${id}.png?width=30&height=30`

    function addOrRemovePokemon() {
        if (pokemon.id in myPokemons)
            removePokemon(pokemon)
        else
            addPokemon(pokemon)
    }

    return (
        <TouchableOpacity
            activeOpacity={.9}
            style={[styles.card, props.style, { backgroundColor: colors[type.name] || 'whitesmoke' }]}
            onPress={addOrRemovePokemon}
        >
            <View style={styles.spriteContainer}>
                <Image source={{ uri: getPokemonImage(pokemon.id) }} style={styles.image}/>
            </View>

            <Text style={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.pokemonName}>{StringUtils.capitalize(pokemon.name)}</Text>
                {pokemon.id in myPokemons && <Icon name='pokeball'/>}
            </View>
            
            <Text style={styles.pokemonType}>Type: {type.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
		padding: 10,
		backgroundColor: 'whitesmoke',
		alignSelf: 'stretch',
		alignItems: 'center',
		// width: '100%',
        borderRadius: 20,
        elevation: 5
    },
    spriteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        aspectRatio: 1,
        borderRadius: 1000,
        backgroundColor: 'rgba(255, 255, 255, .5)'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    pokemonId: {
        fontSize: 12,
        padding: 5,
        borderRadius: 5,
        margin: 5,
        backgroundColor: 'rgba(168, 185, 168, .2)'
    },
    pokemonName: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    pokemonType: {
        fontSize: 12,
    }
})

const colors: { [color: string]: string } = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

export { PokemonCard }
