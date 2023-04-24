import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../../supabaseInit';
import { Picker } from '@react-native-picker/picker';
import * as Speech from 'expo-speech';
import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {

  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [showVoices, setShowVoices] = useState(false);

  useEffect(() => {
    async function fetchVoices() {
      const availableVoices = await Speech.getAvailableVoicesAsync();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]?.name || '');
    }

    fetchVoices();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleShowVoices = () => {
    setShowVoices(!showVoices);
  };

  return (
    <View style={styles.buttonContainer}>

      <TouchableOpacity onPress={handleShowVoices} style={styles.button}>
      <Text style={styles.buttonText}>Show Voices</Text>
      </TouchableOpacity>

      {showVoices && (
        <View>
          <Text>Select a voice:</Text>
          <Picker
            selectedValue={selectedVoice}
            onValueChange={(value) => setSelectedVoice(value)}
          >
            {voices.map((voice) => (
              <Picker.Item key={voice.identifier} label={voice.name} value={voice.identifier} />
            ))}
          </Picker>
        </View>
      )}

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    width: '80%',
    alignSelf: 'center',
    height: '20%'
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});


export default ProfileScreen;
