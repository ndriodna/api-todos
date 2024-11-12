import {query} from "../db/db.js";

export function findAll() {
    try {
        return query('select * from todo', [])
    }catch (e) {
        return e
    }
}
export function findOne(id) {

}
export function create() {
    
}

export function Update() {
    
}
export function Delete() {

}
