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

export type ErrorResponseUserService =
    ErrorResponseBadRequest |
    ErrorResponseForbidden |
    ErrorResponseInternalServerError;