import React from 'react';
import LoginContainer from '../components/login/login-container';
import EventListContainer from '../components/event_list/event-list-container';
import EventDetailContainer from '../components/event-detail/event-detail-container';
import ExpoListContainer from '../components/expo-list/expo-list-container';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from'react-navigation-tabs';
//import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import UserFavs from '../components/user-favs/user-favs';

const EventStack = createStackNavigator({
  list: EventListContainer,
  detail: EventDetailContainer
},{
    headerMode: 'none',
    mode: 'modal'
  }
);

EventStack.navigationOptions = {
  tabBarLabel: 'Eventos',
  tabBarIcon: ({ focused }) => {
    let color = focused?'#3EE661':'black';
    return <Image
      style={{ width: 30, height: 30 }}
      source={require('../assets/images/eye.png')}
      color={color}
    />
  },
};

const ExposStack = createStackNavigator({
  expos: ExpoListContainer
},{
    headerMode: 'none',
    mode: 'modal'
  }
);

ExposStack.navigationOptions = {
  tabBarLabel: 'Expos',
  tabBarIcon: ({ focused }) => {
    let color = focused?'#3EE661':'black';
    return <Image
      style={{ width: 30, height: 30 }}
      source={require('../assets/images/events.png')}
      color={color}
    />
  },
};

const FavsStack = createStackNavigator({
  favs: UserFavs
},{
    headerMode: 'none',
    mode: 'modal'
  }
);

FavsStack.navigationOptions = {
  tabBarLabel: 'Favoritos',
  tabBarIcon: ({ focused }) => {
    let color = focused?'#3EE661':'black';
    return <MaterialIcons
      name='favorite' 
      size={25} color={color}
      />
  },
};

let tabBarOptions = {
  labelStyle:{
    fontFamily: 'Avenir'
  },
  activeTintColor:'#3EE661'
};

const TabNavigator = createBottomTabNavigator({
    Eventos: EventStack,
    Expos: ExposStack,
    Favs: FavsStack
  },
  {
    headerMode: 'none',
    mode: 'modal',
    tabBarOptions:tabBarOptions
  }
);

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: LoginContainer,
    Nav: TabNavigator
  })
);
