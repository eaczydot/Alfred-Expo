import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { BLUR as TOKENS_BLUR, COLORS as TOKENS_COLORS, PHYSICS as TOKENS_PHYSICS, TYPOGRAPHY as TOKENS_TYPOGRAPHY } from '../../constants/design-tokens';

const BLUR = TOKENS_BLUR || { intensities: { panel_thin: 20, panel_thick: 50, panel_overlay: 80 } };
const COLORS = TOKENS_COLORS || { foundations: { glass_border: 'rgba(255,255,255,0.1)' }, accents_liquid: { azure_primary: '#38bdf8', azure_glow: 'rgba(56, 189, 248, 0.4)', ghost_text: 'rgba(255,255,255,0.45)' } };
const PHYSICS = TOKENS_PHYSICS || { springs: { glass_tap: { damping: 10, stiffness: 300 } } };
const TYPOGRAPHY = TOKENS_TYPOGRAPHY || { families: { primary: 'System' } };

interface FrostedInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
}

export function FrostedInput({ containerStyle, ...props }: FrostedInputProps) {
    const isFocused = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            borderColor: withTiming(
                isFocused.value ? COLORS.accents_liquid.azure_primary : COLORS.foundations.glass_border,
                { duration: 300 }
            ),
            borderWidth: 1,
            transform: [
                { scale: withSpring(isFocused.value ? 1.02 : 1, PHYSICS.springs.glass_tap) }
            ],
            shadowColor: COLORS.accents_liquid.azure_glow,
            shadowOpacity: withTiming(isFocused.value ? 0.5 : 0),
            shadowRadius: withTiming(isFocused.value ? 15 : 0),
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle, containerStyle]}>
            <BlurView
                intensity={isFocused.value ? BLUR.intensities.panel_thick : BLUR.intensities.panel_thin}
                style={StyleSheet.absoluteFill}
                tint="dark"
            />
            <TextInput
                {...props}
                style={styles.input}
                placeholderTextColor={COLORS.accents_liquid.ghost_text}
                onFocus={(e) => {
                    isFocused.value = 1;
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    isFocused.value = 0;
                    props.onBlur?.(e);
                }}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        color: COLORS.accents_liquid.pearl_text,
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 16,
    },
});
