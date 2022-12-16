delete from clases;
delete from escuelas;
delete from ciudades;
delete from estudiantes;
delete from profesores;
insert into ciudades select ID-110, Name from world.city where CountryCode='ARG' and District='Buenos Aires' order by Population limit 5;
insert into estudiantes select nro_cliente, concat(apellido, ', ', nombre), makedate(2010,nro_cliente*2) from facturacion.e01_cliente where activo < 70;
insert into profesores select nro_cliente, concat(apellido, ', ', nombre) from facturacion.e01_cliente where activo between 100 and 120;
insert into escuelas select nro_cliente, concat('Escuela N. ',nro_cliente,' - ',apellido, ', ', nombre), direccion, 7 + floor(RAND()*5)*2
from facturacion.e01_cliente where activo between 70 and 100 and nro_cliente<100 limit 12;
insert into clases select DISTINCTROW 0, CONCAT(UPPER(LEFT(i.nombre,1)),LOWER(MID(i.nombre,2))), idEscuela, idProfesor
from facturacion.e01_factura f, facturacion.e01_detalle_factura df, facturacion.e01_producto i, escuelas e, profesores p
where f.nro_factura = df.nro_factura and df.codigo_producto = i.codigo_producto and
i.nombre <> '' and left(i.nombre,1) in ('a','b','c','d','f','t') and i.codigo_producto = p.idProfesor and e.idEscuela = f.nro_cliente
order by left(i.nombre,1);
delete from clases_estudiantes_estudiantes;
insert into clases_estudiantes_estudiantes
select c.idClase, e.idEstudiante
from clases c, estudiantes e
where e.idEstudiante*rand()*10 between floor((c.escuelaidEscuela-10)/10)*10 and ceil((c.escuelaidEscuela)/10)*10
order by 1,2;

update ciudades set nombre = 'Tres Arroyos' where idCiudad=7;