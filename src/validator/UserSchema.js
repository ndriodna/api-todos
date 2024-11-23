export const UserFindSchema = {
    id: { type: 'number', min: 1 }
}

export const UserUpdateSchema = {
    full_name: { type: 'string', min: 3 },
    phone: { type: 'number', nullable: true },
    address: { type: 'string', nullable: true }
}

export const RegisterSchema = {
    email: { type: 'email', messages: { email: "email tidak sesuai" } },
    username: { type: 'string', min: 4, messages: { stringMin: "panjang username minimal 4 karakter" } },
    password: { type: 'string', min: 8, messages: { stringMin: "password minimal 8 karakter" } }
}

export const LoginSchema = {
    email: { type: 'email', messages: { email: "email tidak sesuai" } },
    password: { type: 'string', min: 8, messages: { stringMin: "password minimal 8 karakter" } }
}