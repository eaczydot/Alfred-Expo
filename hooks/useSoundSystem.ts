import { Audio } from 'expo-av';
import { useCallback, useRef } from 'react';

type SoundName = 'scan_hum' | 'lock_on' | 'liquid_success';

/**
 * A hook for playing sound effects.
 * Currently uses placeholder/mock implementations.
 */
export function useSoundSystem() {
    const soundRef = useRef<Audio.Sound | null>(null);

    const playSound = useCallback(async (name: SoundName) => {
        // For Expo Go compatibility, we'll use console logging as placeholder
        // In a production build, you would load actual audio files here
        console.log(`[SoundSystem] Playing: ${name}`);

        // Example of how real sound loading would work:
        // try {
        //     const soundMap: Record<SoundName, any> = {
        //         'scan_hum': require('../assets/sounds/scan_hum.mp3'),
        //         'lock_on': require('../assets/sounds/lock_on.wav'),
        //         'liquid_success': require('../assets/sounds/liquid_success.wav'),
        //     };
        //     const { sound } = await Audio.Sound.createAsync(soundMap[name]);
        //     soundRef.current = sound;
        //     await sound.playAsync();
        // } catch (error) {
        //     console.warn('[SoundSystem] Error playing sound:', error);
        // }
    }, []);

    const stopSound = useCallback(async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;
        }
    }, []);

    return { playSound, stopSound };
}
