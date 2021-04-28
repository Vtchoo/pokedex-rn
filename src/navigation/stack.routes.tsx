import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { PokemonList } from '../pages/PokemonList'

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
        </Navigator>
    )
}

export { StackRoutes }