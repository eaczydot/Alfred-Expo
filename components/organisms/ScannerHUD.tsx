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
    withTiming,
} from 'react-native-reanimated';
import { COLORS, TYPOGRAPHY } from '../../constants/design-tokens';

const { width, height } = Dimensions.get('window');

export function ScannerHUD() {
    const beamPosition = useSharedValue(0);

    useEffect(() => {
        beamPosition.value = withRepeat(
            withSequence(
                withTiming(height, { duration: 2500, easing: Easing.linear }),
                withTiming(0, { duration: 2500, easing: Easing.linear })
            ),
            -1,
            false
        );
    }, []);

    const beamStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: beamPosition.value }],
        };
    });

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">

            {/* Score Ticker - Top Center */}
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>POTENTIAL IMPACT</Text>
                <Text style={styles.scoreValue}>85</Text>
            </View>

            {/* Reticle - Center */}
            <View style={styles.reticleContainer}>
                <Scan size={200} color="rgba(255,255,255,0.3)" strokeWidth={1} />
                {/* Center Dot */}
                <View style={styles.centerDot} />
            </View>

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
