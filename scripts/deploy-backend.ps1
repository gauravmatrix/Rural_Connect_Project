Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location "$PSScriptRoot/../backend"

Write-Host "Building backend jar..." -ForegroundColor Cyan
.\mvnw.cmd -DskipTests clean package

Write-Host "Backend artifact ready at backend/target" -ForegroundColor Green
