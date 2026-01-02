import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
    hasSeenOnboarding: boolean;
    userRole: 'reporter' | 'guardian' | 'provider' | null;
    setHasSeenOnboarding: (value: boolean) => void;
    setUserRole: (role: 'reporter' | 'guardian' | 'provider' | null) => void;
    resetState: () => void;
}

export const useAppState = create<AppState>()(
    persist(
        (set) => ({
            hasSeenOnboarding: false,
            userRole: null,
            setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),
            setUserRole: (role) => set({ userRole: role }),
            resetState: () => set({ hasSeenOnboarding: false, userRole: null }),
        }),
        {
            name: 'alfred-app-state',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
