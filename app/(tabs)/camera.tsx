import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RefractivePill } from '../../components/molecules/RefractivePill';
import { DispatchSheet } from '../../components/organisms/DispatchSheet';
import { ScannerHUD } from '../../components/organisms/ScannerHUD';
import { COLORS } from '../../constants/design-tokens';

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const [detectedObject, setDetectedObject] = useState<{ x: number, y: number } | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    // Mock detection simulation
    const simulateDetection = () => {
        // 1. Simulate finding an object
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setDetectedObject({ x: 150, y: 300 });

        // 2. Open dispatch sheet after short delay
        setTimeout(() => {
            setIsSheetVisible(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }, 1500);
    };

    if (!permission?.granted) {
        return <View style={styles.container} />;
    }

    return (
        <View style={styles.container}>
            <CameraView style={StyleSheet.absoluteFill} facing="back" />

            {/* HUD Overlay */}
            <ScannerHUD />

            {/* Mock Object Label (RefractivePill) */}
            {detectedObject && (
                <View style={[styles.pillContainer, { top: detectedObject.y, left: detectedObject.x }]}>
                    <RefractivePill
                        label="ILLEGAL DUMPING"
                        score={85}
                        icon={<Trash2 size={14} color="#fff" />}
                    />
                </View>
            )}

            {/* Invisible trigger area for demo purposes */}
            <TouchableOpacity style={StyleSheet.absoluteFill} onPress={simulateDetection} activeOpacity={1} />

            <DispatchSheet
                visible={isSheetVisible}
                onClose={() => {
                    setIsSheetVisible(false);
                    setDetectedObject(null);
                }}
                onSubmit={() => {
                    setIsSheetVisible(false);
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
    }
});
