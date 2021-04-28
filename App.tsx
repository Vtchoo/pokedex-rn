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

import { PokemonList } from './src/pages/PokemonList'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

	return (
		<PokedexProvider>
			<PokemonList />
		</PokedexProvider>
	);
};


export default App;
