import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

type ButtonProps={
    text: string,
    onPress: () => void;
}

export default function Button({ text, onPress }: ButtonProps) {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={{
          padding:15,
          backgroundColor: Colors.DarkBlue,
          marginTop: 40,
          borderRadius: 10,
        }}>

          <Text style ={{
            fontSize: 20,
            textAlign: 'center',
            color: Colors.WHITE,
          }}>Get Started</Text>
        </TouchableOpacity>
    )
} 