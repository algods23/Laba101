# Build debug APK and copy to mobile/installer for sharing to other devices.
# Usage (from mobile/):  .\package-installer.ps1
# Optional:            .\package-installer.ps1 -SkipBuild

param(
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$MobileDir = $PSScriptRoot
$SourceApk = Join-Path $MobileDir "android\app\build\outputs\apk\debug\app-debug.apk"
$InstallerDir = Join-Path $MobileDir "installer"
$TargetApk = Join-Path $InstallerDir "Laba101-installer.apk"

if (-not $SkipBuild) {
    Write-Host "Building APK..." -ForegroundColor Cyan
    Push-Location $MobileDir
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
        npx cap sync android
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
        Set-Location (Join-Path $MobileDir "android")
        & .\gradlew.bat assembleDebug
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }
    finally {
        Pop-Location
    }
}

if (-not (Test-Path $SourceApk)) {
    Write-Host "APK not found. Run without -SkipBuild or build manually: npm run android:debug" -ForegroundColor Red
    exit 1
}

New-Item -ItemType Directory -Force -Path $InstallerDir | Out-Null
Copy-Item -Path $SourceApk -Destination $TargetApk -Force

Write-Host ""
Write-Host "Installer ready:" -ForegroundColor Green
Write-Host "  $TargetApk"
Write-Host ""
Write-Host "Copy this file to another Android device and open it to install." -ForegroundColor Yellow
