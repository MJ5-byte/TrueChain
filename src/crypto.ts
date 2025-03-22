import crypto from 'crypto';
import { KeyPair } from './types';

export function generateKeyPair(): KeyPair {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    return { privateKey, publicKey };
}

export function calculateHash(content: Buffer): string {
    return crypto.createHash('sha256').update(content).digest('hex');
}

export function signContent(content: object, privateKey: string): string {
    const sign = crypto.createSign('SHA256');
    sign.update(JSON.stringify(content));
    return sign.sign(privateKey, 'base64');
}

export function verifySignature(content: object, signature: string, publicKey: string): boolean {
    const verify = crypto.createVerify('SHA256');
    verify.update(JSON.stringify(content));
    return verify.verify(publicKey, signature, 'base64');
} 