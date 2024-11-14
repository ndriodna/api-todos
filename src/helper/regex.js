export function sanitize(input) {
    return input?.replace(/[^\w-]/g, "")
}

export function isEmail(input) {
    return input.test(/^[\w-\.]+@([\w-]+\.)+[\w]{2,}/g)
}