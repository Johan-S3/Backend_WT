# Creación del usuario
create user 'washtrack'@'localhost' identified by '#Aprendiz2024';

drop database if exists proyecto_wt;
# Creación de la base de datos
create database proyecto_wt;

grant all on proyecto_wt.* to washtrack@localhost;

flush privileges;