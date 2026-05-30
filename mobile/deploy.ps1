# ============================================================
#  Laba101 Mobile — Auto-deploy script (PowerShell)
#  Usage: Run from the mobile/ folder:  .\deploy.ps1
#  Requires: Node, Java (JDK), USB-debugging on device
# ============================================================

param(
    [switch]$SkipBuild   # -SkipBuild to skip npm run build + cap sync
)

$ErrorActionPreference = "Stop"

# ── Locate this script's directory (mobile/) ─────────────────
$MobileDir  = $PSScriptRoot
$AndroidDir = Join-Path $MobileDir "android"
$APK        = Join-Path $AndroidDir "app\build\outputs\apk\debug\app-debug.apk"
$Gradlew    = Join-Path $AndroidDir "gradlew.bat"

# ── Auto-detect ADB ──────────────────────────────────────────
$AdbPath = $null
$AdbCandidates = @(
    "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe",
    "$env:USERPROFILE\AppData\Local\Android\Sdk\platform-tools\adb.exe",
    "C:\Android\platform-tools\adb.exe",
    "C:\adb\adb.exe"
)
foreach ($candidate in $AdbCandidates) {
    if (Test-Path $candidate) { $AdbPath = $candidate; break }
}
if (-not $AdbPath) {
    # Fallback: hope it's in PATH
    $AdbPath = "adb"
}

Write-Host ""
Write-Host "Laba101 Mobile Deploy" -ForegroundColor White -BackgroundColor DarkBlue
Write-Host "  Mobile dir : $MobileDir"
Write-Host "  ADB        : $AdbPath"
Write-Host ""

# ── Helper ───────────────────────────────────────────────────
function Step($label, [scriptblock]$block) {
    Write-Host "==> $label" -ForegroundColor Cyan
    Push-Location $MobileDir
    try { & $block }
    finally { Pop-Location }
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "  FAILED: $label  (exit code $LASTEXITCODE)" -ForegroundColor Red
        exit $LASTEXITCODE
    }
    Write-Host "  OK: $label" -ForegroundColor Green
    Write-Host ""
}

# ── Step 1: Vite build ────────────────────────────────────────
if (-not $SkipBuild) {
    Step "npm run build" { npm run build }
} else {
    Write-Host "(Skipping npm run build)" -ForegroundColor DarkGray
}

# ── Step 2: Capacitor sync ────────────────────────────────────
if (-not $SkipBuild) {
    Step "npx cap sync android" { npx cap sync android }
}

# ── Step 3: Gradle assembleDebug ─────────────────────────────
Step "gradlew assembleDebug" {
    Set-Location $AndroidDir
    & $Gradlew assembleDebug
}

# ── Step 4: ADB install ───────────────────────────────────────
Step "adb install -r app-debug.apk" {
    & $AdbPath install -r $APK
}

# ── Done! ─────────────────────────────────────────────────────
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  DEPLOY COMPLETE - APK installed!        " -ForegroundColor Green
Write-Host "  npm run build    -> OK                  " -ForegroundColor Green
Write-Host "  cap sync android -> OK                  " -ForegroundColor Green
Write-Host "  assembleDebug    -> OK                  " -ForegroundColor Green
Write-Host "  adb install      -> OK                  " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
