import React, {useState, } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { AACSymbol } from '../types';
import * as Speech from 'expo-speech';

interface PhraseBuilderProps {
  selectedSymbols: AACSymbol[];
  handleDeleteSymbol: (index: number) => void;
}

const PhraseBuilder: React.FC<PhraseBuilderProps> = ({ selectedSymbols, handleDeleteSymbol }) => {

  
  return (
    <View style={styles.phraseBuilderContainer}>
      <ScrollView horizontal>
        {selectedSymbols.map((symbol, index) => (
          <View key={`${symbol.id}-${index}`} style={styles.symbolWrapper}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteSymbol(index)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteSymbol(index)}>
              <Text>{symbol.name}{' '}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


/*  
  return (
    <View style={styles.phraseBuilderContainer}>
      <ScrollView horizontal>
        {selectedSymbols.map((symbol, index) => (
          <Text key={`${symbol.id}-${index}`}
          onPress={() => handleDeleteSymbol(index)}
          >
            {symbol.name}{' '}</Text>
        ))}
      </ScrollView>
    </View>
  );
};
*/

const styles = StyleSheet.create({
  phraseBuilderContainer: {
    borderColor: '#808080', 
    borderWidth: 2, 
    borderRadius: 5, 
    padding: 20,
    margin: 10, 
    marginTop: 30,
    minHeight: 50,
  },
  symbolWrapper: {
    position: 'relative',
    paddingRight: 10,
    paddingTop: 30,
  },
  deleteButton: {
    position: 'absolute',
    top: 0, 
    right: 0,
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PhraseBuilder;