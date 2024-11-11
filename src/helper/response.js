export function response(res, code, status, message) {
    const result = {
        code: code,
        status: status,
        [code >= 200 && code <= 299 ? 'data' : 'message']: message
    }
    return res.status(code).json(result)
}