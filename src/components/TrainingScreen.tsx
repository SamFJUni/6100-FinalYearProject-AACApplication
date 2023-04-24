import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { supabase } from '../../supabaseInit';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';




const passages = [
  {
    text: 'Hello welcome to the AAC application! This is a training guide! Press "Next" to proceed or you can exit the training guide anytime by pressing "Exit" ',
  },
  {
    text: 'This is what you will be greeted with when you first sign into the application. ',
    image: require('../../assets/image01.png'), 
  },
  {
    text: 'Selecting a category will reveal symbols associated with that category. When you tap a symbol it gets added to a “phrase builder”, as seen at the top.',
    image: require('../../assets/image02.png'), 
  },
  {
    text: 'You will also notice when you select a category, and then press a symbol within that category, these buttons are no longer transparent, indicating you can now use them. You can use the back button to travel back to the categories page. When you are happy with what you have built within your phrase builder, you can output this message via text to speech',
    image: require('../../assets/image03.jpg'), 
  },
  {
    text: 'If you look to the bottom of the screen, you will see a navigation section.',
    image: require('../../assets/thingtwo.png'), 
  },
  {
    text: 'By selecting "Creation" on the navigation section. You will be greeted with this screen, where you can create your own categories and symbols',
    image: require('../../assets/image04.png'), 
  },
  {
    text: 'By selecting create a category, you will be greeted with this page. Simply enter a category name and press create. That is it! You have created your very own category!',
    image: require('../../assets/image05.png'), 
  },
  {
    text: 'The same applies for creating a symbol! Simple fill out the information (name, category, background colour, upload image(OPTIONAL), and that is it! You are done!)',
    image: require('../../assets/image06.png'), 
  },
  {
    text: 'That is it! Press next and you can now sign up to our application!',
    image: require('../../assets/image06.png'), 
  },
  
  
];

const TrainingScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Training'>>();

  const [currentPassage, setCurrentPassage] = useState(0);

  const handleNextPress = () => {
    if (currentPassage < passages.length - 1) {
      setCurrentPassage(currentPassage + 1);
    } else {
      navigation.navigate('AuthScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.passageText}>{passages[currentPassage].text}</Text>
      {passages[currentPassage].image && (
        <Image source={passages[currentPassage].image} style={styles.passageImage} />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Exit" onPress={() => navigation.navigate('AuthScreen')} />
        <Button title="Next" onPress={handleNextPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  passageText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  passageImage: {
    width: 600,
    height: 600,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default TrainingScreen;