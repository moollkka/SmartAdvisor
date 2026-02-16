import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notificationService = {
  requestPermissions: async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },
  scheduleNotification: async (title, body, data = {}) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
        vibrate: [0, 250, 250, 250],
      },
      trigger: null, 
    });
  },
  scheduleRecommendationNotification: async (count) => {
    await notificationService.scheduleNotification(
      'Nouvelles recommandations !',
      `Vous avez ${count} nouvelle(s) recommandation(s) personnalisée(s)`,
      { type: 'recommendations' }
    );
  },
  getExpoPushToken: async () => {
    const { data: token } = await Notifications.getExpoPushTokenAsync();
    return token;
  },
};