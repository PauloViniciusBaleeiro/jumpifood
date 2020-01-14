import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase';


export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  function storeSomething() {
    firebase.database().ref('restaurantes/').set({
      
    });
  }
  function storeCardapio(id, tipo, idItem, sabor, valor, tamanho) {
    // console.log(id, tipo, idItem, sabor, valor, tamanho)
    firebase.database().ref('restaurantes/' + id + '/tipo/'+ tipo + '/cardapio/'+ idItem).update({
      id: idItem,
      sabor: sabor,
      tamanho: tamanho,
      valor: valor,
    })
  }

  
  // storeSomething();
  // storeCardapio(1,'pizzaria',1,'calabresa',35.50,'grande');
  // storeCardapio(1,'pizzaria',2,'muçarela',35.50,'grande');
  // storeCardapio(1,'pizzaria',3,'portuguesa',37.50,'grande');
  // storeCardapio(1,'pizzaria',4,'banana e canela',35.50,'grande');
  // storeCardapio(1,'pizzaria',5,'refrigerante',6.50,'lata 350ml');
  // storeCardapio(2,'hamburgueria',1,'x-salada',14.00,'');
  // storeCardapio(2,'hamburgueria',2,'x-bacon',16.50,'');
  // storeCardapio(2,'hamburgueria',3,'x-egg',15.50,'');
  // storeCardapio(2,'hamburgueria',4,'x-tudo',18.00,'');
  // storeCardapio(2,'hamburgueria',5,'suco copo 300 ml',6.50,'');
  // storeCardapio(3,'creperia',1,'presunto e queijo',16.00,'');
  // storeCardapio(3,'creperia',2,'frango e creem cheese',15.50,'');
  // storeCardapio(3,'creperia',3,'peito de peru e salada',17.50,'');
  // storeCardapio(3,'creperia',4,'morango com nutella',18.00,'');
  // storeCardapio(3,'creperia', 5,'cerveja lata',6.50,'');
  storeCardapio(3,'creperia', 6,'taça vinho',9.50,'');

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
    console.log("TCL: handleBarCodeScanned -> dados", dados)
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