/**
 * Alfred Design Tokens
 * Aesthetic Target: Liquid Glassmorphism
 */

export const COLORS = {
    foundations: {
        void: "#000000",
        deep_sludge: "#0A0A0C",
        glass_border: "rgba(255, 255, 255, 0.12)",
        glass_shine: "rgba(255, 255, 255, 0.08)",
    },
    accents_liquid: {
        azure_primary: "rgba(56, 189, 248, 0.9)",
        azure_glow: "rgba(56, 189, 248, 0.4)",
        emerald_resolution: "rgba(52, 211, 153, 0.8)",
        amber_alert: "rgba(251, 191, 36, 0.8)",
        pearl_text: "rgba(255, 255, 255, 0.92)",
        ghost_text: "rgba(255, 255, 255, 0.45)",
    },
} as const;

export const TYPOGRAPHY = {
    families: {
        primary: "Inter-Tight_500Medium",
        display: "Inter-Tight_800ExtraBold",
        mono: "JetBrainsMono_400Regular",
    },
    styles: {
        impact_score_display: {
            fontSize: 42,
            lineHeight: 48,
            letterSpacing: -1.5,
            color: "white",
            textShadowColor: "rgba(56, 189, 248, 0.5)",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 20,
        },
        lens_hud_label: {
            fontSize: 12,
            fontFamily: "JetBrainsMono_400Regular",
            textTransform: "uppercase" as const,
            letterSpacing: 1.2,
            color: "rgba(255,255,255,0.8)",
        },
    },
} as const;

export const PHYSICS = {
    springs: {
        liquid_open: {
            damping: 15,
            mass: 1,
            stiffness: 120,
        },
        glass_tap: {
            damping: 10,
            mass: 0.5,
            stiffness: 300,
        },
    },
} as const;

export const BLUR = {
    intensities: {
        panel_thin: 20,
        panel_thick: 50,
        panel_overlay: 80,
    },
} as const;
