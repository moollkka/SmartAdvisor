import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    const titleTranslateY = useSharedValue(50);
    const titleOpacity = useSharedValue(0);
    const subtitleTranslateY = useSharedValue(50);
    const subtitleOpacity = useSharedValue(0);
    const buttonScale = useSharedValue(0);

    useEffect(() => {
        // Start animations sequence
        titleTranslateY.value = withDelay(300, withSpring(0));
        titleOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));

        subtitleTranslateY.value = withDelay(600, withSpring(0));
        subtitleOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));

        buttonScale.value = withDelay(1200, withSpring(1, { damping: 12 }));
    }, []);

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
        <ImageBackground
            source={require('../../../assets/intro-bg.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
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
                        <Ionicons name="arrow-forward" size={24} color="#0a4da2" />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 20, 60, 0.4)', // Dark blue overlay for better text contrast
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 80,
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 60,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },
    subtitle: {
        fontSize: 20,
        color: '#f0f0f0',
        textAlign: 'center',
        lineHeight: 28,
        maxWidth: '90%',
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        fontWeight: '500',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingVertical: 18,
        paddingHorizontal: 45,
        borderRadius: 50,
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
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default IntroScreen;
