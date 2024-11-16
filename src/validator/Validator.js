import Validator from "fastest-validator"
import { BadRequestError } from "../exception/error.js"

const validator = new Validator()


export function validate(data, schema) {
    const check = validator.compile(schema)
    return check(data)
}

export function check(valid) {
    if (Array.isArray(valid)) {
        throw BadRequestError(valid[0].message)
    }
}