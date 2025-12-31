
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FeedCard } from '../../components/molecules/FeedCard';
import { COLORS, TYPOGRAPHY } from '../../constants/design-tokens';

const MOCK_DATA = [
    { id: '1', type: 'report', title: 'Pothole on 5th', desc: 'Large crater causing traffic slowdown.', location: 'Downtown' },
    { id: '2', type: 'gig', title: 'Community Cleanup', desc: 'Need 5 people for park trash removal.', location: 'Central Park' },
    { id: '3', type: 'report', title: 'Street Light Out', desc: 'Corner of Elm and Oak is pitch black.', location: 'Westside' },
    { id: '4', type: 'report', title: 'Graffiti Removal', desc: 'Tagging on the library wall.', location: 'Public Library' },
    { id: '5', type: 'gig', title: 'Fix Bench', desc: 'Broken slats on bus stop bench.', location: 'Main Blvd' },
];

export default function FeedScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.foundations.void, COLORS.foundations.deep_sludge]}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.header}>
                <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                <Text style={styles.headerTitle}>Civic Feed</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.grid}>
                    {/* Simple 2-column masonry simulation */}
                    <View style={styles.column}>
                        {MOCK_DATA.filter((_, i) => i % 2 === 0).map((item) => (
                            <FeedCard
                                key={item.id}
                                type={item.type as 'report' | 'gig'}
                                title={item.title}
                                description={item.desc}
                                location={item.location}
                            />
                        ))}
                    </View>

                    <View style={styles.column}>
                        {MOCK_DATA.filter((_, i) => i % 2 !== 0).map((item) => (
                            <FeedCard
                                key={item.id}
                                type={item.type as 'report' | 'gig'}
                                title={item.title}
                                description={item.desc}
                                location={item.location}
                            />
                        ))}
                    </View>
                </View>
                {/* Spacer for Tab Bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.foundations.void,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        zIndex: 10,
    },
    headerTitle: {
        fontFamily: TYPOGRAPHY.families.display,
        fontSize: 32,
        color: '#fff',
    },
    scrollContent: {
        padding: 16,
    },
    grid: {
        flexDirection: 'row',
        gap: 16,
    },
    column: {
        flex: 1,
    },
});

