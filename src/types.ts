export interface KeyPair {
    privateKey: string;
    publicKey: string;
}

export type DigitalSignature = string;
export type MediaHash = string;

export interface MediaCertificate {
    macAddress: string;
    signature: DigitalSignature;
    mediaHash: MediaHash;
    timestamp: number;
    version: string;
} 