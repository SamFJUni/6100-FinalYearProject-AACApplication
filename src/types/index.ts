import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface Category {
    id: number;
    name: string;
  }
  
  export interface AACSymbol {
    id: number;
    name: string;
    category_id: number;
    image_url: string;
    background_colour: string;
  }

  // export type Voice = {
  //   identifier: string;
  //   name: string;
  //   quality: number;
  //   language: string;
  // };

  type VoiceContextType = {
    selectedVoice: string;
    setSelectedVoice: Dispatch<SetStateAction<string>>;
  };
  
  export const VoiceContext = createContext<VoiceContextType | undefined>(undefined);
  

  // export type RootStackParamList = ParamListBase & {
  //   Home: { selectedVoice?: string };
  //   Categories: undefined;
  //   Symbols: {
  //     categoryId: number;
  //   };
  // };

  export type RootStackParamList = ParamListBase & {
    Home: undefined;
    Categories: undefined;
    Symbols: {
      categoryId: number;
    };
  };



  