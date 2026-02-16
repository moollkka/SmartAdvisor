import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const logoOpacity = useSharedValue(0);
    const logoScale = useSharedValue(0.3);
    const titleTranslateY = useSharedValue(50);
    const titleOpacity = useSharedValue(0);
    const subtitleTranslateY = useSharedValue(50);
    const subtitleOpacity = useSharedValue(0);
    const buttonScale = useSharedValue(0);

    useEffect(() => {
        // Start animations sequence
        logoOpacity.value = withTiming(1, { duration: 1000 });
        logoScale.value = withSpring(1, { damping: 10, stiffness: 100 });

        titleTranslateY.value = withDelay(500, withSpring(0));
        titleOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));

        subtitleTranslateY.value = withDelay(800, withSpring(0));
        subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));

        buttonScale.value = withDelay(1500, withSpring(1, { damping: 12 }));
    }, []);

    const animatedLogoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }]
    }));

    const animatedTitleStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: titleTranslateY.value }]
    }));

    const animatedSubtitleStyle = useAnimatedStyle(() => ({
        opacity: subtitleOpacity.value,
        transform: [{ translateY: subtitleTranslateY.value }]
    }));

    const animatedButtonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: buttonScale.value }]
    }));

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {/* Logo Section */}
                <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="school" size={80} color="#fff" />
                    </View>
                </Animated.View>

                {/* Text Section */}
                <Animated.View style={[styles.textContainer, animatedTitleStyle]}>
                    <Text style={styles.title}>SmartAdvisor</Text>
                </Animated.View>

                <Animated.View style={[styles.textContainer, animatedSubtitleStyle]}>
                    <Text style={styles.subtitle}>
                        Système de recommandation de parcours universitaire
                    </Text>
                </Animated.View>

                {/* Illustration Placeholder (Optional) */}
                <Animated.View style={[styles.illustrationContainer, animatedSubtitleStyle]}>
                    {/* You can add an image here later if needed */}
                </Animated.View>
            </View>

            {/* Button Section */}
            <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.replace('Login')}
                >
                    <Text style={styles.buttonText}>Commencer</Text>
                    <Ionicons name="arrow-forward" size={24} color="#4c669f" />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4c669f', // Primary blue color
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
    },
    contentContainer: {
        alignItems: 'center',
        marginTop: 60,
        width: '100%',
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    logoCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)'
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 18,
        color: '#e0e0e0',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: '80%',
    },
    illustrationContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonText: {
        color: '#4c669f',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default IntroScreen;
