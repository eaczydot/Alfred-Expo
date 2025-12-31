import { Flag, Hand, Shield } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

    const [trustScoreIncrease, setTrustScoreIncrease] = useState(0);

    // Mock Location / GPS Check
    // In a real app, we'd check UserLocation vs ReportLocation
    const canBack = true; // Assume we are close enough for demo

    // Toggle handlers
    const handleSupport = () => {
        setSupportActive(!supportActive);
        onSupport();
    };

    const handleBack = () => {
        if (!canBack) return; // Prevent backing if too far

        const newValue = !backActive;
        setBackActive(newValue);

        if (newValue) {
            // Show +5 Trust Score
            setTrustScoreIncrease(5);
            setTimeout(() => setTrustScoreIncrease(0), 2000);
        }

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
            <View>
                <ChannelWell
                    isActive={backActive}
                    onToggle={handleBack}
                    icon={<Shield size={20} color={COLORS.accents_liquid.pearl_text} />}
                />
                {trustScoreIncrease > 0 && (
                    <Text style={styles.trustScorePopup}>+{trustScoreIncrease}</Text>
                )}
            </View>
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
    },
    trustScorePopup: {
        position: 'absolute',
        top: -20,
        alignSelf: 'center',
        color: COLORS.accents_liquid.emerald_resolution,
        fontWeight: 'bold',
        fontSize: 14,
    }
});
