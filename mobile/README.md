# Laba101 Mobile (Capacitor + SQLite)

This folder is the offline Android app for Laba101.

Important: Capacitor packages HTML, CSS, JavaScript, and native plugins. It does not run Laravel/PHP inside the APK. The Laravel app remains the original web/POS system; this `mobile/` app is the installable offline Android client with its own local SQLite database on the device.

## Included
- Capacitor Android project in `mobile/android`
- Vite mobile frontend in `mobile/src`
- SQLite storage through `@capacitor-community/sqlite`
- Browser fallback through `localStorage` for quick preview
- Offline Dashboard, POS/Orders, Disbursements, Reports, Staff, and Settings tabs
- Fold payout recording with configurable fold rate
- Local order creation, order status advancement, daily sales, expenses, and staff records

## Required Software
- Node.js 18+
- Android Studio
- Android SDK installed from Android Studio
- JDK 17

Check Java:

```powershell
java -version
```

Check Android SDK. Android Studio normally installs it at:

```text
C:\Users\<your-user>\AppData\Local\Android\Sdk
```

If Gradle says `SDK location not found`, copy `mobile/android/local.properties.example` to `mobile/android/local.properties` and update `sdk.dir`.

Example:

```properties
sdk.dir=C\:\\Users\\YOUR_USER\\AppData\\Local\\Android\\Sdk
```

## Setup Commands
Run from `mobile/`:

```powershell
npm install
npm run build
npx cap sync android
```

If `mobile/android` does not exist on a fresh clone:

```powershell
npx cap add android
npx cap sync android
```

## Preview In Browser
Run from `mobile/`:

```powershell
npm run dev
```

Open the Vite URL shown in the terminal. Browser preview uses `localStorage`; Android APK uses SQLite.

## Build Debug APK
Run from `mobile/`:

```powershell
npm run android:debug
```

Or manually:

```powershell
npm run build
npx cap sync android
Set-Location android
.\gradlew.bat assembleDebug
```

Debug APK output:

```text
mobile\android\app\build\outputs\apk\debug\app-debug.apk
```

Copy a shareable installer (same APK, easier name):

```powershell
.\package-installer.ps1
```

Output:

```text
mobile\installer\Laba101-installer.apk
```

Copy that file to another phone and open it to install (allow installs from unknown sources if prompted).

## Fresh install defaults (first open on a new device)

When the app is installed on a device that has never run Laba101 before, SQLite is empty and these defaults are created automatically:

| Role | Branch | Email (username) | Password |
|------|--------|------------------|----------|
| Admin | Main Store | `admin@laba101.test` | `password` |
| Staff | Gensan Branch | `staff@laba101.gensan` | `password` |

Default services (Pricing tab):

| Service | Price | Includes |
|---------|-------|----------|
| Self Service Wash | ₱60 | Wash |
| Self Service Dry | ₱70 | Dry (40 mins) |
| Drop-off | ₱185 | Wash, dry, fold |
| Full Service | ₱200 | Wash, Fabcon, detergent, dry, fold |

Optional add-ons (extra dry time, Zonrox, Fabcon) are also seeded for POS.

No sample orders or customers are included on a fresh install.

To reset an existing phone to these defaults, uninstall the app or clear app storage in Android settings, then install again.

## Install On Android Device
Enable USB debugging on the Android device, connect it, then run:

```powershell
.\deploy.ps1
```

If you already built the APK and only want to reinstall or update it on the connected device, run:

```powershell
.\deploy.ps1 -SkipBuild
```

The deploy script uses `adb install -r -d` so it updates the installed app and relaunches it after install.

## Build Release APK
Run from `mobile/`:

```powershell
npm run android:release
```

Release APK output:

```text
mobile\android\app\build\outputs\apk\release\app-release-unsigned.apk
```

For Play Store or production installs, sign the release APK/AAB in Android Studio.

## Configuration Files
- `mobile/capacitor.config.ts`: app id, app name, web output folder, Android scheme
- `mobile/package.json`: Capacitor, SQLite, and APK build scripts
- `mobile/vite.config.ts`: Vite build output to `dist`
- `mobile/src/db.ts`: SQLite schema, seed data, and offline data functions
- `mobile/src/main.ts`: offline app screens and form handlers
- `mobile/android/local.properties`: local Android SDK path, not committed

## Offline Storage Notes
- Android data is stored in SQLite on the Android device.
- No Laragon is required.
- No `php artisan serve` is required.
- The APK works offline after install.
- Future sync with Laravel/MySQL can be added later as import/export or API sync.
