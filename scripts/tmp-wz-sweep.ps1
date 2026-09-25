# Deep wz trace sweep across the whole repo (excluding dist, node_modules, backups)
$excludeDirs = '\\(node_modules|dist|_backup_2026|\.git|\.vercel|build)\\'
$files = Get-ChildItem -Path . -Recurse -File -Include *.html, *.css, *.js, *.mjs, *.ts, *.tsx, *.json, *.svg, *.md |
Where-Object { $_.FullName -notmatch $excludeDirs }

Write-Output ("Files scanned: " + $files.Count)

$hits = @()
foreach ($f in $files) {
  $m = Select-String -Path $f.FullName -Pattern '[wW][zZ]' -AllMatches -ErrorAction SilentlyContinue
  if ($m) {
    foreach ($line in $m) {
      foreach ($mat in $line.Matches) {
        $hits += [PSCustomObject]@{
          File = $f.FullName.Replace((Get-Location).Path + '\', '')
          Line = $line.LineNumber
          Text = $mat.Value
        }
      }
    }
  }
}

Write-Output ("Total wz matches: " + $hits.Count)

if ($hits.Count -gt 0) {
  $hits | Group-Object File | ForEach-Object {
    $variants = ($_.Group.Text | Sort-Object -Unique) -join ', '
    Write-Output ("{0}  [{1}x]  ->  {2}" -f $_.Name, $_.Count, $variants)
  }
  Write-Output ""
  Write-Output "=== Detail (file:line) ==="
  $hits | Group-Object File, Line | ForEach-Object {
    $first = $_.Group | Select-Object -First 1
    Write-Output ("{0}:{1} -> {2}" -f $first.File, $first.Line, ($_.Group.Text | Sort-Object -Unique -join ', '))
  }
}
else {
  clean
}
