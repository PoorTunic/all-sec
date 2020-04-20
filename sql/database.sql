CREATE DATABASE all_sec_master CHARACTER SET 'UTF8' COLLATE 'utf8_general_ci';
USE all_sec_master;

CREATE TABLE usuarios(
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(30) NOT NULL,
	sexo ENUM("MASCULINO", "FEMENINO") NOT NULL,
	correo VARCHAR(30) NOT NULL UNIQUE
)Engine = InnoDB CHARACTER SET 'UTF8' COLLATE 'utf8_general_ci';

CREATE TABLE stats(
	id_visitor INT AUTO_INCREMENT PRIMARY KEY,
	ip VARCHAR(15),
	country VARCHAR(30),
	country_code CHAR(2)
)Engine = InnoDB CHARACTER SET 'UTF8' COLLATE 'utf8_general_ci';
