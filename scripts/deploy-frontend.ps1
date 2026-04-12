Param(
  [string]$Mode = "production"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location "$PSScriptRoot/../frontend"

Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm ci

Write-Host "Building frontend ($Mode)..." -ForegroundColor Cyan
if ($Mode -eq "production") {
  npm run build:prod
} else {
  npm run build
}

Write-Host "Frontend artifact ready at frontend/dist" -ForegroundColor Green
