import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { LiquidButton } from '../../components/atoms/LiquidButton';
import { COLORS, TYPOGRAPHY } from '../../constants/design-tokens';

export default function PoolDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gig Pool #{id}</Text>

            <View style={styles.infoCard}>
                <Text style={styles.bountyText}>Bounty: 500 Credits</Text>
                <Text style={styles.descText}>
                    Cleanup required for illegal dumping site. Tools provided.
                </Text>
            </View>

            <LiquidButton
                title="Claim Gig"
                variant="dispatch"
                isFluid
                onPress={() => { }}
                style={{ marginTop: 'auto' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.foundations.void,
        padding: 24,
        paddingTop: 60,
    },
    title: {
        fontFamily: TYPOGRAPHY.families.display,
        fontSize: 32,
        color: '#fff',
        marginBottom: 24,
    },
    infoCard: {
        padding: 24,
        backgroundColor: 'rgba(52, 211, 153, 0.1)', // Emerald tint
        borderRadius: 24,
        borderWidth: 1,
        borderColor: COLORS.accents_liquid.emerald_resolution,
    },
    bountyText: {
        fontFamily: TYPOGRAPHY.families.mono,
        fontSize: 18,
        color: COLORS.accents_liquid.emerald_resolution,
        marginBottom: 12,
    },
    descText: {
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 16,
        color: COLORS.accents_liquid.pearl_text,
        lineHeight: 24,
    }
});
