# Recursive audit: any remaining 'wz' traces in live code?
# Excludes: _backup_2026 (restore point), node_modules, .git, dist is INCLUDED (production must be clean too)
$ErrorActionPreference = 'Stop'

$files = Get-ChildItem -Path . -Recurse -File -Include *.html, *.css, *.js, *.mjs, *.ts, *.tsx |
Where-Object { $_.FullName -notmatch '_backup_2026|node_modules|\\\.git\\' }

Write-Output ("Files scanned (live tree): " + $files.Count)

$hits = @()
foreach ($f in $files) {
  $m = Select-String -Path $f.FullName -Pattern 'wz' -AllMatches -ErrorAction SilentlyContinue
  if ($m) {
    $variants = ($m.Matches.Value | Sort-Object -Unique) -join ', '
    Write-Output ("{0} -> {1}" -f $f.FullName, $variants)
    $hits += $f.FullName
  }
}

if ($hits.Count -eq 0) {
  Write-Output "RESULT: CLEAN - no 'wz' traces anywhere in the live tree."
}
else {
  Write-Output ("RESULT: {0} file(s) still contain 'wz'." -f $hits.Count)
}
