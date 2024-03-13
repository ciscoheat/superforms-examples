@echo off
IF [%1] == [] GOTO :end
IF [%2] == [] (SET FROM=main) ELSE (SET FROM=%2)

git checkout -b %1 %FROM%
::git push -u origin %1

:end
