export function NotFoundError(text) {
    return { code: 404, status: 'Not Found', msg: text ? text : 'DATA NOT FOUND' }
}
export function InternalServerError(text) {
    return { code: 500, status: 'Internal Server Error', msg: text }
}

export function BadRequestError(text) {
    return { code: 400, status: 'Bad Request', msg: text }
}


export function UnauthorizedError(text) {
    return { code: 401, status: 'Unauthorized', msg: text }
}