import ColorScheme from '../utils/ColorScheme';
import {Image, View, Text, StyleSheet} from 'react-native';
import React, {memo} from 'react';

const Card = ({label, title, img}) => {
  return (
    <View
      style={styles.container}>
      <Image
        style={{
          width: '100%',
          height: 500,
          margin: 5,
        }}
        source={img ? {uri: img} : require('../../assets/images/Empty.png')}
      />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default memo(
  Card,
  (prevProps, nextProps) => prevProps.label === nextProps.label,
);

const styles = StyleSheet.create({
  container: {
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ColorScheme.secondary,
    borderRadius: 5,
    backgroundColor: ColorScheme.background,
  },
  label: {
    color: ColorScheme.info,
    fontSize: 21,
    fontWeight: 'bold',
  },
  title: {
    color: ColorScheme.secondary,
    fontWeight: '500',
    fontStyle: 'italic',
  },
})
