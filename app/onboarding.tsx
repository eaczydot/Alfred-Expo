import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Eye, Map, Shield } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { LiquidButton } from '../components/atoms/LiquidButton';
import { COLORS as TOKENS_COLORS, TYPOGRAPHY as TOKENS_TYPOGRAPHY } from '../constants/design-tokens';
import { useAppState } from '../store/useAppState';

const COLORS = TOKENS_COLORS || { foundations: { void: '#000000' }, accents_liquid: { azure_primary: '#38bdf8', ghost_text: 'rgba(255,255,255,0.45)' } };
const TYPOGRAPHY = TOKENS_TYPOGRAPHY || { families: { primary: 'System', display: 'System' } };

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
    const [step, setStep] = useState(0);
    const router = useRouter();
    const { setHasSeenOnboarding, setUserRole } = useAppState();

    const handleNext = (role?: 'reporter' | 'guardian' | 'provider') => {
        if (step < 2) {
            setStep(step + 1);
        } else {
            setHasSeenOnboarding(true);
            if (role) setUserRole(role);
            router.replace('/(tabs)/camera');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <Animated.View key="step0" entering={FadeIn} exiting={SlideOutLeft} style={styles.stepContainer}>
                        <View style={styles.iconContainer}>
                            <Eye size={64} color={COLORS.accents_liquid.azure_primary} />
                        </View>
                        <Text style={styles.title}>Alfred</Text>
                        <Text style={styles.subtitle}>Capture First. Dispatch Fast.</Text>
                        <Text style={styles.description}>
                            The neighborhood is yours to improve. Just point, shoot, and dispatch.
                        </Text>
                    </Animated.View>
                );
            case 1:
                return (
                    <Animated.View key="step1" entering={SlideInRight} exiting={SlideOutLeft} style={styles.stepContainer}>
                        <View style={styles.iconContainer}>
                            <Map size={64} color={COLORS.accents_liquid.emerald_resolution} />
                        </View>
                        <Text style={styles.title}>Clear Sight</Text>
                        <Text style={styles.description}>
                            We need access to your Camera and Location to identify issues and verify reports.
                        </Text>
                    </Animated.View>
                );
            case 2:
                return (
                    <Animated.View key="step2" entering={SlideInRight} exiting={SlideOutLeft} style={styles.stepContainer}>
                        <View style={styles.iconContainer}>
                            <Shield size={64} color={COLORS.accents_liquid.amber_alert} />
                        </View>
                        <Text style={styles.title}>Choose Your Role</Text>
                        <Text style={styles.description}>
                            Are you a Reporter, a Guardian, or a Provider?
                        </Text>
                        {/* Selection */}
                        <View style={{ gap: 10, width: '100%', marginTop: 20 }}>
                            <LiquidButton title="REPORTER" onPress={() => handleNext('reporter')} variant="ghost" />
                            <LiquidButton title="GUARDIAN" onPress={() => handleNext('guardian')} variant="ghost" />
                        </View>
                    </Animated.View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.foundations.void, COLORS.foundations.deep_sludge]}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.content}>
                {renderStep()}
            </View>

            <View style={styles.footer}>
                {step < 2 && (
                    <LiquidButton title={step === 0 ? "START" : "ALLOW ACCESS"} onPress={handleNext} isFluid variant="dispatch" />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.foundations.void,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    stepContainer: {
        alignItems: 'center',
        width: '100%',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    title: {
        fontFamily: TYPOGRAPHY.families.display,
        fontSize: 42,
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 20,
        color: COLORS.accents_liquid.azure_primary,
        marginBottom: 24,
        textAlign: 'center',
    },
    description: {
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 16,
        color: COLORS.accents_liquid.ghost_text,
        textAlign: 'center',
        lineHeight: 24,
        marginTop: 8,
    },
    footer: {
        padding: 24,
        paddingBottom: 48,
    },
});
