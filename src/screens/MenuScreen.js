import React from 'react';
import { Text, StyleSheet, Button, TouchableOpacity, View } from 'react-native';

const MenuScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Jumpi Food</Text>
      {/* <Button
        title='Ir para Lista (Botão)'
        onPress={() => navigation.navigate('Lista')}
      /> */}
      <Button
        title='Ir para QRScanner'
        onPress={() => navigation.navigate('QRCode')}
      />
      {/* Opcao para o Botao abaixo, usando Touchable Opacity */}
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('Lista')}
      >
        <Text>Opção para Lista (Touchable Opacity)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    margin: 15
  },
  touchable: {
    fontSize: 20,
    margin: 15
  }
});

export default MenuScreen;
