USE escolar;

DELETE FROM clases;

DELETE FROM escuelas;

DELETE FROM ciudades;

DELETE FROM estudiantes;

DELETE FROM profesores;

INSERT INTO ciudades SELECT ID-110, name FROM world.city WHERE CountryCode='ARG' AND District='Buenos Aires' ORDER BY Population LIMIT 5;

INSERT INTO estudiantes SELECT nro_cliente, CONCAT(apellido, ', ', nombre), MAKEDATE(2010,nro_cliente*2) FROM facturacion.e01_cliente WHERE activo < 70 AND nro_cliente<100;

INSERT INTO profesores SELECT nro_cliente, CONCAT(apellido, ', ', nombre) FROM facturacion.e01_cliente WHERE activo BETWEEN 100 AND 120;

INSERT INTO escuelas SELECT nro_cliente, CONCAT('Escuela N. ',nro_cliente,' - ',apellido, ', ', nombre), direccion, 7 + FLOOR(RAND()*5)*2 
FROM facturacion.e01_cliente WHERE activo BETWEEN 70 AND 100 AND nro_cliente<100 LIMIT 12;

INSERT INTO clases SELECT DISTINCTROW 0, CONCAT(UPPER(LEFT(i.nombre,1)),LOWER(MID(i.nombre,2))), idEscuela, idProfesor
FROM facturacion.e01_factura f, facturacion.e01_detalle_factura df, facturacion.e01_producto i, escuelas e, profesores p
WHERE f.nro_factura=df.nro_factura AND df.codigo_producto=i.codigo_producto AND i.nombre<>'' AND LEFT(i.nombre,1) in ('a','b','c','d','f','t') AND i.codigo_producto=p.idProfesor AND e.idEscuela=f.nro_cliente
ORDER BY LEFT(i.nombre,1);

DELETE FROM clases_estudiantes_estudiantes;

INSERT INTO clases_estudiantes_estudiantes SELECT c.idClase, e.idEstudiante
FROM clases c, estudiantes e
WHERE e.idEstudiante*RAND()*10 BETWEEN FLOOR((c.escuelaidEscuela-10)/10)*10 AND CEIL((c.escuelaidEscuela)/10)*10
ORDER BY 1,2;

INSERT INTO asistencia SELECT DISTINCTROW 0, MAKEDATE('2022',nro_factura), clasesIdClase, estudiantesIdEstudiante 
FROM clases_estudiantes_estudiantes, facturacion.e01_factura 
WHERE esPrimo(estudiantesIdEstudiante) AND esPrimo(nro_factura) AND nro_factura<=365 AND WEEKDAY(MAKEDATE('2022',nro_factura)) < 5
ORDER BY 2;

UPDATE ciudades SET nombre = 'Tres Arroyos' WHERE idCiudad=7;