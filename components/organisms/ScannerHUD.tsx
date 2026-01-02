import { LinearGradient } from 'expo-linear-gradient';
import { Scan } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { COLORS, TYPOGRAPHY } from '../../constants/design-tokens';

const { width, height } = Dimensions.get('window');

const PARTICLE_COUNT = 15;

const Particle = ({ index }: { index: number }) => {
    const x = useSharedValue(Math.random() * width);
    const y = useSharedValue(Math.random() * height);
    const opacity = useSharedValue(0);

    useEffect(() => {
        const animate = () => {
            x.value = Math.random() * width;
            y.value = Math.random() * height;
            opacity.value = withSequence(
                withTiming(0.4, { duration: 1000 }),
                withTiming(0, { duration: 1000 })
            );
        };

        const interval = setInterval(animate, 2000 + Math.random() * 2000);
        return () => clearInterval(interval);
    }, []);

    const style = useAnimatedStyle(() => ({
        position: 'absolute',
        left: x.value,
        top: y.value,
        width: 2,
        height: 2,
        borderRadius: 1,
        backgroundColor: COLORS.accents_liquid.azure_primary,
        opacity: opacity.value,
    }));

    return <Animated.View style={style} />;
};

export function ScannerHUD({ isDetecting = false }: { isDetecting?: boolean }) {
    const beamPosition = useSharedValue(0);
    const reticleScale = useSharedValue(1);

    useEffect(() => {
        beamPosition.value = withRepeat(
            withSequence(
                withTiming(height, { duration: isDetecting ? 1500 : 3000, easing: Easing.linear }),
                withTiming(0, { duration: isDetecting ? 1500 : 3000, easing: Easing.linear })
            ),
            -1,
            false
        );
    }, [isDetecting]);

    useEffect(() => {
        if (isDetecting) {
            reticleScale.value = withRepeat(
                withSequence(
                    withSpring(1.05, { damping: 2, stiffness: 80 }),
                    withSpring(1, { damping: 2, stiffness: 80 })
                ),
                -1,
                true
            );
        } else {
            reticleScale.value = withSpring(1);
        }
    }, [isDetecting]);

    const beamStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: beamPosition.value }],
            opacity: isDetecting ? 0.8 : 0.3,
        };
    });

    const reticleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: reticleScale.value }],
        opacity: withTiming(isDetecting ? 1 : 0.3),
    }));

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">

            {/* Particle Foundation */}
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
                <Particle key={i} index={i} />
            ))}

            {/* Score Ticker - Top Center */}
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>POTENTIAL IMPACT</Text>
                <Text style={[styles.scoreValue, isDetecting && styles.scoreDetecting]}>
                    {isDetecting ? '120' : '85'}
                </Text>
            </View>

            {/* Reticle - Center */}
            <Animated.View style={[styles.reticleContainer, reticleStyle]}>
                <Scan size={200} color={isDetecting ? COLORS.accents_liquid.azure_primary : "rgba(255,255,255,0.3)"} strokeWidth={1} />
                {/* Center Dot */}
                <View style={[styles.centerDot, isDetecting && styles.centerDotDetecting]} />
            </Animated.View>

            {/* Shimmer Beam */}
            <Animated.View style={[styles.beam, beamStyle]}>
                <LinearGradient
                    colors={['transparent', COLORS.accents_liquid.azure_primary, 'transparent']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }} // Horizontal gradient for the line itself? 
                    // Actually vertical beam usually means horizontal line moving vertically.
                    // Let's assume horizontal line moving up/down.
                    style={styles.beamGradient}
                />
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    scoreContainer: {
        position: 'absolute',
        top: 60,
        alignSelf: 'center',
        alignItems: 'center',
    },
    scoreLabel: {
        ...TYPOGRAPHY.styles.lens_hud_label,
        marginBottom: 4,
    },
    scoreValue: {
        fontFamily: TYPOGRAPHY.families.display,
        fontSize: 42,
        color: 'white',
        textShadowColor: 'rgba(56, 189, 248, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    reticleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerDot: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.accents_liquid.azure_primary,
        shadowColor: COLORS.accents_liquid.azure_primary,
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    centerDotDetecting: {
        width: 12,
        height: 12,
        borderRadius: 6,
        shadowRadius: 20,
    },
    scoreDetecting: {
        color: COLORS.accents_liquid.azure_primary,
        fontSize: 48,
    },
    beam: {
        position: 'absolute',
        top: -2, // Start slightly above
        width: '100%',
        height: 4,
    },
    beamGradient: {
        flex: 1,
        height: 4,
    },
});
