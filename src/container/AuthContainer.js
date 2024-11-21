import AuthController from "../controller/AuthController.js"
import AuthRepository from "../repository/AuthRepository.js"
import UserRepository from "../repository/UserRepository.js"
import AuthService from "../service/AuthService.js"


export default function NewAuth(db, validator) {
    const repository = AuthRepository(db)
    const userRepo = UserRepository(db)
    const service = AuthService(repository, userRepo, db, validator)
    const controller = AuthController(service)
    return controller
}