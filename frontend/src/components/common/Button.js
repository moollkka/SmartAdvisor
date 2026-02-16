import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const Button = ({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) => {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return {
          backgroundColor: disabled ? theme.colors.gray : theme.colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? theme.colors.gray : theme.colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? theme.colors.gray : theme.colors.primary,
        };
      case 'danger':
        return {
          backgroundColor: disabled ? theme.colors.gray : theme.colors.danger,
        };
      default:
        return {
          backgroundColor: disabled ? theme.colors.gray : theme.colors.primary,
        };
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'outline':
        return disabled ? theme.colors.gray : theme.colors.primary;
      default:
        return '#fff';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;