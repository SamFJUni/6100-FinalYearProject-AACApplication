import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AACSymbol } from './types';
import { StackNavigationProp } from '@react-navigation/stack';
//import { RootStackParamList } from './types';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { useContext } from 'react';

import { VoiceContext } from './types';

import PhraseBuilder from './components/PhraseBuilder';
import Categories from './components/Categories';
import Symbols from './components/Symbols';

  const PhraseBuilderScreen = () => {

  const [selectedSymbols, setSelectedSymbols] = useState<AACSymbol[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const [speechButtonEnabled, setSpeechButtonEnabled] = useState(false);
  const [backButtonEnabled, setBackButtonEnabled] = useState(false);

  const handleBack = () => {
    setSelectedCategoryId(null);
    setBackButtonEnabled(false);
  };

  const handleSelectSymbol = (symbol: AACSymbol) => {
    setSelectedSymbols((prevSymbols) => [...prevSymbols, symbol]);
    setSpeechButtonEnabled(true);
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setBackButtonEnabled(true);
  };

   const handleSpeak = () => {
     const text = selectedSymbols.map((symbol) => symbol.name).join(' ');
     Speech.speak(text);
   };

  const handleDeleteSymbol = (index: number) => {
    setSelectedSymbols((prevSymbols) =>
      prevSymbols.filter((_, i) => i !== index),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.phraseBuilderContainer}>
        <View style={styles.phraseBuilderWrapper}>
          <PhraseBuilder selectedSymbols={selectedSymbols} handleDeleteSymbol={handleDeleteSymbol} />
        </View>
        <TouchableOpacity
          onPress={handleSpeak}
          disabled={!speechButtonEnabled}
          style={styles.speechButton}
        >
        <Text style={{ fontSize: 36, opacity: speechButtonEnabled ? 1 : 0.3, marginTop: 20 }}>🔊</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={handleBack}
        disabled={!backButtonEnabled}
        style={styles.backButton}
        >
        <Text style={{ fontSize: 36, opacity: backButtonEnabled ? 1 : 0.3, marginTop: 20 }}>🔙</Text>
        </TouchableOpacity>

      </View>
      {selectedCategoryId === null ? (
        <Categories onSelectCategory={handleSelectCategory} />
      ) : (
        <Symbols
          categoryId={selectedCategoryId}
          onSelectSymbol={handleSelectSymbol}
          onBack={handleBack}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phraseBuilderContainer: {
    flexDirection: 'row',
  },
  phraseBuilderWrapper: {
    flex: 1,
  },
  buttonWrapper: {
    // borderWidth: 1,
    // borderColor: '#000',
    // borderRadius: 4,
    // margin: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  emoji: {
    fontSize: 36,
    padding: 4,
    marginTop: 10,
  },
  speechButton: {
    //borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    //borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
});

export default PhraseBuilderScreen;