import { response } from "../utils/response.js";

export default function ErrorMiddleware(err, req, res, next) {
    console.error('Error stack:', err);
    return response(res, err?.code, err?.status, typeof err.msg !== "object" ? err.msg : err.msg.message)
}