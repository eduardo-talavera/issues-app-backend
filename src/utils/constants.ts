import dotenv from 'dotenv';

dotenv.config();

export const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES = '15m',
  REFRESH_TOKEN_EXPIRES = '7d',
  MONGO_URI,
  NODE_ENV='development',
  CORS_STRATEGY,
  FRONTEND_URL
} = process.env;


export const titleIssues = [
  'Error al iniciar sesión',
  'La página no carga correctamente',
  'Botón de guardar no funciona',
  'Error 500 en el servidor',
  'Problema con la autenticación de usuarios',
  'Los estilos no se aplican correctamente',
  'El mapa no muestra la ubicación',
  'Fallo en la actualización de datos',
  'Error al eliminar un registro',
  'Los filtros no funcionan como se espera',
  'La sesión expira demasiado rápido',
  'Problema con la base de datos',
  'La búsqueda no arroja resultados correctos',
  'El componente de notificaciones no se renderiza',
  'El token de acceso no se renueva correctamente',
  'Error al enviar el formulario de contacto',
  'Los permisos no se asignan correctamente',
  'Los correos automáticos no se envían',
  'La interfaz se congela al cargar los datos',
  'Problema con la integración del API',
];

export const descriptionIssues = [
  'El usuario intenta iniciar sesión pero el sistema arroja un error desconocido.',
  'Al cargar la página principal, se queda en blanco y no muestra el contenido.',
  'El botón de guardar cambios no realiza ninguna acción al hacer clic.',
  'El servidor responde con un error interno al realizar ciertas solicitudes.',
  'La autenticación con token no valida correctamente las credenciales.',
  'Los estilos CSS parecen no aplicarse en el entorno de producción.',
  'El mapa no muestra correctamente la ubicación actual del usuario.',
  'La función de actualización de datos no guarda los cambios realizados.',
  'Al intentar eliminar un registro, se muestra un mensaje de error inesperado.',
  'Los filtros no están aplicando los criterios seleccionados correctamente.',
  'La sesión del usuario se cierra automáticamente tras pocos minutos de uso.',
  'El sistema no logra conectar con la base de datos de usuarios.',
  'La búsqueda devuelve resultados vacíos aunque existan coincidencias.',
  'El componente de notificaciones no se muestra al recibir nuevos mensajes.',
  'El token de acceso expira sin que el refresh token lo renueve.',
  'El formulario de contacto no envía los datos al servidor.',
  'Los permisos de usuario no se actualizan tras modificar los roles.',
  'Los correos automáticos no se disparan tras crear una nueva cuenta.',
  'La interfaz se congela al realizar una consulta con muchos datos.',
  'La integración con el API externo devuelve errores de autenticación.',
];
