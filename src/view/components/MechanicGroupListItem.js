import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import ColorScheme from '../utils/ColorScheme';
import React from 'react';

const MechanicGroupListItem = ({label, badge, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.badgeContainer}>
        <Text style={styles.badge}>{badge}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MechanicGroupListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 21,
  },
  badgeContainer: {
    minWidth: 75,
    padding: 7,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: ColorScheme.info,
    backgroundColor: ColorScheme.background,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  label: {
    color: ColorScheme.black,
  },
  badge: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: ColorScheme.info,
  },
});
