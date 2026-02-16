import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import RecommendationsScreen from '../screens/main/RecommendationsScreen';
import ModulesScreen from '../screens/main/ModulesScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import CustomDrawer from '../components/layout/CustomDrawer';
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const MainDrawer = createDrawerNavigator();
const LoadingScreen = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};
function AuthStackNavigator() {
  const { theme } = useContext(ThemeContext);
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
}
function MainTabNavigator() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard': iconName = focused ? 'home' : 'home-outline'; break;
            case 'Recommendations': iconName = focused ? 'star' : 'star-outline'; break;
            case 'Modules': iconName = focused ? 'book' : 'book-outline'; break;
            case 'Histoire': iconName = focused ? 'time' : 'time-outline'; break;
            default: iconName = 'alert';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,
      })}
    >
      <MainTab.Screen name="Dashboard" component={DashboardScreen} />
      <MainTab.Screen name="Recommendations" component={RecommendationsScreen} />
      <MainTab.Screen name="Modules" component={ModulesScreen} />
      <MainTab.Screen name="History" component={HistoryScreen} />
    </MainTab.Navigator>
  );
}

function MainDrawerNavigator() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <MainDrawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <MainDrawer.Screen 
        name="Main" 
        component={MainTabNavigator}
        options={{
          title: 'Smart Advisor',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
        }}
      />
      <MainDrawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </MainDrawer.Navigator>
  );
}
export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return isAuthenticated ? <MainDrawerNavigator /> : <AuthStackNavigator />;
}