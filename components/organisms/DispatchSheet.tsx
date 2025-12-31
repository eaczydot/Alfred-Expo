import { BlurView } from 'expo-blur';
import { MapPin, Share2 } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, View } from 'react-native';
import { BLUR, COLORS, TYPOGRAPHY } from '../../constants/design-tokens';
import { ChannelWell } from '../atoms/ChannelWell';
import { FrostedInput } from '../atoms/FrostedInput';
import { LiquidButton } from '../atoms/LiquidButton';

const { height } = Dimensions.get('window');

interface DispatchSheetProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    imageUri?: string;
}

export function DispatchSheet({ visible, onClose, onSubmit, imageUri }: DispatchSheetProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                {/* Touch overlay to close? Optional */}

                <View style={styles.sheetContainer}>
                    <BlurView intensity={BLUR.intensities.panel_overlay} style={StyleSheet.absoluteFill} tint="dark" />

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
                            <FrostedInput placeholder="Description" multiline style={{ height: 80 }} />
                        </View>

                        {/* Channel Selector */}
                        <Text style={styles.sectionLabel}>CHANNELS</Text>
                        <View style={styles.channelGrid}>
                            <ChannelWell isActive={true} onToggle={() => { }} icon={<MapPin size={24} color="#fff" />} />
                            <ChannelWell isActive={false} onToggle={() => { }} icon={<Share2 size={24} color="#fff" />} />
                        </View>

                        {/* Submit CTA */}
                        <View style={styles.footer}>
                            <LiquidButton title="DISPATCH REPORT" variant="dispatch" onPress={onSubmit} isFluid />
                            <LiquidButton title="CANCEL" variant="ghost" onPress={onClose} style={{ marginTop: 12 }} />
                        </View>
                    </View>
                </View>
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
        width: '100%',
        height: height * 0.75, // Occupy bottom 75%
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
