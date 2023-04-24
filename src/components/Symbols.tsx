import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Text, View, Button, Dimensions} from 'react-native';
import { supabase } from '../../supabaseInit';
import { AACSymbol } from '../types';
import SymbolItem from '../Styling/SymbolItem';


type SymbolsProps = {
    categoryId: number;
    onSelectSymbol: (symbol: AACSymbol) => void;
    onBack: () => void; 
  };

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 8; 
  const symbolSize = screenWidth / numColumns - 10; 

const Symbols: React.FC<SymbolsProps> = ({ categoryId, onSelectSymbol, onBack }) => {
  const [symbols, setSymbols] = useState<AACSymbol[]>([]);
  
  const symbolSize = 120;

  useEffect(() => {
    if (categoryId) {
      fetchSymbols(categoryId);
    }
  }, [categoryId]);


  const fetchSymbols = async (categoryId: number) => {
    const { data, error } = await supabase
      .from('symbols')
      .select('*')
      .eq('category_id', categoryId);
    if (data) {
      setSymbols(data as AACSymbol[]);
    } else {
      console.error('Error fetching symbols:', error);
    }
  };

  const handleSelectSymbol = (symbol: AACSymbol) => {
    onSelectSymbol(symbol);
  };

  const renderItem = ({ item }: { item: AACSymbol }) => (
    <TouchableOpacity onPress={() => handleSelectSymbol(item)}>
    <SymbolItem symbol={item} symbolSize={symbolSize} />
    </TouchableOpacity>
  );

  return (
    <View>
      <Text></Text>
      <FlatList
        data={symbols}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

export default Symbols;

