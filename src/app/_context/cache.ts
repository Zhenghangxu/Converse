import crypto from 'crypto';

// all POST requests are cached
// duration: 15 mins, can customize

export default class CacheRq {
    /**
     * Represents a cache object.
     */
    public cache: Map<string, any> = new Map();
    private cacheDuration: number = 15 * 60 * 1000;
    private algorithm: string = 'aes-256-cbc';
    private key: string = process.env.ENCRYPT_KEY || "mykeys" // Replace with your own encryption key
    private iv: Buffer = crypto.randomBytes(16);

    constructor(object:any) {
        // check if object is an object, and if its empty
        if (object && typeof object === 'object' && Object.keys(object).length) {
            Object.entries(object).forEach(([key, value]) => {
                this.set(key, value);
            });
            return this
        }
    }

    private async encrypt(value: any): Promise<string> {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encryptedValue = cipher.update(JSON.stringify(value), 'utf8', 'hex');
        encryptedValue += cipher.final('hex');
        return encryptedValue;
    }


    private decrypt(value: any): any {
        try {
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
            let decryptedValue = decipher.update(value, 'hex', 'utf8');
            decryptedValue += decipher.final('utf8');
            return JSON.parse(decryptedValue);
        } catch (error) {
            // console.log('Error decrypting value', error);
        }
    }

    /**
     * Sets a value in the cache.
     * @param key - The key to associate with the value.
     * @param value - The value to be stored in the cache.
     */
    public set(key: string, value: any) {
        const encryptedValue = this.encrypt(value);
        this.cache.set(key, { value: encryptedValue, timestamp: Date.now() });
    }

    /**
     * Retrieves the value associated with the specified key from the cache.
     * 
     * @param key - The key to retrieve the value for.
     * @returns The decrypted value associated with the key, or null if the key is not found or the value has expired.
     */
    public get(key: string) {
        const cacheValue = this.cache.get(key);
        if (!cacheValue) return null;

        const { value, timestamp } = cacheValue;
        if (Date.now() - timestamp > this.cacheDuration) {
            this.cache.delete(key);
            return null;
        }

        const decryptedValue = this.decrypt(value);
        return decryptedValue;
    }
}