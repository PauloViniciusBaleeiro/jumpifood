import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import ListScreen from './src/screens/ListScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
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
