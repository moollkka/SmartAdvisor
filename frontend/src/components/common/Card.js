import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const Card = ({ children, onPress, variant = 'elevated', style, ...props }) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[
        styles.base,
        styles[variant],
        style
      ]}
      onPress={onPress}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flat: {
    shadowColor: 'transparent',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});

export default Card;