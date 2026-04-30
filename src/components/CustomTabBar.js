import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

function HomeIcon({ color, filled }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <Path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z"
        stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
    </Svg>
  );
}

function ListIcon({ color }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"
        stroke={color} strokeWidth={1.7} strokeLinecap="round" />
    </Svg>
  );
}

function ChartIcon({ color }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M4 19V9m6 10V5m6 14v-7m6 7H2" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
    </Svg>
  );
}

function ProfileIcon({ color, filled }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={1.7} />
      <Path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
    </Svg>
  );
}

function CameraIcon() {
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
      <Path d="M3 8a2 2 0 012-2h2.5l1.5-2h6l1.5 2H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
        stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" />
      <Circle cx="12" cy="13" r="3.5" stroke="#fff" strokeWidth={1.8} />
    </Svg>
  );
}

export default function CustomTabBar({ state, navigation, theme, onCameraPress }) {
  const tabs = [
    { key: 'home',    icon: (active) => <HomeIcon color={active ? theme.tabIconActive : theme.tabIcon} filled={active} /> },
    { key: 'diary',   icon: (active) => <ListIcon color={active ? theme.tabIconActive : theme.tabIcon} /> },
    null, // camera placeholder
    { key: 'trends',  icon: (active) => <ChartIcon color={active ? theme.tabIconActive : theme.tabIcon} /> },
    { key: 'profile', icon: (active) => <ProfileIcon color={active ? theme.tabIconActive : theme.tabIcon} filled={active} /> },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={[styles.bar, {
        backgroundColor: theme.tabBarBg,
        borderColor: theme.tabBarBorder,
      }]}>
        {tabs.map((tab, idx) => {
          if (tab === null) {
            // Center camera button
            return (
              <View key="camera" style={styles.cameraWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    onCameraPress();
                  }}
                  style={[styles.cameraBtn, { backgroundColor: theme.accent }]}
                  activeOpacity={0.85}
                >
                  <CameraIcon />
                </TouchableOpacity>
              </View>
            );
          }

          const routeIndex = state.routes.findIndex(r => r.name === tab.key);
          const active = state.index === routeIndex;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => {
                if (!active) Haptics.selectionAsync();
                const event = navigation.emit({ type: 'tabPress', target: state.routes[routeIndex].key, canPreventDefault: true });
                if (!active && !event.defaultPrevented) {
                  navigation.navigate(state.routes[routeIndex].name);
                }
              }}
              activeOpacity={0.7}
            >
              {tab.icon(active)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 22,
  },
  bar: {
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBtn: {
    width: 56,
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // floats above bar
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
});
