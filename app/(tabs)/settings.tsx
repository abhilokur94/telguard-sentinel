import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Eyebrow, SectionHeader } from '@/components/SentinelUI';
import { useSentinel } from '@/context/SentinelContext';

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { protectionEnabled, toggleProtection, trustedNumbers } = useSentinel();
  return <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={[local.content, { paddingTop: insets.top + 22, paddingBottom: insets.bottom + 100 }]}><Eyebrow>Personal controls</Eyebrow><Text style={[local.title, { color: colors.foreground }]}>Settings</Text><Text style={[local.subtitle, { color: colors.mutedForeground }]}>Tune how Sentinel watches over your phone identity.</Text><View style={[local.card, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={local.settingRow}><View style={local.settingCopy}><Text style={[local.settingTitle, { color: colors.foreground }]}>Active protection</Text><Text style={[local.settingNote, { color: colors.mutedForeground }]}>Call screening, SMS triage, and identity alerts</Text></View><Switch testID="switch-active-protection" value={protectionEnabled} onValueChange={toggleProtection} trackColor={{ false: colors.muted, true: colors.primary }} thumbColor={colors.foreground} /></View></View><View style={local.section}><SectionHeader title="Trusted circle" action="Manage" /><View style={[local.card, { backgroundColor: colors.card, borderColor: colors.border }]}>{trustedNumbers.map((name) => <View style={local.contactRow} key={name}><View style={[local.contactIcon, { backgroundColor: colors.accent }]}><Feather name="user" size={16} color={colors.primary} /></View><Text style={[local.contactName, { color: colors.foreground }]}>{name}</Text><Feather name="check" size={16} color={colors.primary} /></View>)}</View></View><View style={[local.footnote, { borderColor: colors.border }]}><Feather name="lock" size={15} color={colors.mutedForeground} /><Text style={[local.footnoteText, { color: colors.mutedForeground }]}>Sensitive data is protected with device storage and never sold.</Text></View></ScrollView>;
}

const local = StyleSheet.create({
  content: { paddingHorizontal: 20 },
  title: { fontFamily: 'Inter_700Bold', fontSize: 32, marginTop: 8 },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21, marginTop: 7, marginBottom: 24 },
  card: { borderWidth: 1, borderRadius: 22, padding: 16 },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  settingCopy: { flex: 1, gap: 5 },
  settingTitle: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  settingNote: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17 },
  section: { marginTop: 28 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 10 },
  contactIcon: { width: 32, height: 32, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  contactName: { flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  footnote: { flexDirection: 'row', gap: 8, borderTopWidth: StyleSheet.hairlineWidth, marginTop: 28, paddingTop: 16 },
  footnoteText: { fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, flex: 1 },
});