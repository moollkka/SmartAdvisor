import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const logoScale = useSharedValue(0.3);
    const titleTranslateY = useSharedValue(50);
    const titleOpacity = useSharedValue(0);
    const subtitleTranslateY = useSharedValue(50);
    const subtitleOpacity = useSharedValue(0);
    const buttonScale = useSharedValue(0);

    useEffect(() => {
        // Start animations sequence
        logoScale.value = withSpring(1, { damping: 10, stiffness: 100 });

        titleTranslateY.value = withDelay(500, withSpring(0));
        titleOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));

        subtitleTranslateY.value = withDelay(800, withSpring(0));
        subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));

        buttonScale.value = withDelay(1500, withSpring(1, { damping: 12 }));
    }, []);

    const animatedImageStyle = useAnimatedStyle(() => ({
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
            {/* Background Image/Illustration */}
            <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
                <Image
                    source={require('../../../assets/intro-bg.jpg')}
                    style={styles.introImage}
                    resizeMode="contain"
                />
            </Animated.View>

            <View style={styles.contentContainer}>
                {/* Text Section */}
                <Animated.View style={[styles.textContainer, animatedTitleStyle]}>
                    <Text style={styles.title}>SmartAdvisor</Text>
                </Animated.View>

                <Animated.View style={[styles.textContainer, animatedSubtitleStyle]}>
                    <Text style={styles.subtitle}>
                        Système de recommandation de parcours universitaire
                    </Text>
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
        backgroundColor: '#0a4da2', // Matching the blue from the image
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
    },
    imageContainer: {
        width: width * 0.9,
        height: height * 0.45,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    introImage: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: -20,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },
    subtitle: {
        fontSize: 18,
        color: '#e0e0e0',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: '90%',
        marginTop: 10,
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
        color: '#0a4da2',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default IntroScreen;
