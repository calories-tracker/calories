import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useApp } from '../AppContext';
import QualityRing from '../components/QualityRing';
import { RANGE_DATA } from '../data';
import { qualityColor, qualityLabel } from '../utils/quality';

const RANGE_META = {
  week:  { title: 'Apr 24 – Apr 30', barGap: 6 },
  month: { title: 'April 2026', barGap: 2 },
  year:  { title: 'Last 12 months', barGap: 4 },
};

function MacroDonut({ theme }) {
  const segments = [
    { pct: 0.22, c: theme.proteinClr },
    { pct: 0.48, c: theme.carbsClr },
    { pct: 0.30, c: theme.fatClr },
  ];
  const r = 36, cx = 44, cy = 44, sw = 12;
  const C = 2 * Math.PI * r;
  let off = 0;
  return (
    <Svg width="88" height="88" style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle cx={cx} cy={cy} r={r} stroke={theme.ringTrack} strokeWidth={sw} fill="none" />
      {segments.map((s, i) => {
        const dash = C * s.pct - 2;
        const dashoffset = -off * C;
        off += s.pct;
        return (
          <Circle key={i} cx={cx} cy={cy} r={r}
            stroke={s.c} strokeWidth={sw} fill="none"
            strokeDasharray={`${dash} ${C - dash}`}
            strokeDashoffset={dashoffset}
          />
        );
      })}
    </Svg>
  );
}

