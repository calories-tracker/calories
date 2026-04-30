import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
  StatusBar, Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Svg, { Path, Circle } from 'react-native-svg';
import { useApp } from '../AppContext';

function CornerBracket({ position, accentColor }) {
  const size = 36;
  const thickness = 3;
  const r = 14;
  const borderStyle = {};
  if (position === 'tl') { borderStyle.borderTopWidth = thickness; borderStyle.borderLeftWidth = thickness; borderStyle.borderTopLeftRadius = r; }
  if (position === 'tr') { borderStyle.borderTopWidth = thickness; borderStyle.borderRightWidth = thickness; borderStyle.borderTopRightRadius = r; }
  if (position === 'bl') { borderStyle.borderBottomWidth = thickness; borderStyle.borderLeftWidth = thickness; borderStyle.borderBottomLeftRadius = r; }
  if (position === 'br') { borderStyle.borderBottomWidth = thickness; borderStyle.borderRightWidth = thickness; borderStyle.borderBottomRightRadius = r; }

  const pos = {};
  if (position.includes('t')) pos.top = 0;
  if (position.includes('b')) pos.bottom = 0;
  if (position.includes('l')) pos.left = 0;
  if (position.includes('r')) pos.right = 0;

  return (
    <View style={[{
      position: 'absolute', width: size, height: size,
      borderColor: accentColor,
    }, borderStyle, pos]} />
  );
}

export default function CameraScreen({ navigation }) {
  const { theme } = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const [analyzing, setAnalyzing] = useState(false);
  const [mode, setMode] = useState('Scan');
  const scanAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!analyzing) return;
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 0.3, duration: 1000,
        useNativeDriver: true,
      })
    ).start();

    Animated.timing(scanAnim, {
      toValue: 1, duration: 2200,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('Result');
    });
  }, [analyzing]);

  const handleCapture = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Camera access required', 'Please allow camera access in Settings to scan your food.');
        return;
      }
    }
    setAnalyzing(true);
  };

  const scanY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 292],
  });

  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />

      {/* Viewfinder */}
      <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {permission.granted ? (
          <CameraView style={StyleSheet.absoluteFill} facing="back" />
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.fakeFinder]}>
            <Text style={{ fontSize: 120 }}>🥑</Text>
            <Text style={[StyleSheet.absoluteFill, { position: 'absolute', left: '15%', top: '55%', fontSize: 60 }]}>🍞</Text>
            <Text style={[StyleSheet.absoluteFill, { position: 'absolute', right: '10%', top: '25%', fontSize: 56 }]}>🍳</Text>
          </View>
        )}

        {/* Reticle */}
        <View style={styles.reticle}>
          <View style={{ position: 'relative', width: 300, height: 300 }}>
            <CornerBracket position="tl" accentColor={theme.accent} />
            <CornerBracket position="tr" accentColor={theme.accent} />
            <CornerBracket position="bl" accentColor={theme.accent} />
            <CornerBracket position="br" accentColor={theme.accent} />

            {analyzing && (
              <Animated.View style={[styles.scanLine, {
                backgroundColor: theme.accent,
                shadowColor: theme.accent,
                transform: [{ translateY: scanY }],
              }]} />
            )}
          </View>
        </View>

        {/* Top controls */}
        <View style={styles.topControls}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassBtn}>
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Path d="M12 4L4 12M4 4l8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.glassBtn}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M12 7v3m0 3v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Hint pill */}
        <View style={styles.hintRow}>
          <View style={styles.hintPill}>
            {analyzing ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Animated.View style={[styles.pulseDot, { backgroundColor: theme.accent, opacity: pulseAnim }]} />
                <Text style={styles.hintText}>Analyzing food…</Text>
              </View>
            ) : (
              <Text style={styles.hintText}>✨ Point at your meal to scan</Text>
            )}
          </View>
        </View>
      </View>

      {/* Bottom controls */}
      <View style={styles.bottomBar}>
        {/* Mode pills */}
        <View style={{ flexDirection: 'row', gap: 4, marginBottom: 24 }}>
          {['Scan', 'Barcode', 'Label'].map((m) => (
            <TouchableOpacity key={m} onPress={() => setMode(m)}>
              <View style={[styles.modePill, { backgroundColor: mode === m ? 'rgba(255,255,255,0.16)' : 'transparent' }]}>
                <Text style={{ fontSize: 12, fontWeight: '600', letterSpacing: 0.3, color: mode === m ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                  {m}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Shutter row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 60 }}>
          <TouchableOpacity style={styles.smallBtn}>
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <Path d="M3 5h18v14H3z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
              <Circle cx="12" cy="12" r="3.5" stroke="#fff" strokeWidth="1.6" />
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={analyzing ? undefined : handleCapture}
            disabled={analyzing}
            activeOpacity={0.85}
            style={[styles.shutter, { borderColor: analyzing ? theme.accent : '#fff' }]}
          >
            <View style={[styles.shutterInner, {
              backgroundColor: analyzing ? theme.accent : '#fff',
              transform: [{ scale: analyzing ? 0.5 : 1 }],
            }]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallBtn}>
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <Path d="M4 7h3l2-3h6l2 3h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z"
                stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
              <Path d="M9 13l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fakeFinder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'radial-gradient(circle at 50% 45%, #6B4226 0%, #2A1810 70%, #0A0604 100%)',
  },
  reticle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  scanLine: {
    position: 'absolute',
    left: 8, right: 8,
    height: 2, borderRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  topControls: {
    position: 'absolute', top: 60, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  glassBtn: {
    width: 36, height: 36, borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  hintRow: {
    position: 'absolute', top: 120, left: 0, right: 0,
    alignItems: 'center',
  },
  hintPill: {
    paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hintText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  pulseDot: { width: 6, height: 6, borderRadius: 999 },
  bottomBar: {
    height: 200, backgroundColor: '#000',
    alignItems: 'center', justifyContent: 'flex-start',
    paddingTop: 18, paddingBottom: 40,
  },
  modePill: {
    paddingVertical: 6, paddingHorizontal: 14, borderRadius: 999,
  },
  shutter: {
    width: 76, height: 76, borderRadius: 999,
    backgroundColor: 'transparent',
    borderWidth: 4,
    alignItems: 'center', justifyContent: 'center',
  },
  shutterInner: {
    width: 60, height: 60, borderRadius: 999,
  },
  smallBtn: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center',
  },
});
