export const SUCCESS_CODE = 200;
export const CREATED_CODE = 201;
// Validation code
export const VALIDATION_CODE = 422;
// Utilisateur pas autorisé
export const UNAUTHORIRED_CODE = 403;
// Utilisateur Non connecté
export const UNAUTHENTICATED = 401;
// Url api incorrect
export const NOT_FOUND_CODE = 404;
// Erreur serveur
export const SERVER_ERROR_CODE = 500;
export const BAD_GATEWAY_CODE = 502;
export const SERVICE_UNAVAILABLE_CODE = 503;
export const GATEWAY_TIMEOUT_CODE = 504;


export const fetchSuccess = (status: number) => {
  return [SUCCESS_CODE, CREATED_CODE].includes(status);
};
