import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { PokemonList } from '../pages/PokemonList'
import { PokemonInfo } from '../pages/PokemonInfo'

const StackNavigator = createStackNavigator()

function StackRoutes() {

    const { Navigator, Screen } = StackNavigator

    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name='PokemonList' component={PokemonList}/>
            <Screen name='PokemonInfo' component={PokemonInfo}/>
        </Navigator>
    )
}

export { StackRoutes }