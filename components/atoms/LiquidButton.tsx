import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { COLORS as TOKENS_COLORS, PHYSICS as TOKENS_PHYSICS, TYPOGRAPHY as TOKENS_TYPOGRAPHY } from '../../constants/design-tokens';
import { useSoundSystem } from '../../hooks/useSoundSystem';

const COLORS = TOKENS_COLORS;
const PHYSICS = TOKENS_PHYSICS;
const TYPOGRAPHY = TOKENS_TYPOGRAPHY;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface LiquidButtonProps {
    variant?: 'dispatch' | 'ghost';
    isFluid?: boolean;
    onPress?: () => void;
    title: string;
    style?: ViewStyle;
}


export function LiquidButton({
    variant = 'dispatch',
    isFluid = false,
    onPress,
    title,
    style,
}: LiquidButtonProps) {
    const isPressed = useSharedValue(0);
    const fluidAnim = useSharedValue(0);
    const { playSound } = useSoundSystem();

    React.useEffect(() => {
        if (isFluid) {
            fluidAnim.value = withRepeat(
                withTiming(1, { duration: 3000 }),
                -1,
                true
            );
        }
    }, [isFluid]);

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
                { scale: withSpring(isPressed.value ? 0.95 : 1, PHYSICS.springs.glass_tap) },
            ],
            opacity: withSpring(isPressed.value ? 0.9 : 1),
        };
    });

    const animatedGradientProps = useAnimatedProps(() => {
        // Shift gradient coordinates on press and fluid animation
        const shift = interpolate(isPressed.value, [0, 1], [0, 0.2]);
        const wobble = isFluid ? interpolate(fluidAnim.value, [0, 1], [-0.05, 0.05]) : 0;

        return {
            start: { x: 0 - shift + wobble, y: 0 },
            end: { x: 1 + shift - wobble, y: 1 },
        };
    });

    const gradientColors = variant === 'dispatch'
        ? [COLORS.accents_liquid.azure_primary, COLORS.accents_liquid.azure_glow]
        : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)'];

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={() => (isPressed.value = 1)}
            onPressOut={() => (isPressed.value = 0)}
            style={[{ width: '100%' }, style]}
        >
            <Animated.View style={[styles.container, animatedContainerStyle]}>
                <AnimatedLinearGradient
                    colors={gradientColors as [string, string]}
                    animatedProps={animatedGradientProps}
                    style={StyleSheet.absoluteFill}
                />
                {/* Shine overlay */}
                <LinearGradient
                    colors={['rgba(255,255,255,0.15)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.5, y: 0.5 }}
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
