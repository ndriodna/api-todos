import { CreateSchema } from "./TodoSchema"

export const UserFindSchema = {
    id: { type: 'number', min: 1 }
}

export const UserCraeteSchema = {
    user_id: FindSchema.id,
    full_name: { type: 'string', min: 3 },
    phone: { type: 'number', nullable: true },
    address: { type: 'string', nullable: true }
}
export const UserUpdateSchema = {
    id: FindSchema.id,
    CreateSchema
}