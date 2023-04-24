import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { supabase } from '../../supabaseInit';
import { Category } from '../types';
import { AACSymbol } from '../types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
//import { RootStackParamList } from '../types';
import { RootStackParamList } from '../types';
import { Session } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';
import CategoryItem from '../Styling/CategoryItem';

type CategoriesProps = {
    onSelectCategory: (categoryId: number) => void;
  };

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 8; 
  const categorySize = screenWidth / numColumns - 10; 
  
  const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigation = useNavigation();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      };
    
      getSession();
    
      const unsubscribe = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });
    
      return () => {
        unsubscribe?.data?.subscription?.unsubscribe();
      };
    }, []);
    
    useEffect(() => {
      if (user) {
        fetchCategories();
      }
    }, [user]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .or(`user_id.eq.${user?.id},user_id.is.null`);
    if (data) {
      setCategories(data as Category[]);
    } else {
      console.error('Error fetching categories:', error);
    }
  };
  
    const handleSelectCategory = (category: Category) => {
      onSelectCategory(category.id);
    };
  
    const renderItem = ({ item }: { item: Category }) => (
      <TouchableOpacity onPress={() => handleSelectCategory(item)}>
      <CategoryItem category={item} categorySize={categorySize} />
      </TouchableOpacity>
    );
  
    return (
      <View>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
        />
      </View>
    );
  };
  
  export default Categories;