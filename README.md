# TelGuard Sentinel

TelGuard Sentinel is a native Expo/React Native iOS security companion for protecting a phone number from SIM-swap signals, telecom impersonation, and account-recovery risk.

## Included experience

- A local-first Sentinel dashboard with a transparent risk score
- One-tap security scan with haptic feedback
- SIM identity, cellular continuity, and account-recovery signal cards
- TelGuard call and message protection status
- Private incident activity timeline
- Trusted-circle controls
- AsyncStorage persistence for the first build

## iOS architecture notes

iOS intentionally limits third-party access to modem and carrier internals. The current app models the user-facing security layer and keeps the carrier integration seam explicit. A production carrier deployment can add authenticated server signals for eSIM changes, account recovery events, and carrier-side identity verification without changing the core local-first UI.

## Run

```bash
pnpm install
pnpm --filter @workspace/telguard-sentinel run dev
```

Open the Expo URL in Expo Go or use the Replit mobile preview.