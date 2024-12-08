echo off
    echo TYPESCRIPT
    start /B npx tsc --watch > ../src/logs/tsc.log
    echo SERVER
    start /B npx http-server ./dist -s -p 3001 > ../src/logs/server.log
pause > nul