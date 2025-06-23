# PWA Setup Guide for Bollo

This guide explains how to set up and use the Progressive Web App (PWA) features in Bollo.

## What is a PWA?

A Progressive Web App (PWA) is a web application that provides a native app-like experience. It can be installed on devices, works offline, and provides push notifications.

## Features Implemented

### ✅ Core PWA Features
- **Web App Manifest** - Defines app metadata and installation behavior
- **Service Worker** - Enables offline functionality and caching
- **Installation Prompt** - Automatic and manual installation options
- **Offline Support** - App works without internet connection
- **App Icons** - Multiple sizes for different devices
- **Splash Screen** - Loading screen when app starts

### ✅ User Experience Features
- **Installation Guide** - Platform-specific installation instructions
- **Offline Page** - Shows when user is offline
- **Install Button** - Floating action button for manual installation
- **App Shortcuts** - Quick access to key features

## Installation Steps

### 1. Install Dependencies

```bash
npm install --save-dev sharp
```

### 2. Generate App Icons

```bash
npm run generate-icons
```

This will create all required icon sizes from the SVG source.

### 3. Build and Deploy

```bash
npm run build
npm start
```

## PWA Components

### Core Components

- **`PWARegister`** - Handles service worker registration and installation prompts
- **`OfflinePage`** - Shows when user is offline
- **`PWAInstallGuide`** - Provides installation instructions

### Configuration Files

- **`public/manifest.json`** - App metadata and installation settings
- **`public/sw.js`** - Service worker for caching and offline support
- **`next.config.ts`** - Next.js configuration (no PWA plugin needed)

## Testing PWA Features

### 1. Installation Testing
- Open the app in Chrome/Edge
- Look for the install button in the address bar
- Or use the floating install button in the bottom-right corner

### 2. Offline Testing
- Open DevTools → Application → Service Workers
- Check "Offline" checkbox
- Refresh the page - should show offline page

### 3. App Installation
- **Chrome/Edge**: Click install button in address bar
- **Android**: Use browser menu → "Add to Home screen"
- **iOS**: Use Safari share button → "Add to Home Screen"

## PWA Configuration

### Manifest Settings
- **Name**: "Bollo - Connect with Skilled Service Providers"
- **Short Name**: "Bollo"
- **Theme Color**: #3b82f6 (Blue)
- **Display Mode**: standalone
- **Orientation**: portrait-primary

### Service Worker Features
- **Caching Strategy**: Network First
- **Cache Name**: bollo-v1
- **Offline Support**: Yes
- **Push Notifications**: Configured

### App Shortcuts
- Browse Services
- Find Workers
- Become a Tasker

## Browser Support

### Full PWA Support
- Chrome (Android/Desktop)
- Edge (Windows/Android)
- Safari (iOS 11.3+)
- Firefox (Android/Desktop)

### Limited Support
- Safari (macOS) - No installation prompt
- Older browsers - Basic functionality only

## Troubleshooting

### Common Issues

1. **Install button not showing**
   - Ensure HTTPS is enabled
   - Check manifest.json is valid
   - Verify service worker is registered

2. **Offline not working**
   - Check service worker registration
   - Verify cache is populated
   - Test with DevTools offline mode

3. **Icons not displaying**
   - Run `npm run generate-icons`
   - Check icon paths in manifest.json
   - Verify icon files exist in public/icons/

### Development Mode

PWA features work in both development and production modes. To test PWA features:

1. Build the app: `npm run build`
2. Start production server: `npm start`
3. Test PWA features in production build

## Performance Optimization

### Caching Strategy
- **Static Assets**: Cache first
- **API Calls**: Network first with cache fallback
- **Images**: Stale while revalidate

### Bundle Optimization
- Code splitting for better performance
- Lazy loading of components
- Optimized images and icons

## Security Considerations

- HTTPS required for PWA features
- Service worker scope limitations
- Secure content security policy
- Regular cache cleanup

## Future Enhancements

- Push notifications implementation
- Background sync
- Advanced caching strategies
- App store integration
- Deep linking support

## Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
