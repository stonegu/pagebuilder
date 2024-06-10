# Getting Started

## Maven Build
```powershell
mvn clean install -U -DskipTests
```

## Encryption
The application uses jasypt encryption/decryption to encrypt/decrypt values on the command line (like db passwords).  To enable property enc/dec, the main application file needs to have the annotation: `@EnableEncryptableProperties`.  To encrypt a value/property, you need to encrypt the value using the jasypt command line tool as follows:

Following is the significance of command-line parameters passed to run the jar:

* input: Actual password to be encrypted
* password: the secret key chosen by you (example, helloworld)
* algorithm: PBEWithMD5AndDES (default algorithm used)
* OUTPUT: Encrypted value of input

```powershell
C:\Users\pzw>java -cp C:\Users\pzw\.m2\repository\org\jasypt\jasypt\1.9.3\jasypt-1.9.3.jar
org.jasypt.intf.cli.JasyptPBEStringEncryptionCLI input="checkPasswordFile" password=secretKey algorithm=PBEWithMD5AndDES

----ENVIRONMENT-----------------
Runtime: Eclipse Adoptium OpenJDK 64-Bit Server VM 17.0.2+8

----ARGUMENTS-------------------
input: checkPasswordFile
password: secretKey
algorithm: PBEWithMD5AndDES

----OUTPUT----------------------
02p24DHSBZMTa3JDSN7NbhUxEd/HAChh=
```

## Table Design
```sql
DROP DATABASE pagebuilder;
CREATE DATABASE pagebuilder CHARACTER SET utf8;
USE pagebuilder;

CREATE TABLE `page`
(
    `id`   bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `uuid` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
    `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
    `components` MEDIUMTEXT COLLATE utf8_unicode_ci,
    `css` MEDIUMTEXT COLLATE utf8_unicode_ci,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

```