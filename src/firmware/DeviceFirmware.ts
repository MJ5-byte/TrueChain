import { KeyPair, DigitalSignature, MediaHash } from '../types';
import { generateKeyPair, signContent, calculateHash } from '../crypto';

export class DeviceFirmware {
    private macAddress: string;
    private keyPair: KeyPair;

    constructor(macAddress: string) {
        this.macAddress = macAddress;
        this.keyPair = generateKeyPair();
    }

    public async captureAndSignMedia(mediaContent: Buffer): Promise<{
        signature: DigitalSignature;
        mediaHash: MediaHash;
        timestamp: number;
    }> {
        const timestamp = Date.now();
        const mediaHash = calculateHash(mediaContent);

        const signature = signContent({
            mediaHash,
            macAddress: this.macAddress,
            timestamp
        }, this.keyPair.privateKey);

        return {
            signature,
            mediaHash,
            timestamp
        };
    }

    public getPublicKey(): string {
        return this.keyPair.publicKey;
    }
} 