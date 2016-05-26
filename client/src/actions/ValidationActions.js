import {VALIDATE_AUTH_FIELD, VALIDATE_USER_DETAILS_FIELD} from '../constants';

export function validateAuthField (field) {
  return {
    type: VALIDATE_AUTH_FIELD,
    field
  };
}

export function validateUserDetailsField (field) {
  return {
    type: VALIDATE_USER_DETAILS_FIELD,
    field
  };
}
