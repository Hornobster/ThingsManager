DROP TABLE IF EXISTS People;
CREATE TABLE People (id INTEGER PRIMARY KEY,
                     firstname TEXT NOT NULL,
                     lastname TEXT NOT NULL,
                     birthday DATETIME,
                     notes TEXT,
                     homecity TEXT,
                     homecountry TEXT,
                     currentaddress TEXT,
                     currentcity TEXT,
                     currentcountry TEXT);
