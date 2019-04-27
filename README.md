# Migrate from TODOist into DayOne

![screenshot of TODOist app and DayOne app before and after migration](img/dayOneAfter.png)

This script will migrate all tasks from specified projects in TODOist into individual entries in DayOne.

## Prerequisites

* NodeJS
* Internet connection

## Import From TODOist to DayOne

Run the following and follow the instructions on screen.
All items will be tagged "TODOistImport" and imported into the default journal.
```
node todoistToDayOne.js
```
Please report any Issues on GitHub! Your feedback is appreciated.

## Future Improvements
Pull requests kindly accepted.
* Import TODOist comments as well
* Test really long notes (longest note tested was 483 char)
* Test large quantity of notes (311/700 tasks in TODOist were imported with no issues)
