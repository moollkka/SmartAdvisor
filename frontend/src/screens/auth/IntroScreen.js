import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useEffect } from 'react';
import { Dimensions, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const IntroScreen = () => {
    const navigation = useNavigation();

    // Animation values
    const iconScale = useSharedValue(0);
    const contentOpacity = useSharedValue(0);
    const contentTranslateY = useSharedValue(50);
    const buttonScale = useSharedValue(0);

    useEffect(() => {
        // Entrance Animations
        iconScale.value = withSpring(1, { damping: 12, stiffness: 90 });

        contentOpacity.value = withDelay(300, withTiming(1, { duration: 1000 }));
        contentTranslateY.value = withDelay(300, withSpring(0));

        buttonScale.value = withDelay(1000, withSpring(1, { damping: 12 }));
    }, []);

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: iconScale.value }]
    }));

    const animatedContentStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
        transform: [{ translateY: contentTranslateY.value }]
    }));

    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: buttonScale.value }]
    }));

    return (
        <ImageBackground
            source={require('../../../assets/intro-bg.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            {/* Dark Blur Overlay for the whole background */}
            <BlurView intensity={Platform.OS === 'ios' ? 30 : 100} tint="dark" style={StyleSheet.absoluteFill}>
                <View style={styles.safeArea}>

                    {/* Top Content */}
                    <View style={styles.topSection}>
                        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                            <View style={styles.iconGlass}>
                                <Ionicons name="school" size={80} color="#fff" />
                            </View>
                        </Animated.View>
                    </View>

                    {/* Middle Glass Card */}
                    <Animated.View style={[styles.glassCard, animatedContentStyle]}>
                        <BlurView intensity={Platform.OS === 'ios' ? 60 : 80} tint="light" style={styles.cardBlur}>
                            <Text style={styles.title}>SmartAdvisor</Text>
                            <View style={styles.separator} />
                            <Text style={styles.subtitle}>
                                Votre guide intelligent pour un parcours universitaire réussi.
                            </Text>
                        </BlurView>
                    </Animated.View>

                    {/* Bottom Button */}
                    <Animated.View style={[styles.bottomSection, animatedButtonStyle]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('Login')}
                        >
                            <BlurView intensity={80} tint="default" style={styles.glassButton}>
                                <Text style={styles.buttonText}>Commencer</Text>
                                <Ionicons name="arrow-forward" size={24} color="#000" />
                            </BlurView>
                        </TouchableOpacity>
                    </Animated.View>

                </View>
            </BlurView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    topSection: {
        marginTop: 40,
        alignItems: 'center',
    },
    iconContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
    },
    iconGlass: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Semi-transparent
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(10px)', // Web support
    },
    glassCard: {
        width: '100%',
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight white tint
    },
    cardBlur: {
        padding: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff', // Dark text for contrast on light glass
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    separator: {
        width: 60,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 2,
        marginVertical: 15,
    },
    subtitle: {
        fontSize: 18,
        color: '#f0f0f0',
        textAlign: 'center',
        lineHeight: 26,
    },
    bottomSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    glassButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 50,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // More opaque for button
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10,
    },
});

export default IntroScreen;
