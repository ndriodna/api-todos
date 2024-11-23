import { response } from "../utils/response.js";

export default function RouteNotFoundMiddleware(req, res) {
    return response(res, 404, 'ROUTE NOT FOUND', 'halaman tidak ditemukan, pastikan alamat url benar')
}