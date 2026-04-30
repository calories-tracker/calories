import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useApp } from '../AppContext';

function Row({ icon, label, value, onPress, danger, last, theme }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.row, { borderBottomWidth: last ? 0 : 1, borderBottomColor: theme.border }]}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.rowIcon, { backgroundColor: theme.surfaceAlt }]}>
        <Text style={{ fontSize: 16 }}>{icon}</Text>
      </View>
      <Text style={[styles.rowLabel, { color: danger ? theme.fatClr : theme.text }]}>{label}</Text>
      {value && <Text style={{ fontSize: 13, color: theme.textDim }}>{value}</Text>}
      {onPress && (
        <Svg width={14} height={14} viewBox="0 0 16 16">
          <Path d="M6 4l4 4-4 4" stroke={theme.textFaint} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </Svg>
      )}
    </TouchableOpacity>
  );
}

function Section({ label, children, theme }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={[styles.sectionLabel, { color: theme.textDim }]}>{label.toUpperCase()}</Text>
      <View style={[styles.sectionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        {children}
      </View>
    </View>
  );
}

export default function ProfileScreen({ onEditGoal }) {
  const { theme, userName, goal, dark, setDark } = useApp();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 22 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: theme.text, letterSpacing: -0.8 }}>Profile</Text>
      </View>

      {/* Avatar card */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 22 }}>
        <View style={[styles.avatarCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <LinearGradient
            colors={[theme.accent, theme.proteinClr]}
            style={styles.avatar}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 26 }}>
              {userName.slice(0, 1).toUpperCase()}
            </Text>
          </LinearGradient>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text, letterSpacing: -0.4 }}>{userName}</Text>
            <Text style={{ fontSize: 13, color: theme.textDim, marginTop: 2 }}>Member since Jan 2026</Text>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
              <Text style={{ fontSize: 12, color: theme.textDim }}>
                <Text style={{ color: theme.text, fontWeight: '700' }}>12</Text> day streak
              </Text>
              <Text style={{ fontSize: 12, color: theme.textDim }}>
                <Text style={{ color: theme.text, fontWeight: '700' }}>148</Text> meals logged
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Section label="Goals" theme={theme}>
        <Row icon="🎯" label="Daily calorie goal" value={`${goal.toLocaleString()} kcal`} onPress={onEditGoal} theme={theme} />
        <Row icon="🥩" label="Protein target" value="140g" onPress={() => {}} theme={theme} />
        <Row icon="⚖️" label="Weight goal" value="−4.5 kg" onPress={() => {}} theme={theme} last />
      </Section>

      <Section label="Preferences" theme={theme}>
        <Row icon={dark ? '🌙' : '☀️'} label="Dark mode" value={dark ? 'On' : 'Off'} onPress={() => setDark(!dark)} theme={theme} />
        <Row icon="🔔" label="Notifications" value="3 enabled" onPress={() => {}} theme={theme} />
        <Row icon="🔗" label="Apple Health" value="Connected" onPress={() => {}} theme={theme} last />
      </Section>

      <Section label="About" theme={theme}>
        <Row icon="❤️" label="Rate the app" onPress={() => {}} theme={theme} />
        <Row icon="📄" label="Privacy" onPress={() => {}} theme={theme} />
        <Row icon="🚪" label="Sign out" onPress={() => {}} danger theme={theme} last />
      </Section>

      <Text style={{ textAlign: 'center', fontSize: 11, color: theme.textFaint, paddingBottom: 4 }}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 11, fontWeight: '600', letterSpacing: 0.6,
    paddingHorizontal: 20, paddingBottom: 8,
  },
  sectionCard: {
    marginHorizontal: 16, borderRadius: 18, borderWidth: 1, overflow: 'hidden',
  },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 14, paddingHorizontal: 16,
  },
  rowIcon: {
    width: 32, height: 32, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: '500' },
  avatarCard: {
    borderRadius: 22, padding: 22, borderWidth: 1,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  avatar: {
    width: 64, height: 64, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
});
