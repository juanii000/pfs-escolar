DROP SCHEMA IF EXISTS escolar;
CREATE DATABASE  escolar;
USE escolar;
--
-- Table structure for table ingreso
--
DROP TABLE IF EXISTS ingreso;
CREATE TABLE ingreso (
  usuario varchar(255) NOT NULL,
  palabra varchar(255) NOT NULL,
  PRIMARY KEY (usuario)
) ENGINE=InnoDB;
--
-- Table structure for table ciudades
--
DROP TABLE IF EXISTS ciudades;
CREATE TABLE ciudades (
  idCiudad int NOT NULL,
  nombre varchar(255) NOT NULL,
  PRIMARY KEY (idCiudad)
) ENGINE=InnoDB;
--
-- Table structure for table escuelas
--
DROP TABLE IF EXISTS escuelas;
CREATE TABLE escuelas (
  idEscuela int NOT NULL,
  nombre varchar(255) NOT NULL,
  domicilio varchar(255) NOT NULL,
  ciudadIdCiudad int DEFAULT NULL,
  PRIMARY KEY (idEscuela),
  KEY FK_Ciudad (ciudadIdCiudad),
  CONSTRAINT FK_Ciudad FOREIGN KEY (ciudadIdCiudad) REFERENCES ciudades (idCiudad) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
--
-- Table structure for table estudiantes
--
DROP TABLE IF EXISTS estudiantes;
CREATE TABLE estudiantes (
  idEstudiante int NOT NULL,
  apellidoNombres varchar(255) NOT NULL,
  fechaNacimiento varchar(255) NOT NULL,
  PRIMARY KEY (idEstudiante)
) ENGINE=InnoDB;
--
-- Table structure for table profesores
--
DROP TABLE IF EXISTS profesores;
CREATE TABLE profesores (
  idProfesor int NOT NULL,
  apellidoNombres varchar(255) NOT NULL,
  PRIMARY KEY (idProfesor)
) ENGINE=InnoDB;
--
-- Table structure for table clases
--
DROP TABLE IF EXISTS clases;
CREATE TABLE clases (
  idClase int NOT NULL AUTO_INCREMENT,
  nombre varchar(255) NOT NULL,
  escuelaIdEscuela int DEFAULT NULL,
  profesorIdProfesor int DEFAULT NULL,
  PRIMARY KEY (idClase),
  KEY FK_Escuela (escuelaIdEscuela),
  KEY FK_Profesor (profesorIdProfesor),
  CONSTRAINT FK_Escuela FOREIGN KEY (escuelaIdEscuela) REFERENCES escuelas (idEscuela) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_Profesor FOREIGN KEY (profesorIdProfesor) REFERENCES profesores (idProfesor) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
--
-- Table structure for table clases_estudiantes_estudiantes
--
DROP TABLE IF EXISTS clases_estudiantes_estudiantes;
CREATE TABLE clases_estudiantes_estudiantes (
  clasesIdClase int NOT NULL,
  estudiantesIdEstudiante int NOT NULL,
  PRIMARY KEY (clasesIdClase,estudiantesIdEstudiante),
  KEY IDX_Clase (clasesIdClase),
  KEY IDX_Estudiante (estudiantesIdEstudiante),
  CONSTRAINT IDX_Clase FOREIGN KEY (clasesIdClase) REFERENCES clases (idClase) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT IDX_Estudiante FOREIGN KEY (estudiantesIdEstudiante) REFERENCES estudiantes (idEstudiante) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
--
-- Table structure for table asistencia
--
DROP TABLE IF EXISTS asistencia;
CREATE TABLE asistencia (
  idAsistencia int NOT NULL AUTO_INCREMENT,
  fecha varchar(255) NOT NULL,
  claseIdClase int DEFAULT NULL,
  estudianteIdEstudiante int DEFAULT NULL,
  PRIMARY KEY (idAsistencia),
  KEY IDX_Clase_Asistencia (claseIdClase),
  KEY IDX_Estudiante_Asistencia (estudianteIdEstudiante),
  CONSTRAINT IDX_Clase_Asistencia FOREIGN KEY (claseIdClase) REFERENCES clases (idClase) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT IDX_Estudiante_Asistencia FOREIGN KEY (estudianteIdEstudiante) REFERENCES estudiantes (idEstudiante) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
--
-- Funciones
--
DROP FUNCTION IF EXISTS esPrimo;
DELIMITER $$
CREATE FUNCTION esPrimo (n int)
RETURNS BOOLEAN 
DETERMINISTIC
BEGIN
DECLARE i INTEGER;
	SET i = 2;
	WHILE i < n DO
		IF (n % i) = 0 then
			RETURN false;
		END IF;
        SET i = i + 1;
	END WHILE;
RETURN true;
END$$
DELIMITER ;
