/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { ReactNode } from 'react'
import {
  useColorScheme,
  View,
} from 'react-native'
import { PokedexProvider } from './src/contexts/PokedexContext';
import { Routes } from './src/navigation';

import { PokemonList } from './src/pages/PokemonList'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

	return (
		<PokedexProvider>
			<Routes />
		</PokedexProvider>
	);
};


export default App;
