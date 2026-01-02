import { BlurView } from 'expo-blur';
import { MapPin, Share2 } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { BLUR as TOKENS_BLUR, COLORS as TOKENS_COLORS, PHYSICS as TOKENS_PHYSICS, TYPOGRAPHY as TOKENS_TYPOGRAPHY } from '../../constants/design-tokens';
import { ChannelWell } from '../atoms/ChannelWell';
import { FrostedInput } from '../atoms/FrostedInput';
import { LiquidButton } from '../atoms/LiquidButton';

const BLUR = TOKENS_BLUR;
const COLORS = TOKENS_COLORS;
const PHYSICS = TOKENS_PHYSICS;
const TYPOGRAPHY = TOKENS_TYPOGRAPHY;

const { height, width } = Dimensions.get('window');

interface DispatchSheetProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    imageUri?: string;
}

export function DispatchSheet({ visible, onClose, onSubmit, imageUri }: DispatchSheetProps) {
    // Animation Values
    const sheetY = useSharedValue(height);
    const contentOpacity = useSharedValue(1);
    const orbScale = useSharedValue(0); // 0 = not an orb, 1 = full orb, then shrinks?
    // Actually, we want to morph the sheet container.
    const borderRadius = useSharedValue(32);
    const sheetWidth = useSharedValue(width);
    const sheetLeft = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            // Reset state
            sheetY.value = height;
            contentOpacity.value = 1;
            borderRadius.value = 32;
            sheetWidth.value = width;
            sheetLeft.value = 0;

            // Slide Up
            sheetY.value = withSpring(height * 0.25, { damping: 15 });
        } else {
            // Slide Down if just closed
            sheetY.value = withTiming(height);
        }
    }, [visible]);

    const handleSubmit = () => {
        // 1. Fade out content
        contentOpacity.value = withTiming(0, { duration: 200 });

        // 2. Morph to Orb
        const orbSize = 80;
        borderRadius.value = withTiming(orbSize / 2, { duration: 500 });
        sheetWidth.value = withSpring(orbSize, { damping: 12 });
        // Center it momentarily? Or just shrink in place?
        // Let's assume shrinking to center horizontally first
        sheetLeft.value = withSpring((width - orbSize) / 2);

        // 3. Move to bottom right (Impact Tab position approx)
        // Impact tab is roughly at X: width - 80, Y: height - 100
        const targetX = width - 80;
        const targetY = height - 100;

        setTimeout(() => {
            sheetLeft.value = withSpring(targetX, { damping: 15 });
            sheetY.value = withSpring(targetY, { damping: 15 });
            // Shrink to nothing
            sheetWidth.value = withDelay(300, withTiming(0));

            // Trigger actual submit after animation
            setTimeout(onSubmit, 800);
        }, 400);
    };

    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: sheetY.value }, { translateX: sheetLeft.value }],
        width: sheetWidth.value,
        borderRadius: borderRadius.value,
    }));

    // We need to apply this style to the container instead of simple styles

    return (
        <Modal
            animationType="none" // Controlled by reanimated
            transparent={true}
            visible={visible} // Keep visible during animation
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                {/* Touch overlay to close? Optional */}

                <Animated.View style={[styles.sheetContainer, sheetStyle]}>
                    <BlurView intensity={BLUR.intensities.panel_overlay} style={StyleSheet.absoluteFill} tint="dark" />

                    <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
                        <View style={styles.handle} />

                        <View style={styles.content}>
                            {/* Header / Title */}
                            <Text style={styles.title}>Dispatch Report</Text>

                            {/* Media Preview */}
                            {imageUri && (
                                <Image source={{ uri: imageUri }} style={styles.thumbnail} />
                            )}

                            {/* Inputs */}
                            <View style={styles.formContainer}>
                                <FrostedInput placeholder="Category" value="Illegal Dumping" editable={false} />
                                <FrostedInput placeholder="Description" multiline containerStyle={{ height: 80 }} />
                            </View>

                            {/* Channel Selector */}
                            <Text style={styles.sectionLabel}>CHANNELS</Text>
                            <View style={styles.channelGrid}>
                                <ChannelWell isActive={true} onToggle={() => { }} icon={<MapPin size={24} color="#fff" />} />
                                <ChannelWell isActive={false} onToggle={() => { }} icon={<Share2 size={24} color="#fff" />} />
                            </View>

                            {/* Submit CTA */}
                            <View style={styles.footer}>
                                <LiquidButton title="DISPATCH REPORT" variant="dispatch" onPress={handleSubmit} isFluid />
                                <LiquidButton title="CANCEL" variant="ghost" onPress={onClose} style={{ marginTop: 12 }} />
                            </View>
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheetContainer: {
        position: 'absolute', // Needed for free movement
        top: 0, // We animate translateY from height instead of relying on flex layout
        width: '100%',
        height: height * 0.75,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
    },
    content: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontFamily: TYPOGRAPHY.families.display,
        fontSize: 24,
        color: COLORS.accents_liquid.pearl_text,
        marginBottom: 20,
    },
    thumbnail: {
        width: '100%',
        height: 120,
        borderRadius: 16,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    formContainer: {
        gap: 12,
        marginBottom: 24,
    },
    sectionLabel: {
        ...TYPOGRAPHY.styles.lens_hud_label,
        marginBottom: 12,
    },
    channelGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    footer: {
        marginTop: 'auto',
        marginBottom: 20,
    }
});
