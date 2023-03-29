import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Home from '../pages/login/home.page';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name={'film-outline'} color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
