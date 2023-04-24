import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { AACSymbol } from '../types';

type SymbolItemProps = {
  symbol: AACSymbol;
  symbolSize: number;

};

const SymbolItem: React.FC<SymbolItemProps> = ({ symbol, symbolSize }) => {
  const { name, image_url, background_colour } = symbol;

  const styles = StyleSheet.create({
    symbolContainer: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: symbolSize,
      height: symbolSize,
      margin: 14,
      marginRight: 10
    },
    symbolName: {
      textAlign: 'center',
      marginBottom: 5,
    },
    symbolImage: {
      width: symbolSize * 0.8,
      height: symbolSize * 0.8,
      resizeMode: 'contain',
    },
  });

  return (
    <View style={[styles.symbolContainer, { backgroundColor: background_colour }]}>
      <Text style={styles.symbolName}>{name}</Text>
      {image_url && 
      <Image 
      source={{ uri: image_url }}
      style={styles.symbolImage}
      testID="symbol-image"
      />}
    </View>
  );
};


export default SymbolItem;


