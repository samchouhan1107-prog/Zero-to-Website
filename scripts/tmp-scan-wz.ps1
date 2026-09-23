# Temporary scan: find any remaining 'wz' identifiers in live code (excluding backups, node_modules, dist)
$root = (Get-Location).Path
$files = Get-ChildItem -Path . -Recurse -File -Include *.html,*.css,*.js,*.mjs,*.ts,*.tsx,*.json,*.md |
  Where-Object { $_.FullName -notmatch '_backup_2026|node_modules|dist|\.git|package-lock' }

Write-Output ("Files scanned: {0}" -f $files.Count)

# Sanity check: 'webzonebw' must exist in live code (expected positive control)
foreach ($f in $files) {
  $m = Select-String -Path $f.FullName -Pattern 'webzonebw' -ErrorAction SilentlyContinue
  if ($m) { $positive++; }
}
Write-Output ("Files containing 'webzonebw' (positive control): {0}" -f $positive)

foreach ($f in $files) {
  $m = Select-String -Path $f.FullName -Pattern 'wz' -AllMatches -ErrorAction SilentlyContinue
  if ($m) {
    $variants = ($m.Matches.Value | Sort-Object -Unique) -join ', '
    $rel = $f.FullName.Substring($root.Length + 1)
    Write-Output ("{0}: {1}" -f $rel, $variants)
  }
}
Write-Output "SCAN DONE"
