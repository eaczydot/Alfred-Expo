import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'; // Add import for LinearGradient
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { COLORS as TOKENS_COLORS, PHYSICS as TOKENS_PHYSICS } from '../../constants/design-tokens';

const COLORS = TOKENS_COLORS;
const PHYSICS = TOKENS_PHYSICS;

interface ChannelWellProps {
    isActive: boolean;
    onToggle: () => void;
    icon: React.ReactNode;
}

export function ChannelWell({ isActive, onToggle, icon }: ChannelWellProps) {
    // Animation value: 0 = inactive, 1 = active
    const activeValue = useSharedValue(isActive ? 1 : 0);
    const waveValue = useSharedValue(0);

    React.useEffect(() => {
        if (isActive) {
            waveValue.value = withRepeat(
                withTiming(1, { duration: 1500, easing: Easing.bezier(0.4, 0, 0.6, 1) }),
                -1,
                true
            );
        } else {
            waveValue.value = 0;
        }
    }, [isActive]);

    React.useEffect(() => {
        activeValue.value = withSpring(isActive ? 1 : 0, {
            damping: PHYSICS.springs.liquid_open.damping,
            mass: PHYSICS.springs.liquid_open.mass,
            stiffness: PHYSICS.springs.liquid_open.stiffness
        });
    }, [isActive]);

    const fillStyle = useAnimatedStyle(() => {
        // Animate the height/scale of the "liquid" filling up
        const translateY = interpolate(activeValue.value, [0, 1], [50, 0]);
        const skewX = isActive ? interpolate(waveValue.value, [0, 1], [-5, 5]) : 0;

        return {
            transform: [
                { translateY },
                { skewX: `${skewX}deg` }
            ],
            opacity: activeValue.value,
        };
    });

    return (
        <Pressable onPress={onToggle} style={styles.container}>
            <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />

            {/* Liquid Fill Layer */}
            <View style={styles.mask}>
                <Animated.View style={[StyleSheet.absoluteFill, fillStyle]}>
                    <LinearGradient // Use LinearGradient here
                        colors={[COLORS.accents_liquid.azure_primary, COLORS.accents_liquid.azure_glow]}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                    />
                </Animated.View>
            </View>

            {/* Icon Layer */}
            <View style={styles.iconContainer}>
                {icon}
            </View>

            {/* Border */}
            <View style={styles.border} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    mask: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 25,
        overflow: 'hidden',
    },
    iconContainer: {
        zIndex: 10,
    },
    border: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
});
