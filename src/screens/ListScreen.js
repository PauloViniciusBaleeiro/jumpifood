import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import * as firabase from 'firebase';

// const lista = [
//   { nome: 'item 1' },
//   { nome: 'item 2' },
//   { nome: 'item 3' },
//   { nome: 'item 4' },
//   { nome: 'item 5' }
// ];

function storeSomething(Id, tipoRestaurante) {
  firabase.database().ref('restaurantes/' + Id).set({
    tipo: tipoRestaurante
  });
}
function storeCardapio(Id, tipo, idItem, sabor, valor, tamanho) {
  firabase.database().ref('restaurantes/' + Id + '/tipo/'+ tipo + '/cardapio/'+ idItem).set({
    id: idItem,
    sabor: sabor,
    tamanho: tamanho,
    valor: valor,
  })
}

// storeCardapio(1,'pizzaria',1,'calabresa',35.50,'grande');
// storeCardapio(1,'pizzaria',2,'muçarela',35.50,'grande');
// storeCardapio(1,'pizzaria',3,'portuguesa',37.50,'grande');
// storeCardapio(1,'pizzaria',4,'banana e canela',35.50,'grande');
// storeCardapio(1,'pizzaria',5,'refrigerante',6.50,'lata 350ml');
// storeCardapio(2,'lanchonete',1,'x-salada', 14.00, null);
// storeCardapio(2,'lanchonete',2,'x-bacon', 16.50, null);
// storeCardapio(2,'lanchonete',3,'x-egg',15.50, null);
// storeCardapio(2,'lanchonete',4,'x-tudo',18.00, null);
// storeCardapio(2,'lanchonete',5,'suco copo 300 ml',6.50,null);
// storeCardapio(3,'creperia',1,'presunto e queijo', 16.00,null);
// storeCardapio(3,'creperia',2,'frango e creem cheese', 15.50,null);
// storeCardapio(3,'creperia',3,'peito de peru e salada',17.50,null);
// storeCardapio(3,'creperia',4,'morango com nutella',18.00,null);
// storeCardapio(3, 'creperia', 5, 'cerveja lata', 6.50,null);

const ListScreen = ({ navigation }) => {
  const lista = navigation.state.params;
  console.log("TCL: ListScreen -> lista", lista)
  // storeSomething(1, 'pizzaria');
  return (
    <View>
      <Text style={styles.text}>List Screen</Text>
      <FlatList
        keyExtractor={key => key.index()}
        data={lista}
        renderItem={({ item }) => {
          return <Text style={styles.list}>{item.sabor}</Text>;
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
