import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, TrendingUp, Zap } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { COLORS, TYPOGRAPHY } from '../../constants/design-tokens';

const StatCard = ({ icon, value, label, delay }: { icon: React.ReactNode, value: string, label: string, delay: number }) => (
    <Animated.View entering={FadeInUp.delay(delay).springify()} style={styles.statCard}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.statContent}>
            <View style={styles.iconContainer}>{icon}</View>
            <View>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
        </View>
    </Animated.View>
);

export default function ImpactScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.foundations.void, COLORS.foundations.deep_sludge]}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Impact</Text>
                <Text style={styles.headerSubtitle}>Citizen Level 4</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.heroStat}>
                    <Animated.Text entering={FadeInDown.delay(200)} style={styles.heroValue}>1,240</Animated.Text>
                    <Text style={styles.heroLabel}>IMPACT POINTS</Text>
                </View>

                <View style={styles.statsGrid}>
                    <StatCard
                        delay={400}
                        icon={<Zap size={24} color={COLORS.accents_liquid.amber_alert} />}
                        value="12"
                        label="Reports Dispatched"
                    />
                    <StatCard
                        delay={500}
                        icon={<Shield size={24} color={COLORS.accents_liquid.emerald_resolution} />}
                        value="98%"
                        label="Trust Score"
                    />
                    <StatCard
                        delay={600}
                        icon={<TrendingUp size={24} color={COLORS.accents_liquid.azure_primary} />}
                        value="High"
                        label="Neighborhood Rank"
                    />
                </View>
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
        paddingTop: 80,
        paddingHorizontal: 24,
        marginBottom: 40,
    },
    headerTitle: {
        fontFamily: TYPOGRAPHY.families.display,
        fontSize: 42,
        color: '#fff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontFamily: TYPOGRAPHY.families.mono,
        fontSize: 14,
        color: COLORS.accents_liquid.azure_primary,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    content: {
        paddingBottom: 100,
    },
    heroStat: {
        alignItems: 'center',
        marginBottom: 48,
    },
    heroValue: {
        fontFamily: TYPOGRAPHY.families.display,
        fontSize: 80,
        color: COLORS.accents_liquid.pearl_text,
        textShadowColor: COLORS.accents_liquid.azure_glow,
        textShadowRadius: 30,
        marginBottom: 8,
    },
    heroLabel: {
        ...TYPOGRAPHY.styles.lens_hud_label,
        letterSpacing: 4,
    },
    statsGrid: {
        paddingHorizontal: 24,
        gap: 16,
    },
    statCard: {
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    statContent: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statValue: {
        fontFamily: TYPOGRAPHY.families.display,
        fontSize: 24,
        color: '#fff',
    },
    statLabel: {
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
    }
});
