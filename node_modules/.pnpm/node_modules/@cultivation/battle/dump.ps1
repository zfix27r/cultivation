$output = "project-dump.txt"
Remove-Item $output -ErrorAction SilentlyContinue

$root = (Get-Location).Path
$count = 0

# Исключения
$excludeFolders = @("node_modules", ".git", "dist", "dist-ssr", "coverage", "__tests__")
$excludeFiles = @("dump.ps1", "project-dump.txt", "README.md", "pnpm-lock.yaml", ".gitignore")
$excludeExtensions = @(".lock", ".png", ".jpg", ".svg", ".ico", ".woff", ".woff2")

Write-Host "Dumping project from: $root" -ForegroundColor Cyan

function IsExcluded($path) {
    $name = Split-Path $path -Leaf
    if ($excludeFiles -contains $name) { return $true }
    foreach ($ext in $excludeExtensions) { if ($name -like "*$ext") { return $true } }
    foreach ($folder in $excludeFolders) { if ($path -match "[\\/]$folder[\\/]") { return $true } }
    return $false
}

Get-ChildItem -Path $root -Recurse -File | ForEach-Object {
    if (IsExcluded $_.FullName) { return }
    
    $count++
    $relative = $_.FullName.Replace($root, "").TrimStart("\").Replace("\", "/")
    Write-Host "  $relative" -ForegroundColor Green
    
    "`n`n// ====== $relative ======`n" | Add-Content -Path $output -Encoding UTF8
    Get-Content $_.FullName -Encoding UTF8 | Add-Content -Path $output -Encoding UTF8
}

Write-Host "`nDone: $output ($count files)" -ForegroundColor Green