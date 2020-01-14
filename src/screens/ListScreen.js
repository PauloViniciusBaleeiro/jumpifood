import React, { Component } from 'react';
import { Text, StyleSheet, FlatList, View, Image, TouchableOpacity, Icon } from 'react-native';

export default class Lista extends Component {
  state = {
    data: [
      {id:0, sabor: "Em manutenção"},
      {id:1, sabor: "Em manutenção"},
      {id:2, sabor: "Em manutenção"},
      {id:3, sabor: "Em manutenção"},
    ],
  };
  
  selectItem = ({ item }) => {
    console.log(item);
  }

  renderItem = ({ item }) => (  
    <TouchableOpacity onPress = {
      (item) => {
        this.selectItem(item);
      }
    } >
      <View style={styles.listItem}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: item.imagem }}
        />
        <View style={{
          flexDirection: 'column',
          flex: 2,        
        }}>      
          <Text style={{ marginLeft: 20 }}>{item.sabor.charAt(0).toUpperCase() + item.sabor.slice(1)}</Text>
          <Text style={{ marginLeft: 20 }}>Tamanho: {item.tamanho}</Text>
          <Text style={{ marginLeft: 20 }}>Preço: R$ {
            item.valor.toString().split('.')[0] +
            ',' +
            item.valor.toString().split('.')[1].padEnd(2, '0')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  

  
render() {
  let lista = this.props.navigation.state.params;  
  // const itemNumber = this.props.navigation.state.params.filter(item => item.isSelect).length;
  if (this.state.loading) {
    return (
      <View style={
        styles.loader
      }>
        <ActivityIndicator size="large"
          color="purple" />
      </View>
    );
  }  
  return (
    // <View>
      <FlatList
        style={{ marginTop: 30 }}
        contentContainerStyle={styles.list}
        data={this.props.navigation.state.params}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        />
      //   <Text style={          
      //     styles.number          
      //   }> { itemNumber }
      //   </Text>
      //   <TouchableOpacity style={          
      //     styles.icon
      //   }>   
      //     <View>
      //       <Icon
      //         raised name="shopping-cart"
      //         type="font-awesome"
      //         color="#e3e3e3"    
      //         size={30}          
      //         onPress={  
      //           () => this.goToStore() 
      //         }
      //         containerStyle={
      //           {        
      //             backgroundColor: "#FA7B5F"                            
      //           }
      //         } />
      //     </View>
      //   </TouchableOpacity>
      // </View>
    );
  }
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30,
  },
})





// const ListScreen = ({ navigation }) => {
//   const lista = navigation.state.params;
//   console.log("TCL: ListScreen -> lista", lista)
//   // storeSomething(1, 'pizzaria');
//   return (
//     <View>
//       <Text style={styles.text}>Cardápio</Text>
//       <FlatList
//         keyExtractor={key => key.id}
//         data={lista}
//         renderItem={({ item }) => {
//           return <Text style={styles.list}>Sabor: {item.sabor}</Text>
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30,
//     margin: 15
//   },
//   list: {
//     fontSize: 20,
//     margin: 15
//   }
// });

// export default ListScreen;
