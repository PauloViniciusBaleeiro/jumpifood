import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return <Text style={styles.text}>Home Screen</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    margin: 15
  }
});

export default HomeScreen;
