export const HttpStatus = {
    OK: { value: 200, message: 'OK' },
    CREATED: { value: 201, message: 'Created' },
    ACCEPTED: { value: 202, message: 'Accepted' },
    BAD_REQUEST: { value: 400, message: 'Bad Request' },
    UNAUTHORIZED: { value: 401, message: 'Unauthorized' },
    FORBIDDEN: { value: 403, message: 'Forbidden' },
    NOT_FOUND: { value: 404, message: 'Not Found' },
    PRECONDITION_FAILED: { value: 412, message: 'Precondition Failed' },
    INTERNAL_SERVER_ERROR: { value: 500, message: 'Internal Server Error' },
    SERVICE_UNAVAILABLE: { value: 503, message: 'Service Unavailable' },
    GATEWAY_TIMEOUT: { value: 504, message: 'Gateway Timeout' }
}