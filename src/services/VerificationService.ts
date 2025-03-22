import { MediaCertificate } from '../types';
import { BlockchainService } from './BlockchainService';
import { verifySignature, calculateHash } from '../crypto';

export class VerificationService {
    constructor(private blockchainService: BlockchainService) { }

    public async verifyMedia(mediaContent: Buffer, certificate: MediaCertificate): Promise<{
        isAuthentic: boolean;
        reason?: string;
    }> {
        try {
            // 1. Verify the certificate exists on blockchain
            const isValidCert = await this.blockchainService.verifyCertificate(certificate);
            if (!isValidCert) {
                return { isAuthentic: false, reason: 'Certificate not found on blockchain' };
            }

            // 2. Get device public key
            const publicKey = await this.blockchainService.getDevicePublicKey(certificate.macAddress);

            // 3. Verify signature
            const isValidSignature = verifySignature({
                mediaHash: certificate.mediaHash,
                macAddress: certificate.macAddress,
                timestamp: certificate.timestamp
            }, certificate.signature, publicKey);

            if (!isValidSignature) {
                return { isAuthentic: false, reason: 'Invalid signature' };
            }

            // 4. Verify media hash
            const currentHash = calculateHash(mediaContent);
            if (currentHash !== certificate.mediaHash) {
                return { isAuthentic: false, reason: 'Media content has been modified' };
            }

            return { isAuthentic: true };
        } catch (error: unknown) {
            // Type assertion to handle the error correctly
            const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
            throw new Error(`Verification failed: ${errorMessage}`);
        }
    }
} 