function BarChart({ days, metric, goal, theme, barGap, range }) {
  const CHART_HEIGHT = 140;
  const max = metric === 'calories'
    ? Math.max(goal, ...days.map(d => d.consumed)) * 1.05
    : 100;
  const targetVal = metric === 'calories' ? goal : 75;
  const targetPct = (targetVal / max) * 100;

  const showLabel = (i) => {
    if (range === 'month') return i === 0 || (i + 1) % 5 === 0 || i === days.length - 1;
    return true;
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text }}>
          {metric === 'calories' ? 'Daily calories' : 'Daily quality score'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 10, height: 2, backgroundColor: theme.textFaint, borderRadius: 1 }} />
          <Text style={{ fontSize: 11, color: theme.textDim }}>
            {metric === 'calories' ? `Goal ${goal.toLocaleString()}` : 'Target 75'}
          </Text>
        </View>
      </View>

      {/* Chart bars */}
      <View style={{ height: CHART_HEIGHT, position: 'relative' }}>
        {/* Goal line */}
        <View style={{
          position: 'absolute',
          left: 0, right: 0,
          bottom: `${targetPct}%`,
          height: 1,
          borderStyle: 'dashed',
          borderTopWidth: 1,
          borderColor: theme.border,
        }} />
        {/* Bars */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: '100%', gap: barGap }}>
          {days.map((d, i) => {
            const v = metric === 'calories' ? d.consumed : d.quality;
            const h = (v / max) * 100;
            const over = metric === 'calories' && d.consumed > goal;
            const color = metric === 'calories'
              ? (over ? theme.fatClr : theme.accent)
              : qualityColor(d.quality);
            return (
              <View key={i} style={{ flex: 1, justifyContent: 'flex-end', height: '100%' }}>
                <View style={{
                  width: '100%',
                  height: `${h}%`,
                  backgroundColor: color,
                  borderRadius: range === 'month' ? 2 : 5,
                  minHeight: 3,
                  opacity: i === days.length - 1 ? 1 : 0.88,
                }} />
              </View>
            );
          })}
        </View>
      </View>

      {/* Labels */}
      <View style={{ flexDirection: 'row', gap: barGap, marginTop: 8 }}>
        {days.map((d, i) => (
          <Text key={i} style={{
            flex: 1,
            fontSize: 10, color: theme.textDim, textAlign: 'center', fontWeight: '500',
            opacity: showLabel(i) ? 1 : 0,
          }}>
            {d.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default function TrendsScreen() {
  const { theme, goal } = useApp();
  const [range, setRange] = useState('week');
  const [metric, setMetric] = useState('calories');
  const days = RANGE_DATA[range];
  const meta = RANGE_META[range];

  const avg = Math.round(days.reduce((a, d) => a + d.consumed, 0) / days.length);
  const avgQuality = Math.round(days.reduce((a, d) => a + d.quality, 0) / days.length);
  const onGoalCount = days.filter(d => d.consumed <= goal).length;
  const goalPct = Math.round((onGoalCount / days.length) * 100);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 18 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text, letterSpacing: -0.8 }}>Trends</Text>
        <Text style={{ fontSize: 13, color: theme.textDim, marginTop: 2 }}>{meta.title}</Text>
      </View>

      {/* Range pills */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 14 }}>
        <View style={[styles.segControl, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
          {[{ id: 'week', label: 'Week' }, { id: 'month', label: 'Month' }, { id: 'year', label: 'Year' }].map(r => (
            <TouchableOpacity
              key={r.id}
              onPress={() => setRange(r.id)}
              style={[styles.segBtn, {
                backgroundColor: range === r.id ? theme.surface : 'transparent',
                shadowOpacity: range === r.id ? 0.06 : 0,
              }]}
            >
              <Text style={{ fontSize: 13, fontWeight: '600', color: range === r.id ? theme.text : theme.textDim }}>
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stat cards */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 14, flexDirection: 'row', gap: 10 }}>
        <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={{ fontSize: 12, color: theme.textDim, fontWeight: '500' }}>Avg / day</Text>
          <Text style={{ fontSize: 26, fontWeight: '700', color: theme.text, letterSpacing: -0.8, marginTop: 2 }}>
            {avg.toLocaleString()}
          </Text>
          <Text style={{ fontSize: 11, color: theme.textFaint, marginTop: 1 }}>kcal</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={{ fontSize: 12, color: theme.textDim, fontWeight: '500' }}>On goal</Text>
          <Text style={{ fontSize: 26, fontWeight: '700', color: theme.text, letterSpacing: -0.8, marginTop: 2 }}>
            {goalPct}%
          </Text>
          <Text style={{ fontSize: 11, color: theme.textFaint, marginTop: 1 }}>{onGoalCount} of {days.length} days</Text>
        </View>
      </View>

      {/* Quality hero card */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 18 }}>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <QualityRing value={avgQuality} theme={theme} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontSize: 12, color: theme.textDim, fontWeight: '500', letterSpacing: 0.2 }}>Avg food quality</Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginTop: 2 }}>
                <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text, letterSpacing: -0.8 }}>{avgQuality}</Text>
                <Text style={{ fontSize: 13, color: theme.textDim, fontWeight: '500', paddingBottom: 2 }}>/ 100</Text>
              </View>
              <View style={[styles.qualityPill, { backgroundColor: qualityColor(avgQuality) + '22' }]}>
                <View style={{ width: 5, height: 5, borderRadius: 999, backgroundColor: qualityColor(avgQuality) }} />
                <Text style={{ fontSize: 11, fontWeight: '600', color: qualityColor(avgQuality), letterSpacing: 0.2 }}>
                  {qualityLabel(avgQuality)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Metric toggle */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 12, flexDirection: 'row', gap: 6 }}>
        {[{ id: 'calories', label: 'Calories' }, { id: 'quality', label: 'Quality' }].map(m => (
          <TouchableOpacity
            key={m.id}
            onPress={() => setMetric(m.id)}
            style={[styles.metricBtn, {
              backgroundColor: metric === m.id ? theme.text : 'transparent',
              borderColor: metric === m.id ? theme.text : theme.border,
            }]}
          >
            <Text style={{ fontSize: 12, fontWeight: '600', color: metric === m.id ? theme.bg : theme.textDim }}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bar chart */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 22 }}>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <BarChart
            days={days} metric={metric} goal={goal} theme={theme}
            barGap={meta.barGap} range={range}
          />
        </View>
      </View>

      {/* Macro split */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border, flexDirection: 'row', alignItems: 'center', gap: 18 }]}>
          <MacroDonut theme={theme} />
          <View style={{ flex: 1, gap: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text, marginBottom: 2 }}>Macro split</Text>
            {[
              { label: 'Protein', pct: 22, c: theme.proteinClr },
              { label: 'Carbs', pct: 48, c: theme.carbsClr },
              { label: 'Fat', pct: 30, c: theme.fatClr },
            ].map(m => (
              <View key={m.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: m.c }} />
                <Text style={{ fontSize: 13, color: theme.text, flex: 1 }}>{m.label}</Text>
                <Text style={{ fontSize: 13, color: theme.textDim, fontWeight: '600' }}>{m.pct}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  segControl: {
    flexDirection: 'row', gap: 4, padding: 4,
    borderRadius: 12, borderWidth: 1,
  },
  segBtn: {
    flex: 1, paddingVertical: 7, borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, elevation: 1,
  },
  statCard: {
    flex: 1, padding: 14, borderRadius: 18, borderWidth: 1,
  },
  card: { borderRadius: 22, padding: 18, borderWidth: 1 },
  qualityPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    marginTop: 6, paddingVertical: 3, paddingHorizontal: 9,
    borderRadius: 999, alignSelf: 'flex-start',
  },
  metricBtn: {
    paddingVertical: 6, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1,
  },
});
