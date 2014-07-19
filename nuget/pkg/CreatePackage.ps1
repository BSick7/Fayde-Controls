$libdestdir = $PWD.Path + "\content\lib\Fayde.Controls"
copy ($PWD.Path + "\..\..\Fayde.Controls.Ex.js") ($libdestdir + "\Fayde.Controls.js")
copy ($PWD.Path + "\..\..\Fayde.Controls.Ex.d.ts") ($libdestdir + "\Fayde.Controls.d.ts")
copy ($PWD.Path + "\..\..\Themes\Default.theme.xml") ($libdestdir + "\Themes\")
copy ($PWD.Path + "\..\..\Themes\Metro.theme.xml") ($libdestdir + "\Themes\")

$vpath = $PWD.Path + "\version.txt"
$versionstring = Get-Content $vpath
$tokens = $versionstring.Split(".")

$major = $tokens.Get(0)
$minor = $tokens.Get(1)
$build = ([int]$tokens.Get(2) + 1).ToString()

$newversion = "$major.$minor.$build"
Set-Content -Value $newversion $vpath

$specfile = $PWD.Path + "\Fayde.Controls.nuspec"
[xml]$specxml = New-Object System.Xml.XmlDocument
$specxml.PreserveWhitespace = $true
$specxml.Load($specfile)
$specxml.package.metadata.version = $newversion
Set-Content $specfile $specxml.OuterXml

nuget pack $specfile -Version $newversion -OutputDirectory "..\"