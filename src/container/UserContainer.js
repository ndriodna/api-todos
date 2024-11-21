import UserController from "../controller/UserController.js";
import UserRepository from "../repository/UserRepository.js";
import UserService from "../service/UserService.js";

export default function NewUser(db, validator) {
    const repository = UserRepository(db)
    const service = UserService(repository, validator)
    const controller = UserController(service)
    return controller
}