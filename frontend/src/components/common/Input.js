import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const Input = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  secureTextEntry,
  autoCapitalize = 'none',
  keyboardType = 'default',
  leftIcon,
  rightIcon,
  multiline = false,
  numberOfLines = 1,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        { 
          backgroundColor: theme.colors.card,
          borderColor: error ? theme.colors.danger : theme.colors.border,
        }
      ]}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={theme.colors.gray}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              paddingLeft: leftIcon ? 40 : 15,
              paddingRight: rightIcon ? 40 : 15,
              height: multiline ? numberOfLines * 24 : 50,
            }
          ]}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={[styles.error, { color: theme.colors.danger }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  input: {
    fontSize: 16,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: 15,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: 13,
    zIndex: 1,
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default Input;