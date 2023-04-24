import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseInit';
import { AuthNavigator } from './src/Auth';
import Symbols from './src/components/Symbols';
import { Session } from '@supabase/supabase-js'
import AppNavigator from './src/components/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {session && session.user ? (
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      )}
    </View>
  );
}




