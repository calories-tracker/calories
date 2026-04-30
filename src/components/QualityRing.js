import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { qualityColor } from '../utils/quality';

export default function QualityRing({ value, theme, size = 64, stroke = 7 }) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const dash = C * (value / 100);
  const c = qualityColor(value);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={theme.ringTrack} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={c} strokeWidth={stroke} strokeLinecap="round" fill="none"
          strokeDasharray={`${dash} ${C}`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  value: { fontSize: 18, fontWeight: '700', letterSpacing: -0.4 },
});
