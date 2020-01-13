import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase';

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let dadosObtidos = JSON.parse(data);
    const tipo = dadosObtidos.tipo;
    let dados = firebase.database().ref('restaurantes/' + dadosObtidos.id + '/tipo/' + tipo + '/cardapio');
    dados.on('value', function (snapshot) {
      let cardapio = snapshot.val();
      cardapio = cardapio.slice(1);
      Alert.alert(
        tipo,
        'Restaurante encontrado com sucesso, redirecionando para o cardápio...',
        [
          { text: 'Ok', onPress: () => { navigation.navigate('Lista', cardapio) } },
        ],
        {cancelable: false},
      )
    })
  };

  if (hasPermission === null) {
    return <Text> Solicitando permissão para uso da câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Não há permissão para uso da câmera</Text>;

  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject} />
      {scanned && (
        <Button title = {'Tap to Scan Again'} onPress= {() => setScanned(false)} />
      )}
      </View>
  )
}