param(
    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'

$MobileDeploy = Join-Path $PSScriptRoot 'mobile\deploy.ps1'

if (-not (Test-Path $MobileDeploy)) {
    throw "Mobile deploy script not found at $MobileDeploy"
}

if ($SkipBuild) {
    & $MobileDeploy -SkipBuild
} else {
    & $MobileDeploy
}
