import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const IntroScreen = () => {
    const navigation = useNavigation();

    // Animation values
    const iconScale = useSharedValue(0);
    const iconRotate = useSharedValue(0);
    const titleTranslateY = useSharedValue(50);
    const titleOpacity = useSharedValue(0);
    const subtitleTranslateY = useSharedValue(50);
    const subtitleOpacity = useSharedValue(0);
    const buttonScale = useSharedValue(0);
    const floatingY = useSharedValue(0);

    useEffect(() => {
        // Entrance Animations
        iconScale.value = withSpring(1, { damping: 12, stiffness: 90 });
        iconRotate.value = withDelay(200, withSpring(1));

        titleTranslateY.value = withDelay(400, withSpring(0));
        titleOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));

        subtitleTranslateY.value = withDelay(700, withSpring(0));
        subtitleOpacity.value = withDelay(700, withTiming(1, { duration: 800 }));

        buttonScale.value = withDelay(1400, withSpring(1, { damping: 12 }));

        // Continuous Floating Animation for Icon
        floatingY.value = withDelay(
            1500,
            withRepeat(
                withSequence(
                    withTiming(-15, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
                    withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.quad) })
                ),
                -1,
                true
            )
        );
    }, []);

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: iconScale.value },
            { rotate: `${iconRotate.value * 10}deg` }, // Subtle rotation
            { translateY: floatingY.value }
        ]
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
        <LinearGradient
            colors={['#1c1e21', '#2c3e50', '#4ca1af']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.contentContainer}>
                {/* Floating 3D-like Icon */}
                <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="school" size={100} color="#fff" />
                    </View>
                    <View style={styles.glow} />
                </Animated.View>

                {/* Typography */}
                <Animated.View style={[styles.textWrapper, animatedTitleStyle]}>
                    <Text style={styles.title}>SmartAdvisor</Text>
                </Animated.View>

                <Animated.View style={[styles.textWrapper, animatedSubtitleStyle]}>
                    <Text style={styles.subtitle}>
                        Votre avenir académique commence ici.
                    </Text>
                    <Text style={styles.description}>
                        Découvrez les meilleures recommandations de parcours basées sur l'intelligence artificielle.
                    </Text>
                </Animated.View>
            </View>

            {/* Glassmorphism Button */}
            <Animated.View style={[styles.footer, animatedButtonStyle]}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => navigation.replace('Login')}
                >
                    <LinearGradient
                        colors={['#4ca1af', '#2c3e50']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                    >
                        <Text style={styles.buttonText}>Commencer l'expérience</Text>
                        <Ionicons name="arrow-forward-circle" size={28} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 80,
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 40,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        position: 'relative',
    },
    iconCircle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        zIndex: 2,
        shadowColor: '#4ca1af',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    glow: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(76, 161, 175, 0.3)',
        filter: 'blur(40px)', // Note: standard CSS blur, might behave differently on Native but adds web effect
        zIndex: 1,
    },
    textWrapper: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 46,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#76efff', // Cyan touch
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 15,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        lineHeight: 24,
        marginHorizontal: 10,
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    button: {
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    buttonGradient: {
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 1,
    }
});

export default IntroScreen;
