import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
// import * as firebase from 'firebase';

const lista = [
  { nome: 'item 1' },
  { nome: 'item 2' },
  { nome: 'item 3' },
  { nome: 'item 4' },
  { nome: 'item 5' }
];



const ListScreen = ({ navigation }) => {
  const lista = navigation.state.params;
  console.log("TCL: ListScreen -> lista", lista)
  // storeSomething(1, 'pizzaria');
  return (
    <View>
      <Text style={styles.text}>List Screen</Text>
      <FlatList
        keyExtractor={key => key.id}
        data={lista}
        renderItem={({ item }) => {
          return <Text style={styles.list}>Sabor: {item.sabor}</Text>
          <Text style={styles.list}>Tamanho: {item.tamnho}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    margin: 15
  },
  list: {
    fontSize: 20,
    margin: 15
  }
});

export default ListScreen;
