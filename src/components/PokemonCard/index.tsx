import React from 'react'
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { Pokemon } from '../../interfaces/Pokemon'
import StringUtils from '../../../src/utils/StringUtils'

interface PokemonCardProps {
    pokemon: Pokemon
    style?: StyleProp<ViewStyle>
}

function PokemonCard({ pokemon, ...props }: PokemonCardProps) {

    const { type } = pokemon.types[0]

    const getPokemonImage = (id: number) => `https://pokeres.bastionbot.org/images/pokemon/${id}.png?width=30&height=30`

    return (
        <View style={[styles.card, props.style, { backgroundColor: colors[type.name] || 'whitesmoke' }]}>
            <View style={styles.spriteContainer}>
                <Image source={{ uri: getPokemonImage(pokemon.id) }} style={styles.image}/>
            </View>

            <Text style={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Text>
            <Text style={styles.pokemonName}>{StringUtils.capitalize(pokemon.name)}</Text>
            <Text style={styles.pokemonType}>Type: {type.name}</Text>
        </View>
		// <div
        //     className={`${styles.pokemonCard} ${props.selected ? styles.selected : ''}`}
        //     onClick={() => props.onClick?.(pokemon)}
        //     style={{ backgroundColor: colors[type.name]}}
        // >
        //     <div className={`${styles.spriteContainer}`}>
        //         {/* <img src={pokemon.sprites.front_default}></img> */}
        //         <img src={getPokemonImage(pokemon.id)} alt=""/>
        //     </div>
            
        //     <small className={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</small>
        //     <strong>{StringUtils.capitalize(pokemon.name)}</strong>
        //     <small>Type: {type.name}</small>
        // </div>
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
};

// .pokemonCard {
//     display: flex;
//     flex-direction: column;

//     padding: 1rem;
//     /* margin: .5rem; */

//     background-color: whitesmoke;
//     align-self: stretch;
//     align-items: center;

//     width: 100%;

//     border-radius: 20px;

//     box-shadow: 0 0 5px rgba(0,0,0,.5) ;

//     transition: transform .1s ease;
// }

// .pokemonCard.selected {
//     box-shadow: 0 0 20px teal ;
//     transform: scale(1.2);
// }

// .pokemonId {
//     padding: .25rem;
//     border-radius: 10px;

//     margin: .5rem;

//     background-color: rgba(168, 185, 168, .2);
// }


// .spriteContainer {
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     width: 90%;
//     /* aspect-ratio: 1; */
//     border-radius: 50%;
//     background-color: rgba(255, 255, 255, .5);
// }
// .spriteContainer img {
//     width: 100%;
//     height: 100%;
//     object-fit: contain;
// }

export { PokemonCard }
