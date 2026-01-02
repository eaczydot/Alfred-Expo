import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { RefractivePill } from '../../components/molecules/RefractivePill';
import { DispatchSheet } from '../../components/organisms/DispatchSheet';
import { ScannerHUD } from '../../components/organisms/ScannerHUD';
import { COLORS } from '../../constants/design-tokens';

import { useSoundSystem } from '../../hooks/useSoundSystem';

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const [isFrozen, setIsFrozen] = useState(false);
    const [detectedObject, setDetectedObject] = useState<{ x: number, y: number } | null>(null);
    const router = useRouter();
    const { playSound } = useSoundSystem();

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
        // Play ambient hum
        playSound('scan_hum');
    }, [permission]);

    // Mock detection simulation
    const simulateDetection = () => {
        // 1. Simulate finding an object
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        playSound('lock_on');
        setDetectedObject({ x: 150, y: 300 });

        // 2. Open dispatch sheet after short delay, and freeze
        setTimeout(() => {
            setIsFrozen(true);
            setIsSheetVisible(true);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }, 2000);
    };

    useEffect(() => {
        // Auto-simulate scanning when screen focused
        const timer = setTimeout(simulateDetection, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!permission?.granted) {
        return <View style={styles.container} />;
    }

    return (
        <View style={styles.container}>
            <CameraView style={StyleSheet.absoluteFill} facing="back" />

            {/* Freeze Blur Overlay */}
            {isFrozen && (
                <Animated.View entering={FadeIn.duration(400)} exiting={FadeOut} style={StyleSheet.absoluteFill}>
                    <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
                </Animated.View>
            )}

            {/* HUD Overlay */}
            <ScannerHUD isDetecting={!!detectedObject} />

            {/* Particle System Mock (Static for now, implies scanning) */}
            {!isFrozen && (
                <View style={styles.particleField} pointerEvents="none" />
            )}

            {/* Mock Object Label (RefractivePill) */}
            {detectedObject && (
                <View style={[styles.pillContainer, { top: detectedObject.y, left: detectedObject.x }]}>
                    <RefractivePill
                        label="ILLEGAL DUMPING"
                        score={85}
                        confidence={0.95}
                        icon={<Trash2 size={14} color="#fff" />}
                    />
                </View>
            )}

            {/* Interaction Layer */}
            {!detectedObject && (
                <TouchableOpacity style={StyleSheet.absoluteFill} onPress={simulateDetection} activeOpacity={1} />
            )}

            <DispatchSheet
                visible={isSheetVisible}
                onClose={() => {
                    setIsSheetVisible(false);
                    setIsFrozen(false);
                    setDetectedObject(null);
                }}
                onSubmit={() => {
                    setIsSheetVisible(false);
                    setIsFrozen(false);
                    setDetectedObject(null);
                    // Navigate to Impact or animate success
                    router.navigate('/(tabs)/impact');
                }}
                imageUri="https://via.placeholder.com/300" // Placeholder for now
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.foundations.void,
    },
    pillContainer: {
        position: 'absolute',
    },
    particleField: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(56, 189, 248, 0.05)', // Very subtle azure tint
    }
});
