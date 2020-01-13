import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import ListScreen from './src/screens/ListScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBc8Lss2vMiI_TLGeJSMzKWyZxM1kfs2O4",
  authDomain: "jumpifood.firebaseapp.com",
  databaseURL: "https://jumpifood.firebaseio.com",
  projectId: "jumpifood",
  storageBucket: "jumpifood.appspot.com",
  messagingSenderId: "914119637958",
  appId: "1:914119637958:web:9b13c2b42427a7cabf50c7",
  measurementId: "G-8E4JX8GXDH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Menu: MenuScreen,
    Lista: ListScreen,
    QRCode: QRCodeScreen,
  },
  {
    initialRouteName: 'Menu',
    defaultNavigationOptions: {
      title: 'Jumpi Food'
    }
  }
);

export default createAppContainer(navigator, firebaseConfig);
