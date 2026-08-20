import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useSentinel } from '@/context/SentinelContext';
import { ActivityRow, Eyebrow, Pill, PrimaryButton, SectionHeader, SignalRow } from '@/components/SentinelUI';

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { protectionEnabled, riskScore, simStatus, lastScan, signals, activities, runScan } = useSentinel();
  const [scanning, setScanning] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    await runScan();
    setScanning(false);
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={[local.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 104 }]} showsVerticalScrollIndicator={false}>
      <View style={local.header}><View><Eyebrow>TelGuard Sentinel</Eyebrow><Text style={[local.greeting, { color: colors.foreground }]}>Your number is guarded.</Text></View><View style={[local.lockBadge, { backgroundColor: colors.accent }]}><Feather name={protectionEnabled ? 'shield' : 'shield-off'} size={21} color={protectionEnabled ? colors.primary : colors.mutedForeground} /></View></View>
      <View style={[local.hero, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={local.heroTop}><View><Text style={[local.heroLabel, { color: colors.mutedForeground }]}>CURRENT RISK</Text><Text style={[local.score, { color: colors.primary }]}>{riskScore}<Text style={[local.scoreSuffix, { color: colors.mutedForeground }]}> / 100</Text></Text></View><Pill level="low">LOW RISK</Pill></View>
        <View style={[local.meterTrack, { backgroundColor: colors.muted }]}><View style={[local.meterFill, { backgroundColor: colors.primary, width: `${Math.max(8, 100 - riskScore)}%` }]} /></View>
        <Text style={[local.heroBody, { color: colors.mutedForeground }]}>{simStatus}. Sentinel is monitoring your telecom identity and recovery surface.</Text>
        <PrimaryButton label={scanning ? 'Scanning your device' : 'Run security scan'} onPress={handleScan} loading={scanning} icon="activity" />
        <Text style={[local.scanned, { color: colors.mutedForeground }]}>Last scan {lastScan}</Text>
      </View>
      <View style={local.section}><SectionHeader title="Identity signals" action="See details" /><View style={[local.card, { backgroundColor: colors.card, borderColor: colors.border }]}>{signals.map((signal) => <SignalRow key={signal.label} signal={signal} />)}</View></View>
      <View style={local.section}><SectionHeader title="TelGuard protection" action={protectionEnabled ? 'Active' : 'Paused'} /><View style={[local.protectionCard, { backgroundColor: colors.accent }]}><View style={[local.protectionIcon, { backgroundColor: colors.primary }]}><Feather name="phone-call" size={18} color={colors.primaryForeground} /></View><View style={local.protectionCopy}><Text style={[local.protectionTitle, { color: colors.foreground }]}>Calls and messages are triaged</Text><Text style={[local.protectionBody, { color: colors.mutedForeground }]}>Known contacts pass through. New patterns are paused for your review.</Text></View></View></View>
      <View style={local.section}><SectionHeader title="Recent activity" action="View all" /><View>{activities.slice(0, 2).map((item) => <ActivityRow key={item.id} activity={item} />)}</View></View>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  content: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 },
  greeting: { fontFamily: 'Inter_700Bold', fontSize: 26, letterSpacing: -0.6, marginTop: 7 },
  lockBadge: { width: 44, height: 44, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  hero: { borderRadius: 26, borderWidth: 1, padding: 19 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.2 },
  score: { fontFamily: 'Inter_700Bold', fontSize: 42, letterSpacing: -1, marginTop: 2 },
  scoreSuffix: { fontFamily: 'Inter_500Medium', fontSize: 15, letterSpacing: 0 },
  meterTrack: { height: 7, borderRadius: 8, marginVertical: 15, overflow: 'hidden' },
  meterFill: { height: 7, borderRadius: 8 },
  heroBody: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19, marginBottom: 17 },
  scanned: { fontFamily: 'Inter_400Regular', fontSize: 11, textAlign: 'center', marginTop: 12 },
  section: { marginTop: 27 },
  card: { borderWidth: 1, borderRadius: 22, paddingHorizontal: 15 },
  protectionCard: { borderRadius: 21, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'center' },
  protectionIcon: { width: 37, height: 37, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  protectionCopy: { flex: 1, gap: 4 },
  protectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 14 },
  protectionBody: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17 },
});
