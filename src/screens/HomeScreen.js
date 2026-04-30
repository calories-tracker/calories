import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useApp } from '../AppContext';
import CalorieRing from '../components/CalorieRing';
import QualityRing from '../components/QualityRing';
import { TODAY } from '../data';
import { qualityColor, qualityLabel } from '../utils/quality';

function MacroBar({ label, value, goal, color, theme }) {
  const pct = Math.min(1, value / goal);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6 }}>
        <Text style={{ fontSize: 12, color: theme.textDim, fontWeight: '500' }}>{label}</Text>
        <Text style={{ fontSize: 11, color: theme.textFaint }}>{goal}g</Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: theme.text, letterSpacing: -0.4, marginBottom: 6 }}>
        {value}<Text style={{ fontSize: 12, color: theme.textDim, fontWeight: '500' }}>g</Text>
      </Text>
      <View style={{ height: 4, borderRadius: 2, backgroundColor: theme.ringTrack, overflow: 'hidden' }}>
        <View style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: color, borderRadius: 2 }} />
      </View>
    </View>
  );
}

function MealRow({ meal, theme }) {
  const qc = meal.quality != null ? qualityColor(meal.quality) : null;
  return (
    <View style={styles.mealRow}>
      <View style={{ position: 'relative', flexShrink: 0 }}>
        <LinearGradient
          colors={meal.bg}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mealThumb}
        >
          <Text style={{ fontSize: 22 }}>{meal.emoji}</Text>
        </LinearGradient>
        {meal.quality != null && (
          <View style={[styles.qualityBadge, { backgroundColor: qc, borderColor: theme.surface }]}>
            <Text style={styles.qualityBadgeText}>{meal.quality}</Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 11, color: theme.textDim, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.6 }}>
            {meal.type}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '600', color: theme.text, letterSpacing: -0.2 }}>
            {meal.kcal}<Text style={{ fontSize: 11, color: theme.textDim, fontWeight: '500' }}> kcal</Text>
          </Text>
        </View>
        <Text numberOfLines={1} style={{ fontSize: 14, color: theme.text, fontWeight: '500', marginTop: 2 }}>
          {meal.name}
        </Text>
        <Text style={{ fontSize: 11, color: theme.textFaint, marginTop: 1 }}>{meal.time}</Text>
      </View>
    </View>
  );
}

