@echo off
setlocal enabledelayedexpansion
set PGPASSWORD=Neznam123!

cd /d "C:\Program Files\PostgreSQL\18\bin"

REM Start PostgreSQL server if not running
echo Checking PostgreSQL server status...
pg_ctl status -D "C:\Program Files\PostgreSQL\18\data" >nul 2>&1
if errorlevel 1 (
    echo Starting PostgreSQL server...
    pg_ctl start -D "C:\Program Files\PostgreSQL\18\data"
    timeout /t 5
)

REM Create database
echo Creating database macedonian_weddings...
psql -U postgres -c "CREATE DATABASE macedonian_weddings;"

REM Load schema
echo Loading database schema...
cd /d "c:\Users\todor\OneDrive\Desktop\stuff\blagoja code test\backend"
psql -U postgres -d macedonian_weddings -f database.sql

echo Database setup completed!
pause
