$c = (Invoke-WebRequest -Uri "http://localhost:3001/about.html" -UseBasicParsing -TimeoutSec 15).Content
$idx = $c.IndexOf('<body')
if ($idx -ge 0) { Write-Output ("BODY: " + $c.Substring($idx, [Math]::Min(500, $c.Length - $idx))) }
$idx2 = $c.LastIndexOf('script src')
if ($idx2 -ge 0) { Write-Output ("TAIL: " + $c.Substring([Math]::Max(0, $idx2 - 100), [Math]::Min(300, $c.Length - [Math]::Max(0, $idx2 - 100)))) }
Write-Output ("LEN: " + $c.Length)
# search for any of our markers case-insensitively
Write-Output ("contains 'site-nav' (ci): " + ([regex]::IsMatch($c, 'site-nav', 'IgnoreCase')))
