import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import DetailScreen from '../screens/DetailScreen';

const MainStack = createStackNavigator();

export const cardStyleInterpolator = ({current, layouts}) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
  };
};

const MainNavigation = () => {
  const nav = useNavigation();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: null,
        presentation: 'card',
        cardStyleInterpolator,
      }}
      initialRouteName={'Main'}>
      <MainStack.Screen
        path={'main'}
        name={'Main'}
        component={MainScreen}
        options={{
          title: 'Card Mechanics',
        }}
      />
      <MainStack.Screen
        path={'detail'}
        name={'Detail'}
        component={DetailScreen}
        options={{
          title: 'Card Mechanics',
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
