import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { COLORS, PHYSICS, TYPOGRAPHY } from '../../constants/design-tokens';

// Make LinearGradient animatable
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface LiquidButtonProps {
    variant?: 'dispatch' | 'ghost';
    isFluid?: boolean;
    onPress?: () => void;
    title: string;
    style?: ViewStyle;
}

import { useSoundSystem } from '../../hooks/useSoundSystem';

export function LiquidButton({
    variant = 'dispatch',
    isFluid = false,
    onPress,
    title,
    style,
}: LiquidButtonProps) {
    const isPressed = useSharedValue(0);
    const { playSound } = useSoundSystem();

    const handlePress = () => {
        // Play tap sound
        if (variant === 'dispatch') {
            playSound('lock_on'); // Use lock_on or similar for major actions
        }
        if (onPress) onPress();
    };

    // Animation for scale and fluidity
    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(isPressed.value ? 0.96 : 1, PHYSICS.springs.glass_tap) },
            ],
        };
    });

    // Animation for the gradient coordinates/colors
    // Simulating "fluid" movement by shifting the gradient or changing colors
    const gradientColors = variant === 'dispatch'
        ? [COLORS.accents_liquid.azure_primary, COLORS.accents_liquid.azure_glow]
        : [COLORS.foundations.glass_shine, COLORS.foundations.glass_border];

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={() => (isPressed.value = 1)}
            onPressOut={() => (isPressed.value = 0)}
            style={[{ width: '100%' }, style]}
        >
            <Animated.View style={[styles.container, animatedContainerStyle]}>
                <LinearGradient
                    colors={gradientColors as [string, string]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                {/* Shine overlay */}
                <LinearGradient
                    colors={['rgba(255,255,255,0.2)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 0.5 }}
                    style={StyleSheet.absoluteFill}
                />
                <Text style={[styles.text, variant === 'ghost' && styles.ghostText]}>
                    {title}
                </Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.foundations.glass_border,
    },
    text: {
        color: '#fff',
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 16,
        letterSpacing: 0.5,
    },
    ghostText: {
        color: COLORS.accents_liquid.pearl_text,
    },
});
