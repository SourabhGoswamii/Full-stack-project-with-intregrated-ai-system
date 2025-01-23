import usermodels from '../models/user.model.js';


export const createUser = async ({email, password}) => {

    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const hashedPassword = await usermodels.hashPassword(password);
    const user = await usermodels.create({
        email,
        password: hashedPassword
    });

    return user;

}
