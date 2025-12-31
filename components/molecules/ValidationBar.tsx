import { Flag, Hand, Shield } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/design-tokens';
import { ChannelWell } from '../atoms/ChannelWell';

interface ValidationBarProps {
    onSupport: () => void;
    onBack: () => void;
    onDispute: () => void;
}

export function ValidationBar({ onSupport, onBack, onDispute }: ValidationBarProps) {
    const [supportActive, setSupportActive] = useState(false);
    const [backActive, setBackActive] = useState(false);
    const [disputeActive, setDisputeActive] = useState(false);

    // Toggle handlers
    const handleSupport = () => {
        setSupportActive(!supportActive);
        onSupport();
    };

    const handleBack = () => {
        setBackActive(!backActive);
        onBack();
    };

    const handleDispute = () => {
        setDisputeActive(!disputeActive);
        onDispute();
    };

    return (
        <View style={styles.container}>
            <ChannelWell
                isActive={supportActive}
                onToggle={handleSupport}
                icon={<Hand size={20} color={COLORS.accents_liquid.pearl_text} />}
            />
            <ChannelWell
                isActive={backActive}
                onToggle={handleBack}
                icon={<Shield size={20} color={COLORS.accents_liquid.pearl_text} />}
            />
            <ChannelWell
                isActive={disputeActive}
                onToggle={handleDispute}
                icon={<Flag size={20} color={COLORS.accents_liquid.pearl_text} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 16,
        // Optional: add a glass background for the bar itself if needed, but blueprint doesn't strictly say so.
    },
});
