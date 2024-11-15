export function sanitize(input) {
    return input?.replace(/[^\w-]/g, "")
}

export function isEmail(input) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w]{2,}/g
    return regex.test(input)
}

export function isId(input) {
    const regex = /^\d+$/g
    return regex.test(input)
}