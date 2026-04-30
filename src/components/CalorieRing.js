import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { qualityColor, qualityLabel } from '../utils/quality';

export default function CalorieRing({ consumed, goal, theme, quality, size = 220, stroke = 14 }) {
  const remaining = goal - consumed;
  const over = consumed > goal;
  const pct = over ? 1 : Math.min(1, consumed / goal);
  const overPct = over ? Math.min(1, (consumed - goal) / goal) : 0;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  const overDash = c * overPct;
  const ringColor = over ? theme.fatClr : theme.accent;
  const qc = quality != null ? qualityColor(quality) : null;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={theme.ringTrack} strokeWidth={stroke} fill="none"
        />
        <Circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={ringColor} strokeWidth={stroke} strokeLinecap="round" fill="none"
          strokeDasharray={`${dash} ${c}`}
        />
        {over && (
          <Circle
            cx={size / 2} cy={size / 2} r={r}
            stroke={theme.fatClr} strokeWidth={stroke + 2} strokeLinecap="round" fill="none"
            strokeDasharray={`${overDash} ${c}`}
            opacity={0.55}
          />
        )}
      </Svg>

      <View style={[StyleSheet.absoluteFill, styles.center]} pointerEvents="none">
        <Text style={[styles.label, { color: over ? theme.fatClr : theme.textDim }]}>
          {over ? 'over by' : 'remaining'}
        </Text>
        <Text style={[styles.bigNum, { color: over ? theme.fatClr : theme.text }]}>
          {Math.abs(remaining).toLocaleString()}
        </Text>
        <Text style={[styles.sub, { color: theme.textDim }]}>
          <Text style={{ color: theme.text, fontWeight: '600' }}>{consumed.toLocaleString()}</Text>
          {' / '}{goal.toLocaleString()} kcal
        </Text>
        {quality != null && (
          <View style={[styles.qualityPill, { backgroundColor: qc + '1F' }]}>
            <View style={[styles.qualityDot, { backgroundColor: qc }]}>
              <Text style={styles.qualityNum}>{quality}</Text>
            </View>
            <Text style={[styles.qualityLabel, { color: qc }]}>calories quality</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    letterSpacing: 0.2,
    marginBottom: 2,
    fontWeight: '500',
  },
  bigNum: {
    fontSize: 52,
    fontWeight: '700',
    letterSpacing: -2,
    lineHeight: 56,
  },
  sub: {
    fontSize: 13,
    letterSpacing: 0.4,
    marginTop: 6,
  },
  qualityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
    paddingVertical: 3,
    paddingLeft: 4,
    paddingRight: 9,
    borderRadius: 999,
  },
  qualityDot: {
    minWidth: 18,
    height: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  qualityNum: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.2,
  },
  qualityLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
