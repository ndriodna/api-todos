import { response } from "../utils/response.js";

export default function ErrorMiddleware(err, req, res, next) {
    return response(res, err?.code, err?.status, err?.message)
}