import React, { useState, useEffect, useCallback } from 'react';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import OpenAI from 'openai';
import { Feather } from '@expo/vector-icons';

const apiKey = process.env.OPENAI_API_KEY;

export default function App() {
  const [generatedString, setGeneratedString] = useState('a');
  const [text, onChangeText] = useState('');
  const [fontsLoaded, fontError] = Font.useFonts({
    "Ascridpt-Regular": require("./assets/fonts/Ascripdt-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const generateString = async () => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Generate a simple sentence that would be used to teach reading English."}],
        model: "gpt-3.5-turbo",
      });
      console.log(completion.choices[0]);

      //setGeneratedString(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fakeGenerateString = async () => {
    setGeneratedString("The cat ran fast.");
  };

  return (
    <View style={styles.container}>
          <h1>Script Practice</h1>
          <Button
            title="Generate sentence"
            color="#f194ff"
            onPress={fakeGenerateString}
          />
          {generatedString !== 'a' && (
            <>
              <Text>Sentence is Below...</Text>
              {fontsLoaded ? (
              <Text style={styles.font}>{generatedString}</Text>
              ) : (
                <Text>Loading fonts...</Text>  // Display loading message while fonts load
              )}
              <TextInput
                style={(text != generatedString) ? styles.redInput : styles.successInput}
                onChangeText={onChangeText}
                value={text}
                placeholder={"Write the sentence in normal English script."}
              />
            </>
          )}
          {(generatedString.trim() == text) && (
            <Feather name="check-circle" size={24} color="#39FF14" />
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#f194ff",
  },
  successInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#84a98c",
  },
  font: {
    fontFamily: "Ascridpt-Regular",
    fontSize: 60,
  }
});
