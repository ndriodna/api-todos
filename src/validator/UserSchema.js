export const UserFindSchema = {
    id: { type: 'number', min: 1 }
}

export const UserFindByEmaildSchema = {
    email: { type: 'email', messages: { email: "format email tidak sesuai" } },
}

export const UserUpdateSchema = {
    full_name: { type: 'string', min: 3 },
    phone: { type: 'number', nullable: true },
    address: { type: 'string', nullable: true }
}

export const RegisterSchema = {
    email: { type: 'email', messages: { email: "format email tidak sesuai" } },
    username: { type: 'string', min: 4, messages: { stringMin: "panjang username minimal 4 karakter" } },
    password: { type: 'string', min: 8, messages: { stringMin: "password minimal 8 karakter" } }
}

export const LoginSchema = {
    email: { type: 'email', messages: { email: "format email tidak sesuai" } },
    password: { type: 'string', min: 8, messages: { stringMin: "password minimal 8 karakter" } }
}

export const ForgotPasswordSchema = {
    email: { type: 'email', messages: { email: 'format email tidak sesuai' } },
    otp: { type: 'number', min: 6, message: { otp: 'invalid otp' } },
    password: { type: 'string', min: 8, messages: { stringMin: "password minimal 8 karakter" } }
}

export const RegisterVerifySchema = {
    email: { type: 'email', messages: { email: "format email tidak sesuai" } },
    otp: { type: 'number', min: 6, message: { otp: 'invalid otp' } },
}