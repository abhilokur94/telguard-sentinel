import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import type { Activity, DeviceSignal, RiskLevel } from '@/context/SentinelContext';

export function Eyebrow({ children }: { children: React.ReactNode }) {
  const colors = useColors();
  return <Text style={[styles.eyebrow, { color: colors.primary }]}>{children}</Text>;
}

export function Pill({ level, children }: { level: RiskLevel | 'clear' | 'watch' | 'limited'; children: React.ReactNode }) {
  const colors = useColors();
  const palette = level === 'critical' ? colors.destructive : level === 'watch' || level === 'guarded' ? '#F0B65A' : colors.primary;
  return <View style={[styles.pill, { backgroundColor: `${palette}1C` }]}><View style={[styles.pillDot, { backgroundColor: palette }]} /><Text style={[styles.pillText, { color: palette }]}>{children}</Text></View>;
}

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>{action ? <Pressable onPress={onAction}><Text style={[styles.action, { color: colors.primary }]}>{action}</Text></Pressable> : null}</View>;
}

export function SignalRow({ signal }: { signal: DeviceSignal }) {
  const colors = useColors();
  return <View style={[styles.signalRow, { borderBottomColor: colors.border }]}>
    <View style={[styles.signalIcon, { backgroundColor: signal.status === 'watch' ? '#F0B65A1C' : `${colors.primary}18` }]}><Feather name={signal.status === 'watch' ? 'alert-triangle' : 'radio'} size={17} color={signal.status === 'watch' ? '#F0B65A' : colors.primary} /></View>
    <View style={styles.signalCopy}><Text style={[styles.signalLabel, { color: colors.foreground }]}>{signal.label}</Text><Text style={[styles.signalNote, { color: colors.mutedForeground }]}>{signal.note}</Text></View>
    <Text style={[styles.signalValue, { color: signal.status === 'watch' ? '#F0B65A' : colors.primary }]}>{signal.value}</Text>
  </View>;
}

export function ActivityRow({ activity }: { activity: Activity }) {
  const colors = useColors();
  const iconColor = activity.level === 'guarded' ? '#F0B65A' : colors.primary;
  return <View style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: `${iconColor}18` }]}><Feather name={activity.icon as keyof typeof Feather.glyphMap} size={17} color={iconColor} /></View><View style={styles.activityCopy}><Text style={[styles.activityTitle, { color: colors.foreground }]}>{activity.title}</Text><Text style={[styles.activityDetail, { color: colors.mutedForeground }]}>{activity.detail}</Text></View><Text style={[styles.activityTime, { color: colors.mutedForeground }]}>{activity.time}</Text></View>;
}

export function PrimaryButton({ label, onPress, loading = false, icon = 'arrow-right' }: { label: string; onPress: () => void; loading?: boolean; icon?: keyof typeof Feather.glyphMap }) {
  const colors = useColors();
  return <Pressable testID={`button-${label}`} onPress={onPress} disabled={loading} style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary, opacity: pressed || loading ? 0.78 : 1 }]}>{loading ? <ActivityIndicator color={colors.primaryForeground} /> : <><Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>{label}</Text><Feather name={icon} size={18} color={colors.primaryForeground} /></>}</Pressable>;
}

export const styles = StyleSheet.create({
  eyebrow: { fontFamily: 'Inter_700Bold', fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 19 },
  action: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  pillDot: { width: 6, height: 6, borderRadius: 3 },
  pillText: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  signalRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
  signalIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  signalCopy: { flex: 1, gap: 3 },
  signalLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  signalNote: { fontFamily: 'Inter_400Regular', fontSize: 12 },
  signalValue: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  activityRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 12 },
  activityIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  activityCopy: { flex: 1, gap: 3 },
  activityTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  activityDetail: { fontFamily: 'Inter_400Regular', fontSize: 12 },
  activityTime: { fontFamily: 'Inter_400Regular', fontSize: 10, alignSelf: 'flex-start' },
  primaryButton: { minHeight: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, paddingHorizontal: 18 },
  primaryButtonText: { fontFamily: 'Inter_700Bold', fontSize: 15 },
});