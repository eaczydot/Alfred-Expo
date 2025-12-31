import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { COLORS, PHYSICS, TYPOGRAPHY } from '../../constants/design-tokens';

interface RefractivePillProps {
    label: string;
    score: number;
    icon?: React.ReactNode;
    confidence?: number; // 0.0 to 1.0 (Higher = Faster/Brighter Shimmer)
}

export function RefractivePill({ label, score, icon, confidence = 0.8 }: RefractivePillProps) {
    // Appearance animation
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);

    // Refraction animation (shimmer)
    const shimmerTranslate = useSharedValue(-100);

    useEffect(() => {
        scale.value = withSpring(1, PHYSICS.springs.liquid_open);
        opacity.value = withTiming(1, { duration: 300 });

        // Calculate duration: Higher confidence -> Faster shimmer (lower duration)
        // Base duration 2000ms at 0 confidence, down to 800ms at 1.0 confidence
        const shimmerDuration = 2000 - (confidence * 1200);

        // Continuous shimmer effect
        shimmerTranslate.value = withRepeat(
            withSequence(
                withTiming(150, { duration: shimmerDuration, easing: Easing.linear }),
                withTiming(-100, { duration: 0 })
            ),
            -1,
            false
        );
    }, [confidence]);

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    const shimmerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: shimmerTranslate.value }],
        };
    });

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            {/* Glass Background */}
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient
                    colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                />
            </View>

            {/* Refraction/Shimmer Layer */}
            <View style={styles.shimmerMask}>
                <Animated.View style={[styles.shimmer, shimmerStyle]}>
                    <LinearGradient
                        colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                <View style={styles.textContainer}>
                    <Text style={styles.label}>{label}</Text>
                    <Text style={styles.score}>{score}</Text>
                </View>
                <ArrowRight size={14} color={COLORS.accents_liquid.pearl_text} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(10, 10, 12, 0.4)', // Slight dark tint for contrast
    },
    shimmerMask: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        zIndex: 1,
    },
    shimmer: {
        ...StyleSheet.absoluteFillObject,
        width: '100%', // Adjust if needed
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 2,
        gap: 8,
    },
    iconContainer: {
        marginRight: 4,
    },
    textContainer: {
        flexDirection: 'column',
    },
    label: {
        fontFamily: TYPOGRAPHY.families.mono, // Using mono as per lens_hud_label style usually
        fontSize: 10,
        color: COLORS.accents_liquid.ghost_text,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    score: {
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 14,
        color: COLORS.accents_liquid.pearl_text,
        fontWeight: '600',
    },
});
