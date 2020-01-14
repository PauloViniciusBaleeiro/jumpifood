import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import ListScreen from './src/screens/ListScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import * as firebase from 'firebase';
import {
  APIKEY,
  AUTHDOMAIN,
  DATABASEURL,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
  MEASUREMENTID
} from 'react-native-dotenv';

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID
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
