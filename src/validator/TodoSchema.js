export const FindSchema = {
    id: { type: "number", min: 1 }
}

export const CreateSchema = {
    name: { type: "string", min: 2 },
    status: { type: "string", min: 2, default: "ON GOING" },
    user_id: { type: 'number', min: 1 }
}

export const UpdateSchema = {
    id: { type: "number", min: 1 },
    name: { type: "string", min: 2, optional: true },
    status: { type: "string", min: 2, optional: true },
}



