#!/bin/sh

echo ":::::::::: Iniciando contenedor Backend ::::::::::" >&1
echo "" >&1

echo ":::::::::: Ejecutando migraciones ::::::::::" >&1
npm run migration:run
echo "" >&1

echo ":::::::::: Ejecutando seeds ::::::::::" >&1
npm run migration:seed
echo "" >&1

echo ":::::::::: Iniciando servidor NEST JS ::::::::::"
exec npm run start
