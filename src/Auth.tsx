import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../supabaseInit'
import { Button, Input } from 'react-native-elements'
import TrainingScreen from './components/TrainingScreen'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types'
import { StackNavigationProp } from '@react-navigation/stack'
import { createStackNavigator } from '@react-navigation/stack'

const AuthStack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="AuthScreen">
      <AuthStack.Screen name="AuthScreen" component={Auth} options={{ headerShown: false }} />
      <AuthStack.Screen name="Training" component={TrainingScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
};

export { AuthNavigator };


type AuthNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

type Props = {
  navigation: AuthNavigationProp;
};



function Auth({ navigation }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Training" onPress={() => navigation.navigate('Training')} />
      </View>
      {/*
      <View style={styles.verticallySpaced}>
        <Button title="Training" onPress={handleTrainingPress} />
      </View>
      */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    //backgroundColor: 'red'
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})