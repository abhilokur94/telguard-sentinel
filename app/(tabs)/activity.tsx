import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { ActivityRow, Eyebrow, SectionHeader, styles } from '@/components/SentinelUI';
import { useSentinel } from '@/context/SentinelContext';

export default function ActivityScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { activities } = useSentinel();
  return <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={[local.content, { paddingTop: insets.top + 22, paddingBottom: insets.bottom + 100 }]}><Eyebrow>Security timeline</Eyebrow><Text style={[local.title, { color: colors.foreground }]}>Activity</Text><Text style={[local.subtitle, { color: colors.mutedForeground }]}>A private, local-first record of your telecom security posture.</Text><View style={[local.card, { backgroundColor: colors.card, borderColor: colors.border }]}><SectionHeader title="Recent activity" action="Export" /><View>{activities.map((item) => <ActivityRow key={item.id} activity={item} />)}</View></View><View style={[local.notice, { backgroundColor: colors.accent }]}><Text style={[local.noticeTitle, { color: colors.foreground }]}>Evidence stays on this device</Text><Text style={[local.noticeBody, { color: colors.mutedForeground }]}>Sentinel stores the timeline locally. Export only when you choose to create an incident report.</Text></View></ScrollView>;
}

const local = StyleSheet.create({
  content: { paddingHorizontal: 20 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 32, marginTop: 8 },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21, marginTop: 7, marginBottom: 24, maxWidth: 330 },
  card: { borderWidth: 1, borderRadius: 22, padding: 16 },
  notice: { borderRadius: 18, padding: 16, marginTop: 18 },
  noticeTitle: { fontFamily: 'Inter_700Bold', fontSize: 14, marginBottom: 5 },
  noticeBody: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
});