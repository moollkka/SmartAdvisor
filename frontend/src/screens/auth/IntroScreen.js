import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

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
            {/* Blue Gradient Overlay */}
            <LinearGradient
                colors={['rgba(10, 77, 162, 0.85)', 'rgba(76, 102, 159, 0.9)']} // Strong Blue Gradient
                style={styles.overlay}
            >
                <View style={styles.safeArea}>

                    {/* Icon Section */}
                    <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="school" size={90} color="#0a4da2" />
                        </View>
                    </Animated.View>

                    {/* Text Content */}
                    <Animated.View style={[styles.contentContainer, animatedContentStyle]}>
                        <Text style={styles.title}>SmartAdvisor</Text>
                        <Text style={styles.subtitle}>
                            Optimisez votre parcours universitaire avec l'intelligence artificielle.
                        </Text>
                    </Animated.View>

                    {/* Bottom Button */}
                    <Animated.View style={[styles.bottomSection, animatedButtonStyle]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('Login')}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Commencer</Text>
                            <Ionicons name="arrow-forward" size={22} color="#0a4da2" />
                        </TouchableOpacity>
                    </Animated.View>

                </View>
            </LinearGradient>
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
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between', // Distribute space
        alignItems: 'center',
        paddingVertical: 80,
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    iconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 15,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 18,
        color: '#e0e0e0', // Light gray for readability on blue
        textAlign: 'center',
        lineHeight: 26,
        maxWidth: '85%',
    },
    bottomSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingVertical: 18,
        paddingHorizontal: 50,
        borderRadius: 40,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0a4da2', // Blue text to match theme
        marginRight: 10,
    },
});

export default IntroScreen;
