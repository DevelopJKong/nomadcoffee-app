import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './tabs.navigation';
import Stacks from './stacks.navigation';

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="Stacks" component={Stacks} />
      <Nav.Screen name="Tabs" component={Tabs} />
    </Nav.Navigator>
  );
};

export default Root;
