import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { BLUR, COLORS, TYPOGRAPHY } from '../../constants/design-tokens';

interface FrostedInputProps extends TextInputProps {
    style?: ViewStyle;
}

export function FrostedInput({ style, ...props }: FrostedInputProps) {
    const isFocused = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            borderColor: withTiming(
                isFocused.value ? COLORS.accents_liquid.azure_glow : COLORS.foundations.glass_border,
                { duration: 200 }
            ),
            borderWidth: 1,
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle, style]}>
            <BlurView intensity={BLUR.intensities.panel_thin} style={StyleSheet.absoluteFill} tint="dark" />
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
