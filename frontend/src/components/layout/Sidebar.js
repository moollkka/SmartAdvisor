import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Sidebar = ({ isVisible, onClose, navigation, currentRoute }) => {
  if (!isVisible) return null;

  const menuItems = [
    { key: 'dashboard', label: 'Tableau de bord', icon: 'home', route: 'Dashboard' },
    { key: 'recommendations', label: 'Recommandations', icon: 'star', route: 'Recommendations' },
    { key: 'modules', label: 'Catalogue', icon: 'book', route: 'Modules' },
    { key: 'history', label: 'Historique', icon: 'time', route: 'History' },
    { key: 'profile', label: 'Profil', icon: 'person', route: 'Profile' },
  ];

  const handleNavigation = (route) => {
    onClose();
    navigation.navigate(route);
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.title}>SmartAdvisor</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.menuItem,
                currentRoute === item.route && styles.menuItemActive
              ]}
              onPress={() => handleNavigation(item.route)}
            >
              <Ionicons 
                name={item.icon} 
                size={20} 
                color={currentRoute === item.route ? '#2196F3' : '#666'} 
              />
              <Text style={[
                styles.menuText,
                currentRoute === item.route && styles.menuTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: 'white',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  menu: {
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuItemActive: {
    backgroundColor: '#F0F8FF',
    borderRightWidth: 3,
    borderRightColor: '#2196F3',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  menuTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: '#999',
  },
});

export default Sidebar;