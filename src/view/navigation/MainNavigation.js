import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import DetailScreen from '../screens/DetailScreen';
import ColorScheme from '../utils/ColorScheme';

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
        headerStyle: {
          backgroundColor: ColorScheme.primary,
        },
        headerTitleStyle: {
          color: ColorScheme.info,
        },
        cardStyleInterpolator,
      }}
      initialRouteName={'Main'}>
      <MainStack.Screen
        path={'main'}
        name={'Main'}
        component={MainScreen}
        options={{
          title: 'Mechanics',
        }}
      />
      <MainStack.Screen
        path={'detail'}
        name={'Detail'}
        component={DetailScreen}
        options={{
          title: 'Cards',
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigation;
