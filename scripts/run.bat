echo off
    echo TYPESCRIPT
    start /B npx tsc --watch > ../src/logs/tsc.log
    start /B cd ./dist && npx http-server -s -p 8080
pause > nul