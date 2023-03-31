import React from 'react';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import Home from '../pages/logout/home.page';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../pages/logout/search.page';
import Profile from '../pages/login/profile.page';

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
          tabBarIcon: ({ color, size }) => <Entypo name={'home'} color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name={'search'} color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name={'person'} color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
