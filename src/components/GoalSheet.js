import React, { useState } from 'react';
import {
  Modal, View, Text, TouchableOpacity, TextInput,
  Pressable, StyleSheet, ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const PRESETS = [1500, 1800, 2000, 2200, 2500, 2800];
const MIN = 1000;
const MAX = 4000;

export default function GoalSheet({ visible, currentGoal, onClose, onSave, theme }) {
  const [val, setVal] = useState(currentGoal);

  const adjust = (delta) => setVal(v => Math.max(MIN, Math.min(MAX, v + delta)));

  const handleSave = () => {
    onSave(val);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable style={styles.scrim} onPress={onClose} />
        <View style={[styles.sheet, { backgroundColor: theme.surface }]}>
          {/* Handle */}
          <View style={[styles.handle, { backgroundColor: theme.border }]} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Daily calorie goal</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.cancel, { color: theme.textDim }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.subtitle, { color: theme.textDim }]}>
            Set the target you want to hit each day.
          </Text>

          {/* Stepper */}
          <View style={styles.stepper}>
            <TouchableOpacity onPress={() => adjust(-50)} style={[styles.stepBtn, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
              <Svg width={18} height={18} viewBox="0 0 16 16">
                <Path d="M3 8h10" stroke={theme.text} strokeWidth="2" strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>

            <View style={styles.valBox}>
              <Text style={[styles.valText, { color: theme.text }]}>{val.toLocaleString()}</Text>
              <Text style={[styles.valUnit, { color: theme.textDim }]}>KCAL / DAY</Text>
            </View>

            <TouchableOpacity onPress={() => adjust(50)} style={[styles.stepBtn, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
              <Svg width={18} height={18} viewBox="0 0 16 16">
                <Path d="M8 3v10M3 8h10" stroke={theme.text} strokeWidth="2" strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Slider bar (visual only with touch areas) */}
          <View style={styles.sliderArea}>
            <View style={[styles.sliderTrack, { backgroundColor: theme.ringTrack }]}>
              <View style={[styles.sliderFill, {
                width: `${((val - MIN) / (MAX - MIN)) * 100}%`,
                backgroundColor: theme.accent,
              }]} />
            </View>
            <View style={styles.sliderLabels}>
              <Text style={[styles.sliderLabel, { color: theme.textFaint }]}>{MIN.toLocaleString()}</Text>
              <Text style={[styles.sliderLabel, { color: theme.textFaint }]}>{MAX.toLocaleString()}</Text>
            </View>
            {/* Tap zones for coarse adjustment */}
            <View style={styles.tapRow}>
              {[...Array(10)].map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={{ flex: 1 }}
                  onPress={() => setVal(Math.round((MIN + (MAX - MIN) * ((i + 0.5) / 10)) / 50) * 50)}
                />
              ))}
            </View>
          </View>

          {/* Presets */}
          <Text style={[styles.presetsLabel, { color: theme.textDim }]}>QUICK PRESETS</Text>
          <View style={styles.presetsRow}>
            {PRESETS.map(p => (
              <TouchableOpacity
                key={p}
                onPress={() => setVal(p)}
                style={[styles.preset, {
                  backgroundColor: val === p ? theme.accent : theme.surfaceAlt,
                  borderColor: val === p ? theme.accent : theme.border,
                }]}
              >
                <Text style={[styles.presetText, { color: val === p ? '#fff' : theme.text }]}>
                  {p.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Save */}
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.saveBtn, { backgroundColor: theme.accent }]}
          >
            <Text style={styles.saveBtnText}>Save goal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 36, height: 5, borderRadius: 999,
    alignSelf: 'center', marginBottom: 18,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'baseline', marginBottom: 4,
  },
  title: { fontSize: 20, fontWeight: '700', letterSpacing: -0.4 },
  cancel: { fontSize: 14, fontWeight: '500' },
  subtitle: { fontSize: 13, marginBottom: 24 },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18, marginBottom: 22 },
  stepBtn: {
    width: 44, height: 44, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1,
  },
  valBox: { alignItems: 'center', minWidth: 140 },
  valText: { fontSize: 54, fontWeight: '700', letterSpacing: -2.4, lineHeight: 58 },
  valUnit: { fontSize: 12, fontWeight: '500', letterSpacing: 0.6, marginTop: 4 },
  sliderArea: { marginBottom: 22, position: 'relative' },
  sliderTrack: { height: 4, borderRadius: 2, overflow: 'hidden' },
  sliderFill: { height: '100%', borderRadius: 2 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  sliderLabel: { fontSize: 11, fontWeight: '500' },
  tapRow: {
    position: 'absolute', top: -10, left: 0, right: 0, height: 24,
    flexDirection: 'row',
  },
  presetsLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 0.6, marginBottom: 8 },
  presetsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 24 },
  preset: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 999, borderWidth: 1,
  },
  presetText: { fontSize: 13, fontWeight: '600' },
  saveBtn: {
    height: 54, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '600', letterSpacing: 0.2 },
});
