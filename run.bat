@echo off  
color 0f

:: The main selection panel
:selection
title azunyan, program selection
cls
echo selection
echo --------------
echo.
echo options:
echo     - 1. start [starts the main bot]
echo     - 2. dev [starts the bot in !nodemon!]
echo.
echo --------------
echo.
pause >nul
set /p type=

:: Check input and goto the input
if %type%==start goto programStart
if %type%==1 goto programStart
if %type%==dev goto development
if %type%==2 goto development
:: If none are found go back to selection
goto selection

:: run script
:programStart
title azunyan, program starter
cls
echo program starting....
node ./index.js
pause

:: nodemon script
:development
title azunyan, program development starter
cls
echo program starting in development....
nodemon ./index.js
pause
