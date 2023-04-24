import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Category } from '../types';

type CategoryItemProps = {
  category: Category;
  categorySize: number;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category, categorySize }) => {
  const { name } = category;

  const styles = StyleSheet.create({
    categoryContainer: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: categorySize * 0.9,
      height: categorySize * 0.9,
      margin: 14,
      marginRight: 10
    },
    categoryName: {
      textAlign: 'center',
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{name}</Text>
    </View>
  );
};

export default CategoryItem;


