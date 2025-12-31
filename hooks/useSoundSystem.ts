import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

// Map of sound keys to their source requires (or URIs if remote)
// For now we will use placeholders or try to use standard system sounds if possible,
// but typically these should be assets. We'll set up the structure.
const SOUND_MAP = {
    //     scan_hum: require('../assets/sounds/scan_hum.mp3'),   // Placeholder path
    //     lock_on: require('../assets/sounds/lock_on.wav'),     // Placeholder path
    //     success: require('../assets/sounds/liquid_success.wav'), // Placeholder path
    scan_hum: null,
    lock_on: null,
    success: null,
};

type SoundKey = keyof typeof SOUND_MAP;

export function useSoundSystem() {
    const sounds = useRef<Partial<Record<SoundKey, Audio.Sound>>>({});

    // Preload sounds
    useEffect(() => {
        async function loadSounds() {
            try {
                // In a real app with actual assets, we would load them here.
                // Since we might not have the files yet, this is defensive.
                // await Audio.setIsEnabledAsync(true);
                // 
                // for (const [key, source] of Object.entries(SOUND_MAP)) {
                //     const { sound } = await Audio.Sound.createAsync(source);
                //     sounds.current[key as SoundKey] = sound;
                // }
            } catch (error) {
                console.warn('Failed to load sounds', error);
            }
        }

        loadSounds();

        return () => {
            // Unload on unmount
            Object.values(sounds.current).forEach(sound => sound.unloadAsync());
        };
    }, []);

    const playSound = async (key: SoundKey) => {
        try {
            const sound = sounds.current[key];
            if (sound) {
                await sound.replayAsync();
            } else {
                // If creating completely dynamic, or just for mock purposes:
                console.log(`[SoundSystem] Playing: ${key}`);
            }
        } catch (error) {
            console.warn(`Failed to play sound ${key}`, error);
        }
    };

    const stopSound = async (key: SoundKey) => {
        try {
            const sound = sounds.current[key];
            if (sound) {
                await sound.stopAsync();
            }
        } catch (error) {
            console.warn(`Failed to stop sound ${key}`, error);
        }
    }

    return { playSound, stopSound };
}
