import React from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseInit';
import { Session, User } from '@supabase/supabase-js';
//import ImagePicker from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-picker';
//import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import ImageResizer from 'react-native-image-resizer';
import * as ImageManipulator from 'expo-image-manipulator';

import { supabaseUrl, supabaseAnonKey } from '../../supabaseInit';



import { Category } from '../types';

const CreationScreen: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [showSymbolModal, setShowSymbolModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const [symbolName, setSymbolName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedColour, setSelectedColour] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [combinedCategories, setCombinedCategories] = useState<Category[]>([]);
  


  //const [imageResponse, setImageResponse] = useState<ImagePicker.ImagePickerResponse | null>(null);
  const [imageResponse, setImageResponse] = useState<ImagePicker.ImagePickerResult | null>(null);
  const [imageUri, setImageUri] = useState('');


  const [user, setUser] = useState<User | null>(null);

  const availableColours = [
    { label: 'Verb (Yellow)', value: '#FED668' },
    { label: 'Pronoun (Orange)', value: '#FC9F1F' },
    { label: 'Adverb (Green)', value: '#89FAA8' },
    { label: 'Noun (Grey)', value: '#CCCCCC' },
    { label: 'Preposition (Purple)', value: '#DA79FE' },
    { label: 'Contraction (Dark Blue)', value: '#7979FE' },
    { label: 'Adjective (Light Blue)', value: '#69FBFD' },
    { label: 'Determiner (Pink)', value: '#FE9FF4' },    
  ];

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
  
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleCreateCategory = async () => {
    if (!user) {
      console.error('User must be authenticated to create a category');
      return;
    }

    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: categoryName, user_id: user.id }]);

    if (error) {
      console.error('Error creating category:', error);
    } else {
      console.log('Category created:', data);
    }

    setShowModal(false);
    setCategoryName('');
  };

const handlePickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true, 
  });

  if (!result.canceled) {
    setImageResponse(result);
    setImageUri(result.assets[0].uri);
  }
};


const handleCreateSymbol = async () => {
  if (!user) {
    console.error('User must be authenticated to create a symbol');
    return;
  }

  if (!selectedCategoryId || !selectedColour) {
    console.error('All fields must be filled:', {
      selectedCategoryId,
      selectedColour,
    });
    return;
  }


  const imageUrl = 'https://via.placeholder.com/200';


  const { data, error } = await supabase.from('symbols').insert([
    {
      name: symbolName,
      category_id: selectedCategoryId,
      image_url: imageUrl,
      background_colour: selectedColour,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error('Error creating symbol:', error);
  } else {
    console.log('Symbol created:', data);
  }

  setImageResponse(null);
  setImageUri('');
  setSymbolName('');
  setSelectedCategoryId(null);
  setSelectedColour('');
};


type CategoryWithSymbols = Category & {
  symbols: { id: string; user_id: string }[];
  is_default: boolean;
};

const fetchCategories = async () => {
  if (user) {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        symbols (
          *,
          user_id
        )`
      )
      .or(`user_id.eq.${user.id},is_default.eq.true`);

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      const combinedData = data as CategoryWithSymbols[];
      const filteredData = combinedData.map((category) => ({
        ...category,
        symbols: category.symbols.filter(
          (symbol) => symbol.user_id === user.id || category.is_default,
        ),
      }));

      setCombinedCategories(filteredData);
      if (filteredData.length > 0) {
        setSelectedCategoryId(filteredData[0].id);
      }
    }
  }
};


useEffect(() => {
  fetchCategories();
}, [user]);


return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.createButton} onPress={() => setShowModal(true)}>
      <Text style={styles.createButtonText}>Create Category</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.createButton} onPress={() => setShowSymbolModal(true)}>
      <Text style={styles.createButtonText}>Create Symbol</Text>
    </TouchableOpacity>
    <Modal visible={showModal} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Create a new category</Text>
        <TextInput
          value={categoryName}
          onChangeText={setCategoryName}
          placeholder="Category Name:"
          placeholderTextColor="#444"
          style={styles.input}
        />
        <TouchableOpacity style={styles.modalButton} onPress={handleCreateCategory}>
          <Text style={styles.modalButtonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>

    <Modal visible={showSymbolModal} animationType="slide">
  <View style={styles.modalContainer}>
      <View style={styles.symbolForm}>
        <TextInput
          value={symbolName}
          onChangeText={setSymbolName}
          placeholder="Symbol Name:"
          placeholderTextColor="#444"
          style={styles.input}
        />
        <Picker
          selectedValue={selectedCategoryId}
          onValueChange={(itemValue) => setSelectedCategoryId(itemValue)}
          style={styles.picker}
        >
          {combinedCategories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedColour}
          onValueChange={(itemValue) => setSelectedColour(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Background Colour" value="" />
          {availableColours.map((colour, index) => (
            <Picker.Item key={index} label={colour.label} value={colour.value} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.pickImageButton} onPress={handlePickImage}>
          <Text style={styles.pickImageButtonText}>Pick Image</Text>
        </TouchableOpacity>
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.previewImage} /> : null}
        <TouchableOpacity style={styles.createSymbolButton} onPress={handleCreateSymbol}>
          <Text style={styles.createSymbolButtonText}>Create Symbol</Text>
        </TouchableOpacity>
      </View>
    <TouchableOpacity style={styles.modalButton} onPress={() => setShowSymbolModal(false)}>
      <Text style={styles.modalButtonText}>Cancel</Text>
    </TouchableOpacity>
  </View>
</Modal>


  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  symbolForm: {
    width: '80%',
  },
  picker: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 5,
    width: '100%',
  },
  pickImageButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickImageButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createSymbolButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  createSymbolButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  previewForm: {

  },
  previewImage: {
    width: 50, 
    height: 50, 
    resizeMode: 'cover',
    borderRadius: 10, 
    marginBottom: 20, 
    alignSelf: 'center', 
  }
});

export default CreationScreen;

