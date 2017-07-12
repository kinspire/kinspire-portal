[Setup]
AppName=Kinspire Portal
AppVersion=0.0.0.1
AppPublisher=Kinspire
AppPublisherURL=http://kinspire.org
DefaultDirName={pf}\Kinspire Portal
DefaultGroupName=Kinspire Portal
;UninstallDisplayIcon={app}\MyProg.exe
Compression=lzma2
SolidCompression=yes
OutputDir=userdocs:Kinspire Portal Installer

[Files]
Source: "app/*"; DestDir: "{app}/app"; Flags: recursesubdirs; Permissions: users-modify
Source: "README.md"; DestDir: "{app}"; Flags: isreadme

[Dirs]
Name: "{app}\app\www\db"; Permissions: users-modify
Name: "{app}\app\www\styles"; Permissions: users-modify

[Icons]
Name: "{group}\Kinspire Portal"; Filename: "{app}/app/phpdesktop-chrome.exe"; WorkingDir: "{app}/www"