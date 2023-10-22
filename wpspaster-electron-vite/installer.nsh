!macro customInstall
  DeleteRegKey HKCR "wpspaster"
  WriteRegStr HKCR "wpspaster" "" "URL:wpspaster"
  WriteRegStr HKCR "wpspaster" "URL Protocol" ""
  WriteRegStr HKCR "wpspaster\shell" "" ""
  WriteRegStr HKCR "wpspaster\shell\Open" "" ""
  WriteRegStr HKCR "wpspaster\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend

!macro customUnInstall
  DeleteRegKey HKCR "wpspaster"
!macroend