import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = "https://wghstpdytzzkhtfajzce.supabase.co";
export const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnaHN0cGR5dHp6a2h0ZmFqemNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwOTA0NTksImV4cCI6MTk5MTY2NjQ1OX0.aP0qsrJZB5OZk2eohemlQoE46xHwlBBgCqnBCI9U3Cc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

