import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useApp } from '../AppContext';
import { ANALYSIS } from '../data';

export default function ResultScreen({ navigation }) {
  const { theme } = useApp();
  const [meal, setMeal] = useState('Lunch');
  const a = ANALYSIS;

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle={theme.bg === '#0A0A0A' ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero photo area */}
        <View style={styles.hero}>
          <View style={styles.heroInner}>
            <Text style={{ fontSize: 140, textAlign: 'center' }}>🥑</Text>
            <Text style={{ position: 'absolute', left: '15%', top: '60%', fontSize: 60 }}>🍞</Text>
            <Text style={{ position: 'absolute', right: '15%', top: '20%', fontSize: 56 }}>🍳</Text>

            {/* Close button */}
            <TouchableOpacity
              onPress={() => navigation.popToTop()}
              style={styles.closeBtn}
            >
              <Svg width={14} height={14} viewBox="0 0 16 16" fill="none">
                <Path d="M12 4L4 12M4 4l8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>

            {/* Confidence pill */}
            <View style={styles.confidencePill}>
              <View style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: '#7CFC00' }} />
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600', letterSpacing: 0.3 }}>
                {a.confidence}% match
              </Text>
            </View>
          </View>
        </View>

        {/* Title */}
        <View style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 6 }}>
          <Text style={{ fontSize: 11, color: theme.textDim, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase' }}>
            ✨ Detected
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginTop: 6 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: theme.text, letterSpacing: -0.6, lineHeight: 30, flex: 1 }}>
              {a.name}
            </Text>
            <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
              <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text, letterSpacing: -0.8, lineHeight: 30 }}>{a.kcal}</Text>
              <Text style={{ fontSize: 11, color: theme.textDim, fontWeight: '500', marginTop: 2 }}>kcal</Text>
            </View>
          </View>
        </View>

        {/* Macro chips */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 14, flexDirection: 'row', gap: 10 }}>
          {[
            { label: 'Protein', val: a.protein, c: theme.proteinClr },
            { label: 'Carbs', val: a.carbs, c: theme.carbsClr },
            { label: 'Fat', val: a.fat, c: theme.fatClr },
          ].map(m => (
            <View key={m.label} style={[styles.macroChip, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: m.c }} />
                <Text style={{ fontSize: 11, color: theme.textDim, fontWeight: '500' }}>{m.label}</Text>
              </View>
              <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text, letterSpacing: -0.4, marginTop: 4 }}>
                {m.val}<Text style={{ fontSize: 11, color: theme.textDim, fontWeight: '500' }}>g</Text>
              </Text>
            </View>
          ))}
        </View>

        {/* Ingredients */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: theme.textDim, letterSpacing: 0.2, marginBottom: 8, paddingHorizontal: 4 }}>
            INGREDIENTS · {a.items.length}
          </Text>
          <View style={[styles.ingredientCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            {a.items.map((it, i) => (
              <View key={it.name}>
                <View style={styles.ingredientRow}>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text }}>{it.name}</Text>
                    <Text style={{ fontSize: 12, color: theme.textFaint, marginTop: 1 }}>{it.weight}</Text>
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text, letterSpacing: -0.2 }}>
                    {it.kcal}<Text style={{ fontSize: 11, color: theme.textDim, fontWeight: '500' }}> kcal</Text>
                  </Text>
                </View>
                {i < a.items.length - 1 && <View style={{ height: 1, backgroundColor: theme.border }} />}
              </View>
            ))}
          </View>
        </View>

        {/* Meal selector */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: theme.textDim, letterSpacing: 0.2, marginBottom: 8, paddingHorizontal: 4 }}>
            ADD TO
          </Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map(m => (
              <TouchableOpacity
                key={m}
                onPress={() => setMeal(m)}
                style={[styles.mealBtn, {
                  backgroundColor: meal === m ? theme.accent : theme.surface,
                  borderColor: meal === m ? theme.accent : theme.border,
                }]}
              >
                <Text style={{ fontSize: 12, fontWeight: '600', color: meal === m ? '#fff' : theme.text, letterSpacing: 0.1 }}>
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.cta, { backgroundColor: theme.bg }]}>
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          style={[styles.editBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <Text style={{ color: theme.text, fontSize: 15, fontWeight: '600' }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.popToTop()}
          style={[styles.logBtn, { backgroundColor: theme.accent, shadowColor: theme.accent }]}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600', letterSpacing: 0.2 }}>
            Log to {meal} · {a.kcal} kcal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: 16, paddingTop: 16 },
  heroInner: {
    height: 280, borderRadius: 24, overflow: 'hidden',
    backgroundColor: '#D8CFC1',
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute', top: 12, right: 12,
    width: 32, height: 32, borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  confidencePill: {
    position: 'absolute', top: 12, left: 12,
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingVertical: 5, paddingHorizontal: 10, borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  macroChip: {
    flex: 1, borderRadius: 16, padding: 12, borderWidth: 1,
  },
  ingredientCard: {
    borderRadius: 18, borderWidth: 1, paddingHorizontal: 16,
  },
  ingredientRow: {
    paddingVertical: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  mealBtn: {
    flex: 1, paddingVertical: 10, paddingHorizontal: 4,
    borderRadius: 12, borderWidth: 1,
    alignItems: 'center',
  },
  cta: {
    position: 'absolute', bottom: 24, left: 24, right: 24,
    flexDirection: 'row', gap: 10,
  },
  editBtn: {
    paddingHorizontal: 20, height: 54, borderRadius: 16, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  logBtn: {
    flex: 1, height: 54, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
});
