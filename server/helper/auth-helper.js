import bcrypt from 'bcrypt';
import User from '../models/user-model.js';

/**
 * Converts the given password into hash using bcrypt
 * 
 * @param {string} password - User entered password
 * @returns {string} - Hashed password
 */
export const passwordHashing = async(password)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;   
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * Compares the stored password and one entered during login
 * 
 * @param {string} password - User entered password
 * @param {string} storedHash - Password stored in database (hash)
 * @returns {boolean} 
 */
export const passwordComparison = async(password, storedHash)=>{
    const result = await bcrypt.compare(password, storedHash);
    return result;
}