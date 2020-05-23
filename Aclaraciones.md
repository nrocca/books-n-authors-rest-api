# books-n-authors-rest-api
Ejercicio Rest Api with NodeJs
Aclaraciones sobre el trabajo:
1) GET para los libros muestra el nombre del autor en lugar del id, en caso que se postee un libro y no esté su autor,
    se aclara que no hay un autor con esa id aún.
2) DELETE para los autores elimina también todos los libros que hayan registrados del autor eliminado.
3) Tanto para autores como para libros, POST no permite postear un libro y/o autor con un id preexistente en los JSON's.
4) Están implementados mensajes de excecpción para manejo de errores para TODOS los métodos, como así mensajes
  para una operación existosa, contemplando las siguientes excepciones:
  a) Intentar postear un autor/libro cuyo id ya exista en los JSON's.
  b) Intentar modificar un autor/libro cuyo id no exista en los JSON's.
  c) Intentar eliminar un autor/libro cuyo id no exista en los JSON's.
