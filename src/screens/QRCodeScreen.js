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
  function storeCardapio(id, tipo, idItem, sabor, valor, tamanho, imagem) {
    // console.log(id, tipo, idItem, sabor, valor, tamanho)
    firebase.database().ref('restaurantes/' + id + '/tipo/'+ tipo + '/cardapio/'+ idItem).update({
      id: idItem,
      sabor: sabor,
      tamanho: tamanho,
      valor: valor,
      imagem: imagem,
    })
  }
  
  
  // storeSomething();
  // storeCardapio(1,'pizzaria',1,'calabresa',35.50,'grande','https://conteudo.imguol.com.br/3d/2017/07/07/pizza-de-calabresa-charles-pizzas-1499449903329_v2_900x506.jpg');
  // storeCardapio(1,'pizzaria',2,'muçarela',35.50,'grande','https://portuguessemmisterio.files.wordpress.com/2015/08/pizza-muc3a7arela-mussarela.jpg?w=245&h=139');
  // storeCardapio(1,'pizzaria',3,'portuguesa',37.50,'grande','https://s2.glbimg.com/ovtvEum5xcHz1AiEI9U69J-HyeI=/0x0:400x268/1000x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2012/06/13/15/30/58/110/ppp.jpg');
  // storeCardapio(1,'pizzaria',4,'banana e canela',35.50,'grande','https://www.receitasnestle.com.br/images/default-source/recipes/163-pizza-leite-moca-banana-receitas-nestle.jpg?sfvrsn=ece6eefc_2');
  // storeCardapio(1,'pizzaria',5,'refrigerante',6.50,'lata 350ml','http://www.pizzariadp.com.br/imagens_prod/3288Coca%20Cola%20Lata.png');
  // storeCardapio(2,'hamburgueria',1,'x-salada',14.00,'','http://k2lanches.com.br/wp-content/uploads/2015/12/X-SALADA-C%C3%B3pia-600x600.png');
  // storeCardapio(2,'hamburgueria',2,'x-bacon',16.50,'','https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0R6f00001FpEwrEAF/5de52108e4b0256c1ba06a31.jpg&w=710&h=462');
  // storeCardapio(2,'hamburgueria',3,'x-egg',15.50,'','http://burguercoke.com.br/wp-content/uploads/2016/02/X-EGG.png');
  // storeCardapio(2,'hamburgueria',4,'x-tudo',18.00,'','http://static.pedidor.com/x-tudo-imgp-t1-52ac6d508bc391626b000005-52af202f8bc3913249000004-37091e3f42bceb182385ad978a879618.jpeg');
  // storeCardapio(2,'hamburgueria',5,'suco copo 300 ml',6.50,'','https://cdn.midiamax.com.br/elasticbeanstalk-us-west-2-809048387867/uploads/2015/08/arquivos_noticias_2015_ago_istocksuco.jpg');
  // storeCardapio(3,'creperia',1,'presunto e queijo',16.00,'','https://todaatual.com/wp-content/uploads/100_4029-696x522.jpg');
  // storeCardapio(3,'creperia',2,'frango e creem cheese',15.50,'','https://sandrurs.files.wordpress.com/2012/12/a-crepe-de-frango-e-cream-cheese.jpg?w=900');
  // storeCardapio(3,'creperia',3,'peito de peru e salada',17.50,'','https://abrilclaudia.files.wordpress.com/2019/01/screenshot-1.png');
  // storeCardapio(3,'creperia',4,'morango com nutella',18.00,'','http://www.jornaldepiracicaba.com.br/wp-content/uploads/2019/01/boacomidafoto3.jpg');
  // storeCardapio(3,'creperia', 5,'cerveja lata',6.50,'','https://ap.imagensbrasil.org/images/2017/11/05/skol.png');
  // storeCardapio(3,'creperia', 6,'taça vinho',9.50,'','https://imagens-revista.vivadecora.com.br/uploads/2019/10/ta%C3%A7a-de-vinho-boudeaux.jpg');

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
      if (snapshot.val()) {
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
      } else {
        Alert.alert(
          'Erro ;(',
          'Tivemos um problema para processar a sua solicitação. Tente novamente mais tarde.',
          [
          {text:'Ok', onPress: () => {navigation.navigate('Menu')}},
          ],
          { cancelable: false },
        )
      }
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