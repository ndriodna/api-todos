export function NotFoundError(msg) {
    return { code: 404, status: 'Not Found', message: 'DATA NOT FOUND' }
}
export function InternalServerError(msg) {
    return { code: 500, status: 'Internal Server Error', message: msg }
}

export function BadRequestError(msg) {
    return { code: 400, status: 'Bad Request', message: msg }
}


export function UnauthorizedError(msg) {
    return { code: 401, status: 'Unauthorized', message: msg }
}