#!/usr/bin/env bash

read -p "Are you sure? (y / n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # do dangerous stuff
    cp $1 $1".backup"
    echo "Backup DB: "$1".backup"

    echo "New db: "$1
    sqlite3 $1 < ./sql/createPeopleSchema.sql
    echo "People schema created."
fi
