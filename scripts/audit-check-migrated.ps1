# Verify served HTML carries the shared nav system
$pages = @('about.html', 'Workspace.html', 'webtools.html')
foreach ($p in $pages) {
  $c = (Invoke-WebRequest -Uri "http://localhost:3001/$p?v=$(Get-Random)" -UseBasicParsing -TimeoutSec 15).Content
  Write-Output "== $p"
  Write-Output ("  site-nav.css: {0}" -f ($c -match 'site-nav\.css'))
  Write-Output ("  wz-site-nav mount: {0}" -f ($c -match 'wz-site-nav'))
  Write-Output ("  data-breadcrumb: {0}" -f ($c -match 'data-breadcrumb'))
  Write-Output ("  old navigation.html fetch: {0}" -f ($c -match "fetch\('/navigation\.html'\)"))
  Write-Output ("  old breadcrumb fetch: {0}" -f ($c -match "fetch\('/breadcrumb\.html'\)"))
  Write-Output ("  site-nav.js: {0}" -f ($c -match 'site-nav\.js'))
}
