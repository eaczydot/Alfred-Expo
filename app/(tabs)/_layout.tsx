import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { CircleFadingArrowUp, Scan, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BLUR, COLORS } from '../../constants/design-tokens';

// Custom Tab Bar Background
const GlassTabBarBackground = () => {
  return (
    <View style={styles.tabBarBackgroundContainer}>
      <BlurView
        intensity={BLUR.intensities.panel_overlay}
        style={StyleSheet.absoluteFill}
        tint="dark"
      />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <GlassTabBarBackground />,
        tabBarActiveTintColor: COLORS.accents_liquid.azure_primary,
        tabBarInactiveTintColor: COLORS.accents_liquid.ghost_text,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <CircleFadingArrowUp size={24} color={color} strokeWidth={focused ? 2.5 : 1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Lens',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.scanButton, focused && styles.scanButtonFocused]}>
              <Scan size={28} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="impact"
        options={{
          title: 'Impact',
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} strokeWidth={focused ? 2.5 : 1.5} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabBarBackgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35,
    overflow: 'hidden',
  },
  scanButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    // backgroundColor: 'rgba(255,255,255,0.1)', // Optional highlight
  },
  scanButtonFocused: {
    backgroundColor: COLORS.accents_liquid.azure_primary,
    shadowColor: COLORS.accents_liquid.azure_primary,
    shadowOpacity: 0.6,
    shadowRadius: 15,
    transform: [{ translateY: -15 }], // Pop out effect
  }
});
