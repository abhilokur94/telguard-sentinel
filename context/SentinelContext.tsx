import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type RiskLevel = 'low' | 'guarded' | 'critical';

export type Activity = {
  id: string;
  time: string;
  title: string;
  detail: string;
  level: RiskLevel;
  icon: string;
};

export type DeviceSignal = {
  label: string;
  status: 'clear' | 'watch' | 'limited';
  value: string;
  note: string;
};

type SentinelState = {
  protectionEnabled: boolean;
  lastScan: string;
  riskScore: number;
  simStatus: string;
  activities: Activity[];
  signals: DeviceSignal[];
  trustedNumbers: string[];
};

type SentinelContextValue = SentinelState & {
  runScan: () => Promise<void>;
  toggleProtection: () => Promise<void>;
  addActivity: (activity: Omit<Activity, 'id' | 'time'>) => Promise<void>;
};

const STORAGE_KEY = 'telguard-sentinel-state';

const initialState: SentinelState = {
  protectionEnabled: true,
  lastScan: 'Today, 9:41 AM',
  riskScore: 8,
  simStatus: 'SIM identity is stable',
  activities: [
    {
      id: '1',
      time: 'Today, 9:41 AM',
      title: 'Routine security scan completed',
      detail: 'No abnormal identity changes detected',
      level: 'low',
      icon: 'check-circle',
    },
    {
      id: '2',
      time: 'Yesterday, 6:18 PM',
      title: 'Suspicious SMS link quarantined',
      detail: 'Package delivery impersonation',
      level: 'guarded',
      icon: 'shield',
    },
    {
      id: '3',
      time: 'Tue, 11:03 AM',
      title: 'New trusted contact added',
      detail: 'Maya Rodriguez',
      level: 'low',
      icon: 'user-plus',
    },
  ],
  signals: [
    { label: 'SIM identity', status: 'clear', value: 'Verified', note: 'No recent profile changes' },
    { label: 'Cellular continuity', status: 'clear', value: 'Normal', note: 'Service pattern matches your baseline' },
    { label: 'Account recovery', status: 'watch', value: 'Review needed', note: 'Add a second recovery channel' },
  ],
  trustedNumbers: ['Maya Rodriguez', 'Alex Chen', 'Carrier support'],
};

const SentinelContext = createContext<SentinelContextValue | null>(null);

export function SentinelProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SentinelState>(initialState);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored) {
        try {
          setState({ ...initialState, ...JSON.parse(stored) });
        } catch {
          setState(initialState);
        }
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<SentinelContextValue>(() => ({
    ...state,
    runScan: async () => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setState((current) => ({
        ...current,
        lastScan: 'Just now',
        riskScore: Math.max(4, current.riskScore - 1),
        simStatus: 'SIM identity is stable',
        activities: [
          {
            id: Date.now().toString(),
            time: 'Just now',
            title: 'Deep security scan completed',
            detail: 'SIM, recovery, and continuity checks are clear',
            level: 'low' as const,
            icon: 'check-circle',
          },
          ...current.activities,
        ].slice(0, 8),
      }));
    },
    toggleProtection: async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setState((current) => ({ ...current, protectionEnabled: !current.protectionEnabled }));
    },
    addActivity: async (activity) => {
      setState((current) => ({
        ...current,
        activities: [
          { ...activity, id: Date.now().toString(), time: 'Just now' },
          ...current.activities,
        ].slice(0, 8),
      }));
    },
  }), [state]);

  return <SentinelContext.Provider value={value}>{children}</SentinelContext.Provider>;
}

export function useSentinel() {
  const context = useContext(SentinelContext);
  if (!context) throw new Error('useSentinel must be used inside SentinelProvider');
  return context;
}