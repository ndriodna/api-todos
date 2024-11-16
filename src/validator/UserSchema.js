export const FindSchema = {
    id: { type: "number", min: 1 }
}

export const CreateSchema = {
    name: { type: "string", min: 2 },
    status: { type: "string", min: 4, default: "ON GOING" }
}

export const UpadteSchema = {
    id: FindSchema.id,
    name: CreateSchema.name,
    status: CreateSchema.status
}



