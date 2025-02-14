import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
/**
 * function mã hóa dữ liệu
 * @param data
 * @returns
 */
export async function bcryptGenerateHash(
    data: string,
    salt: number = SALT_ROUNDS,
): Promise<string> {
    return await bcrypt.hash(data, salt);
}
/**
 * function so sánh dữ liệu mã hóa và dữ liệu nhập
 * @param data
 * @param hash
 * @returns
 */
export async function bcryptCompareHash(
    data: string,
    hash: string,
): Promise<boolean> {
    return await bcrypt.compare(data, hash);
}

/**
 * @description Determines whether a password string is hashed.
 * @param {string} password - The password string to check.
 * @returns {boolean} True if the password appears to be hashed, false otherwise.
 */
export function isBcryptHashedPassword(password: string): boolean {
    return (
        password.startsWith('$2a$') ||
        password.startsWith('$2b$') ||
        password.startsWith('$2y$')
    );
}
