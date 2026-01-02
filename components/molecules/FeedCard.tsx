import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BLUR, COLORS, TYPOGRAPHY } from '../../constants/design-tokens';
import { ValidationBar } from '../molecules/ValidationBar';

interface FeedCardProps {
    type: 'report' | 'gig';
    title: string;
    description: string;
    location: string;
    style?: ViewStyle;
}

export function FeedCard({ type, title, description, location, style }: FeedCardProps) {
    const isGig = type === 'gig';
    const accentColor = isGig ? COLORS.accents_liquid.emerald_resolution : COLORS.accents_liquid.azure_primary;

    return (
        <View style={[styles.container, style]}>
            {/* Background Glow */}
            <View
                style={[
                    styles.glow,
                    { backgroundColor: accentColor, opacity: isGig ? 0.05 : 0.08 }
                ]}
            />

            <BlurView intensity={BLUR.intensities.panel_thick} style={StyleSheet.absoluteFill} tint="dark" />

            {/* Content */}
            <View style={styles.content}>
                <View style={[styles.badge, { backgroundColor: isGig ? 'rgba(52, 211, 153, 0.2)' : 'rgba(56, 189, 248, 0.2)' }]}>
                    <Text style={[styles.badgeText, { color: accentColor }]}>
                        {isGig ? 'GIG POOL' : 'REPORT'}
                    </Text>
                </View>

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description} numberOfLines={3}>{description}</Text>
                <Text style={styles.location}>{location}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Actions */}
            <ValidationBar
                onSupport={() => console.log('Support')}
                onBack={() => console.log('Backing Report - GPS Verified')}
                onDispute={() => console.log('Dispute')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        backgroundColor: 'rgba(10, 10, 12, 0.4)',
        marginBottom: 16,
    },
    glow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 24,
    },
    content: {
        padding: 16,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 12,
    },
    badgeText: {
        fontFamily: TYPOGRAPHY.families.mono,
        fontSize: 10,
        fontWeight: 'bold',
    },
    title: {
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 18,
        color: '#fff',
        marginBottom: 8,
        fontWeight: '600',
    },
    description: {
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 12,
        lineHeight: 20,
    },
    location: {
        fontFamily: TYPOGRAPHY.families.mono,
        fontSize: 10,
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
    }
});
