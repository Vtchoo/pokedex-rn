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

import { PokemonList } from './src/pages/PokemonList'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PokemonList />
  );
};


export default App;
