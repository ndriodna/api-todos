export function response(res, code = 500, status, message) {
    const result = {
        code: code,
        status: status,
        [code >= 200 && code <= 299 ? 'data' : 'message']: message
    }
    res.set('Content-Type', 'application/json');
    return res.status(code).json(result)
}

export function resCookie(res, token) {
    return res.cookie('Authorization', token, {
        httpOnly: true,
        secure: false,
        sameSite: false,
        maxAge: 36000 * 1000
    })
}

export function resClearCookie(res, token) {
    return res.clearCookie('Authorization', token, {
        httpOnly: true,
        secure: false,
        sameSite: false,
        maxAge: 36000 * 1000
    })
}