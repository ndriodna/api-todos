export function response(res, code = 500, status, message) {
    const result = {
        code: code,
        status: status,
        [code >= 200 && code <= 299 ? 'data' : 'message']: message
    }
    res.set('Content-Type', 'application/json');
    return res.status(code).json(result)
}