import bcrypt from 'bcrypt';
import User from '../models/user-model.js';

export const passwordHashing = async(password)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;   
    } catch (error) {
        console.error(error.message);
    }
}

export const passwordComparison = async(password, storedHash)=>{
    const result = await bcrypt.compare(password, storedHash);
    return result;
}