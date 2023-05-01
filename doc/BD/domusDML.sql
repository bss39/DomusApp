use domus;

delete from Accion;
delete from Elemento;
delete from Usuario;

insert into Usuario (nombre, pin, administrador) 
values ('Andres', 1234, false), ('Juan', 1234, false), ('Liliana', 1234, true), ('Rosa', 1234, false);

insert into Elemento (nombre, estado, descripcion, icono) 
values ('Luz entrada', 'Encendido', 'Es la luz de la entrada', 'luz'),
		('Radio', 'Apagado', 'La radio de la habitación', 'radio'),
        ('Television', 'Encendido', 'Television del salon', 'tv');
        
insert into Accion (descripcion, fecha, hora, usuario_id, elemento_id) 
values ('Luz encendida', '2023-01-19', '15:39', 1, 1),
		('Luz apagada', '2023-01-19', '15:42', 2, 1),
        ('Radio encendida', '2023-01-20', '16:02', 1, 2);