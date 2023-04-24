import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';

import Categories from './Categories';
import Symbols from './Symbols';
import PhraseBuilderScreen from '../PhraseBuilderScreen';

import ProfileScreen from './ProfileScreen';
import CreationScreen from './CreationScreen';

import TrainingScreen from './TrainingScreen';
//import Auth from '../Auth';

import { RootStackParamList } from '../types';

const Stack = createStackNavigator();

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
      <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={PhraseBuilderScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
      <BottomTab.Screen name="Creation" component={CreationScreen} />
    </BottomTab.Navigator>
    );
  };
  
  export default AppNavigator;
