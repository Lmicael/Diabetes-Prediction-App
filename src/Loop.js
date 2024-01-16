import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';


export default function App({ route }) {
  const [loadingText, setLoadingText] = useState('Loading...');
  const { result } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const delay = setTimeout(() => {
      navigation.navigate('ResultScreen', { result });
    }, 3000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('./animation/animation_lmc3j0oy.json')}
        autoPlay
        loop
        style={{ width: 350, height: 350 }}
      />
      <Text style={styles.text}>{loadingText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
});