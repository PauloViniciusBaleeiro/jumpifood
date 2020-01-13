import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import * as firabase from 'firebase';

const lista = [
  { nome: 'item 1' },
  { nome: 'item 2' },
  { nome: 'item 3' },
  { nome: 'item 4' },
  { nome: 'item 5' }
];

function storeSomething(Id, highValue) {
  firabase.database().ref('testes/' + Id).set({
    valor: highValue
  });
}

const ListScreen = () => {
  storeSomething(2, 200);
  return (
    <View>
      <Text style={styles.text}>List Screen</Text>
      <FlatList
        keyExtractor={key => key.nome}
        data={lista}
        renderItem={({ item }) => {
          return <Text style={styles.list}>{item.nome}</Text>;
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
