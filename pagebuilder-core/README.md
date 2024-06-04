# Getting Started

## Maven Build
```powershell
mvn clean install -U -DskipTests
```

## Table Design
```sql
DROP DATABASE pagebuilder;
CREATE DATABASE pagebuilder CHARACTER SET utf8;
USE pagebuilder;

CREATE TABLE `page`
(
    `id`   bigint(20) unsigned NOT NULL,
    `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
    `components` MEDIUMTEXT COLLATE utf8_unicode_ci,
    `css` MEDIUMTEXT COLLATE utf8_unicode_ci,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

```