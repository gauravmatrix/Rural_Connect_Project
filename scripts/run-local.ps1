Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root/backend'; .\\mvnw.cmd spring-boot:run"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root/frontend'; npm run dev:host"

Write-Host "Backend and frontend started in separate terminals." -ForegroundColor Green