function ActivityCard({ theme, burned, activities }) {
  return (
    <View style={[styles.card, { borderColor: theme.border, backgroundColor: theme.surface }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontSize: 14 }}>🔥</Text>
            <Text style={{ fontSize: 12, color: theme.textDim, fontWeight: '500' }}>Calories burned</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginTop: 4 }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text, letterSpacing: -0.8, lineHeight: 32 }}>
              {burned}
            </Text>
            <Text style={{ fontSize: 13, color: theme.textDim, fontWeight: '500', paddingBottom: 2 }}>kcal · today</Text>
          </View>
        </View>
        <View style={[styles.healthBadge, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
          <Text style={{ fontSize: 10 }}>❤️</Text>
          <Text style={{ fontSize: 10, color: theme.textDim, fontWeight: '600', letterSpacing: 0.4 }}>HEALTH</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {activities.map(a => (
          <View key={a.id} style={[styles.activityTile, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
            <Text style={{ fontSize: 18, lineHeight: 22 }}>{a.emoji}</Text>
            <Text style={{ fontSize: 11, color: theme.textDim, fontWeight: '500', marginTop: 2 }}>{a.type}</Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: theme.text, letterSpacing: -0.3 }}>
              {a.kcal}<Text style={{ fontSize: 10, color: theme.textFaint, fontWeight: '500' }}> kcal</Text>
            </Text>
            <Text style={{ fontSize: 10, color: theme.textFaint }}>{a.duration}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function FoodQualityCard({ meals, theme }) {
  const avg = Math.round(meals.reduce((a, m) => a + (m.quality || 0), 0) / meals.length);
  const c = qualityColor(avg);
  const sorted = [...meals].sort((a, b) => b.quality - a.quality);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  return (
    <View style={[styles.card, { borderColor: theme.border, backgroundColor: theme.surface }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <QualityRing value={avg} theme={theme} size={68} stroke={7} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontSize: 12, color: theme.textDim, fontWeight: '500', letterSpacing: 0.2 }}>Avg food quality</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginTop: 2 }}>
            <Text style={{ fontSize: 26, fontWeight: '700', color: theme.text, letterSpacing: -0.8 }}>{avg}</Text>
            <Text style={{ fontSize: 12, color: theme.textDim, fontWeight: '500', paddingBottom: 2 }}>/ 100</Text>
          </View>
          <View style={[styles.qualityPill, { backgroundColor: c + '22' }]}>
            <View style={{ width: 5, height: 5, borderRadius: 999, backgroundColor: c }} />
            <Text style={{ fontSize: 11, fontWeight: '600', color: c, letterSpacing: 0.2 }}>{qualityLabel(avg)}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.qualityBottom, { borderTopColor: theme.border }]}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontSize: 10, color: theme.textFaint, fontWeight: '600', letterSpacing: 0.6 }}>BEST</Text>
          <Text numberOfLines={1} style={{ fontSize: 12, color: theme.text, fontWeight: '500', marginTop: 2 }}>
            {best.emoji} {best.name}
          </Text>
        </View>
        <View style={{ width: 1, backgroundColor: theme.border }} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontSize: 10, color: theme.textFaint, fontWeight: '600', letterSpacing: 0.6 }}>NEEDS WORK</Text>
          <Text numberOfLines={1} style={{ fontSize: 12, color: theme.text, fontWeight: '500', marginTop: 2 }}>
            {worst.emoji} {worst.name}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen({ onEditGoal }) {
  const { theme, userName, goal } = useApp();
  const t = TODAY;
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const avgQuality = Math.round(t.meals.reduce((a, m) => a + (m.quality || 0), 0) / t.meals.length);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 13, color: theme.textDim, letterSpacing: 0.2, fontWeight: '500' }}>{date}</Text>
          <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text, letterSpacing: -0.8, marginTop: 2 }}>
            Hey, {userName} 👋
          </Text>
        </View>
        <View style={[styles.avatar, { background: undefined }]}>
          <LinearGradient
            colors={[theme.accent, theme.proteinClr]}
            style={styles.avatar}
          >
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>
              {userName.slice(0, 1).toUpperCase()}
            </Text>
          </LinearGradient>
        </View>
      </View>

      {/* Streak */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 18 }}>
        <View style={[styles.streakPill, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
          <Text style={{ fontSize: 14 }}>🔥</Text>
          <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text, letterSpacing: 0.1 }}>
            {t.streak} day streak
          </Text>
        </View>
      </View>

      {/* Calorie Ring */}
      <View style={{ alignItems: 'center', paddingBottom: 24, gap: 14 }}>
        <CalorieRing consumed={t.consumed} goal={goal} theme={theme} quality={avgQuality} />
        <TouchableOpacity
          onPress={onEditGoal}
          style={[styles.goalPill, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <Svg width={12} height={12} viewBox="0 0 16 16" fill="none">
            <Path d="M2 11.5V14h2.5L13 5.5 10.5 3 2 11.5z" stroke={theme.text} strokeWidth="1.5" strokeLinejoin="round" />
          </Svg>
          <Text style={{ fontSize: 12, fontWeight: '600', color: theme.text, letterSpacing: 0.2 }}>
            Goal · {goal.toLocaleString()} kcal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Macros */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 20 }}>
        <View style={[styles.macroCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <MacroBar label="Protein" value={t.protein.g} goal={t.protein.goal} color={theme.proteinClr} theme={theme} />
          <View style={{ width: 1, backgroundColor: theme.border }} />
          <MacroBar label="Carbs" value={t.carbs.g} goal={t.carbs.goal} color={theme.carbsClr} theme={theme} />
          <View style={{ width: 1, backgroundColor: theme.border }} />
          <MacroBar label="Fat" value={t.fat.g} goal={t.fat.goal} color={theme.fatClr} theme={theme} />
        </View>
      </View>

      {/* Activity */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 12 }}>
        <ActivityCard theme={theme} burned={t.caloriesBurned} activities={t.activities} />
      </View>

      {/* Food Quality */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <FoodQualityCard meals={t.meals} theme={theme} />
      </View>

      {/* Today's Meals */}
      <View style={{ paddingHorizontal: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text, letterSpacing: -0.4 }}>Today's meals</Text>
          <Text style={{ fontSize: 13, color: theme.accent, fontWeight: '600' }}>See all</Text>
        </View>
        <View style={[styles.mealsCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          {t.meals.map((m, i) => (
            <View key={m.id}>
              <MealRow meal={m} theme={theme} />
              {i < t.meals.length - 1 && (
                <View style={{ height: 1, backgroundColor: theme.border, marginLeft: 56 }} />
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24, paddingTop: 8, paddingBottom: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  avatar: {
    width: 40, height: 40, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
  },
  streakPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 5, paddingHorizontal: 12, borderRadius: 999,
    borderWidth: 1, alignSelf: 'flex-start',
  },
  goalPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 7, paddingHorizontal: 14, borderRadius: 999,
    borderWidth: 1,
  },
  card: {
    borderRadius: 22, padding: 18, borderWidth: 1,
  },
  macroCard: {
    borderRadius: 22, padding: 18, borderWidth: 1,
    flexDirection: 'row', gap: 16,
  },
  healthBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999,
    borderWidth: 1,
  },
  activityTile: {
    flex: 1, padding: 10, borderRadius: 12, borderWidth: 1,
    alignItems: 'flex-start', gap: 2,
  },
  qualityPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    marginTop: 6, paddingVertical: 3, paddingHorizontal: 9,
    borderRadius: 999, alignSelf: 'flex-start',
  },
  qualityBottom: {
    flexDirection: 'row', gap: 12, marginTop: 14,
    paddingTop: 14, borderTopWidth: 1,
  },
  qualityBadge: {
    position: 'absolute', bottom: -3, right: -3,
    minWidth: 20, height: 20, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, paddingHorizontal: 4,
  },
  qualityBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff', letterSpacing: -0.2 },
  mealRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, paddingHorizontal: 4,
  },
  mealThumb: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  mealsCard: { borderRadius: 22, paddingVertical: 4, paddingHorizontal: 16, borderWidth: 1 },
});
