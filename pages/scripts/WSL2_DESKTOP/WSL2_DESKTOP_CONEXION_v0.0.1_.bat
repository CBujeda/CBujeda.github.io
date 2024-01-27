rem Programa Creado Por Clara Bujeda Muñoz

@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

title WSL2 AUTO XRDP - Author: Clara Bujeda Muñoz

rem Configuración de colores y estilos
if not exist colors.conf (
    echo true> colors.conf
)
set /p useColor=<colors.conf

if "!useColor!"=="true" (
	set _fCyan=[36m
	set _fRed=[31m
	set _fGreen=[32m
	set _fYellow=[33m
	set _RESET=[0m
	set _fBlack=[30m
	set _bBWhite=[107m
	set _bBlack=[40m   
) else (
	set _fRed=
	set _fGreen=
	set _fYellow=
	set _RESET=
	set _fBlack=
	set _bBWhite=
	set _bBlack=  
	set _fCyan=
)

rem Menú de configuración
:menu
cls
echo %_fGreen%============================
echo     %_fBGreen%Menú de Configuración%_RESET%
echo %_fGreen%============================
echo.
echo %_fCyan%1. Iniciar servidor xrdp en Linux%_RESET%
echo %_fCyan%2. Iniciar conexión xrdp desde Windows%_RESET%
echo %_fCyan%3. Info Ejecucion Manual%_RESET%
echo %_fCyan%4. Salir%_RESET%
echo.
set /p choice="%_fYellow%Seleccione una opción:%_RESET% "
if "%choice%"=="1" (
    wsl sudo /etc/init.d/xrdp start
    pause
    goto menu
) else if "%choice%"=="4" (
    exit
) else if "%choice%"=="2" (
	rem Generacion de XRDP WINDOWS FILE
    if not exist xrdp_config.rdp (
        set /p usuarioLinux="%_fYellow%Ingrese su nombre de usuario de Linux:%_RESET% " 
        (
            echo screen mode id:i:1
            echo use multimon:i:0
            echo desktopwidth:i:1920
            echo desktopheight:i:1080
            echo session bpp:i:32
            echo winposstr:s:0,1,653,103,1838,931
            echo compression:i:1
            echo smart sizing:i:1
            echo keyboardhook:i:2
            echo audiocapturemode:i:0
            echo videoplaybackmode:i:1
            echo connection type:i:7
            echo networkautodetect:i:1
            echo bandwidthautodetect:i:1
            echo displayconnectionbar:i:1
            echo enableworkspacereconnect:i:0
            echo disable wallpaper:i:0
            echo allow font smoothing:i:0
            echo allow desktop composition:i:0
            echo disable full window drag:i:1
            echo disable menu anims:i:1
            echo disable themes:i:0
            echo disable cursor setting:i:0
            echo bitmapcachepersistenable:i:1
            echo full address:s:localhost:3390
            echo audiomode:i:0
            echo redirectprinters:i:1
            echo redirectlocation:i:0
            echo redirectcomports:i:0
            echo redirectsmartcards:i:1
            echo redirectwebauthn:i:1
            echo redirectclipboard:i:1
            echo redirectposdevices:i:0
            echo autoreconnection enabled:i:1
            echo authentication level:i:2
            echo prompt for credentials:i:0
            echo negotiate security layer:i:1
            echo remoteapplicationmode:i:0
            echo alternate shell:s:
            echo shell working directory:s:
            echo gatewayhostname:s:
            echo gatewayusagemethod:i:4
            echo gatewaycredentialssource:i:4
            echo gatewayprofileusagemethod:i:0
            echo promptcredentialonce:i:0
            echo gatewaybrokeringtype:i:0
            echo use redirection server name:i:0
            echo rdgiskdcproxy:i:0
            echo kdcproxyname:s:
            echo enablerdsaadauth:i:0
            echo username:s:!usuarioLinux!
            echo drivestoredirect:s:
        ) > xrdp_config.rdp
    )
    pause
    start mstsc /v:localhost:3390 /f /edit xrdp_config.rdp
    pause
    goto menu
) else if "%choice%"=="3" (
	cls
	echo %_fBlack%%_bBWhite%^[                          MAN                         ^]%_RESET%
    echo ===============================================================
	echo                      EJECUCION MANUAL                          
	echo ===============================================================
	echo ^> En caso de que la opcion 1 no funcione ejecutar dicho comando
	echo   de forma manual en WSL2 ( Ubuntu )
	echo.
	echo   sudo /etc/init.d/xrdp start
	echo.
	echo %_fBlack%%_bBWhite%^[ Pulse cualquier tecla para salir de la documentación ^]%_RESET%
	echo.
	pause > nul
    goto menu
	
) else (
    echo %_fRed%Opción no válida. Por favor, seleccione una opción válida.%_RESET%
    pause
    goto menu
)
