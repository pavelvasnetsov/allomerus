type ErrorResponseBadRequest = ErrorResponseInternalServerError[];

interface ErrorResponseForbidden {
    message: string;
};

interface ErrorResponseInternalServerError {
    fieldName: string;
    message: string;
};

export type ErrorResponse = 
    ErrorResponseBadRequest |
    ErrorResponseForbidden |
    ErrorResponseInternalServerError;