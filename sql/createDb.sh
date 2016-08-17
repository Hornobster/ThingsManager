#!/usr/bin/env bash

read -p "Are you sure? (y / n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # do dangerous stuff
    cp ./app.db ./app.db.backup
    echo "Backup DB: app.db.backup"

    echo "New db: app.db"
    sqlite3 ./app.db < ./sql/createPeopleSchema.sql
    echo "People schema created."
fi
