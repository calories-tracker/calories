import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';
import { useApp } from '../AppContext';
import { HISTORY_DAYS } from '../data';

function MiniRing({ pct, over, theme, size = 44 }) {
  const r = 18, c = 2 * Math.PI * r;
  const dash = c * pct;
  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={theme.ringTrack} strokeWidth={4} fill="none" />
        <Circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={over ? theme.fatClr : theme.accent}
          strokeWidth={4} strokeLinecap="round" fill="none"
          strokeDasharray={`${dash} ${c}`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ fontSize: 11, fontWeight: '700', color: theme.text }}>{Math.round(pct * 100)}</Text>
      </View>
    </View>
  );
}

export default function DiaryScreen() {
  const { theme, goal } = useApp();
  const [expanded, setExpanded] = useState(1);
  const totalDays = HISTORY_DAYS.length;
  const avgKcal = Math.round(HISTORY_DAYS.reduce((a, d) => a + d.consumed, 0) / totalDays);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 18 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text, letterSpacing: -0.8 }}>Diary</Text>
        <Text style={{ fontSize: 13, color: theme.textDim, marginTop: 2 }}>
          {totalDays} days · 7-day average {avgKcal.toLocaleString()} kcal
        </Text>
      </View>

      <View style={{ paddingHorizontal: 16, gap: 10 }}>
        {HISTORY_DAYS.map((d, i) => {
          const effectiveGoal = d.goal || goal;
          const over = d.consumed > effectiveGoal;
          const pct = Math.min(1, d.consumed / effectiveGoal);
          const isOpen = expanded === i;

          return (
            <View key={i} style={[styles.dayCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <TouchableOpacity
                onPress={() => setExpanded(isOpen ? -1 : i)}
                style={styles.dayHeader}
                activeOpacity={0.7}
              >
                <MiniRing pct={pct} over={over} theme={theme} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: theme.text }}>{d.label}</Text>
                    <Text style={{ fontSize: 12, color: theme.textFaint }}>{d.date}</Text>
                  </View>
                  <Text style={{ fontSize: 13, color: theme.textDim, marginTop: 2 }}>
                    <Text style={{ color: over ? theme.fatClr : theme.text, fontWeight: '600' }}>
                      {d.consumed.toLocaleString()}
                    </Text>
                    {' / '}{effectiveGoal.toLocaleString()} kcal · {d.meals} meals
                  </Text>
                </View>
                <Svg width={16} height={16} viewBox="0 0 16 16"
                  style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
                >
                  <Path d="M4 6l4 4 4-4" stroke={theme.textDim} strokeWidth="1.6" strokeLinecap="round" fill="none" />
                </Svg>
              </TouchableOpacity>

              {isOpen && d.items?.length > 0 && (
                <View style={[styles.expanded, { borderTopColor: theme.border }]}>
                  {d.items.map((m, j) => (
                    <View key={j} style={styles.mealItem}>
                      <LinearGradient
                        colors={m.bg}
                        start={{ x: 0.2, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.mealThumb}
                      >
                        <Text style={{ fontSize: 18 }}>{m.emoji}</Text>
                      </LinearGradient>
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <Text numberOfLines={1} style={{ fontSize: 13, color: theme.text, fontWeight: '500' }}>{m.name}</Text>
                        <Text style={{ fontSize: 11, color: theme.textFaint, marginTop: 1 }}>{m.type} · {m.time}</Text>
                      </View>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text, letterSpacing: -0.2 }}>
                        {m.kcal}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dayCard: {
    borderRadius: 18, borderWidth: 1, overflow: 'hidden',
  },
  dayHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 14,
  },
  expanded: {
    paddingHorizontal: 16, paddingBottom: 12, borderTopWidth: 1,
  },
  mealItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10,
  },
  mealThumb: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
});
