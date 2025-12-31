import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { LiquidButton } from '../../components/atoms/LiquidButton';
import { COLORS, TYPOGRAPHY } from '../../constants/design-tokens';

export default function ReportDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="dark" />

            <View style={styles.content}>
                <Text style={styles.title}>Report #{id}</Text>
                <Text style={styles.subtitle}>Draft / Edit Mode</Text>

                {/* Placeholder for detailed editing form */}
                <View style={styles.placeholderBox}>
                    <Text style={{ color: 'white' }}>Edit Details Implementation</Text>
                </View>

                <LiquidButton
                    title="Save Changes"
                    onPress={() => router.back()}
                    style={{ marginTop: 20 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent', // Intended to be presented as modal
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontFamily: TYPOGRAPHY.families.display,
        fontSize: 32,
        color: COLORS.accents_liquid.pearl_text,
    },
    subtitle: {
        fontFamily: TYPOGRAPHY.families.primary,
        fontSize: 16,
        color: COLORS.accents_liquid.ghost_text,
        marginBottom: 32,
    },
    placeholderBox: {
        height: 200,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    }
});
