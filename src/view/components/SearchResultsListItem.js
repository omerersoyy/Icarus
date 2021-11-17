import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import ColorScheme from '../utils/ColorScheme';

const SearchResultsListItem = ({description, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <Text style={style.text}>{description}</Text>
    </TouchableOpacity>
  );
};

export default SearchResultsListItem;

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    height: 40,
  },
  text: {
    color: ColorScheme.text,
  },
});
