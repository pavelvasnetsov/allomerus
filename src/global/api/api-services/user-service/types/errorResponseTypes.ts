interface ErrorResponseBadRequest {
    fieldName: string;
    message: string;
}

interface ErrorResponseForbidden {
    message: string;
}

interface ErrorResponseInternalServerError {
    message: string;
}

export type ErrorResponse = 
    ErrorResponseBadRequest |
    ErrorResponseForbidden |
    ErrorResponseInternalServerError;