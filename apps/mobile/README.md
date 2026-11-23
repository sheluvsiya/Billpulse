# Billpulse mobile client

This folder reserves the cross-platform iOS/Android client location. The current repository does not yet include a runnable Expo app or shared authenticated API client. Build it against the same server-side API and account/session model as the web app; never put payment provider secret keys in a mobile bundle. Keep sensitive authentication tokens in platform secure storage (iOS Keychain / Android Keystore), and use universal/app links for expiring, revocable invoice approval links.

The backend and mobile app are not implemented by this placeholder. See the root README for the required production work and setup.
