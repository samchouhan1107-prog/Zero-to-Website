# Scan Assets/ and Chapters/ for wz- vs webzonebw- prefix usage
$root = Split-Path -Parent $PSScriptRoot
$all = Get-ChildItem -Path (Join-Path $root 'Assets'), (Join-Path $root 'Chapters') -Recurse -File -Include '*.html', '*.css', '*.js'
$rows = @()
foreach ($f in $all) {
  $c = Get-Content $f.FullName -Raw
  $wzCount = ([regex]::Matches($c, 'wz-')).Count
  $bwCount = ([regex]::Matches($c, 'webzonebw-')).Count
  if ($wzCount -gt 0 -or $bwCount -gt 0) {
    $rows += [PSCustomObject]@{
      File = $f.FullName.Substring($root.Length + 1)
      Wz   = $wzCount
      Bw   = $bwCount
    }
  }
}
$rows | Sort-Object Wz -Descending | Select-Object -First 50 | Format-Table -AutoSize
Write-Output ("files-with-any-prefix: " + $rows.Count)
Write-Output ("total-files-scanned: " + $all.Count)
