import { Redirect } from 'expo-router';
import { useAppState } from '../store/useAppState';

export default function Index() {
    const { hasSeenOnboarding } = useAppState();

    if (!hasSeenOnboarding) {
        return <Redirect href="/onboarding" />;
    }

    return <Redirect href="/(tabs)/camera" />;
}
