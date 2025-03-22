import { MediaCertificate } from '../types';
import sqlite3 from 'sqlite3';
import path from 'path';

export interface BlockchainService {
    registerDevicePublicKey(macAddress: string, publicKey: string): Promise<void>;
    storeCertificate(certificate: MediaCertificate): Promise<void>;
    getDevicePublicKey(macAddress: string): Promise<string>;
    verifyCertificate(certificate: MediaCertificate): Promise<boolean>;
}

export class SQLiteBlockchainService implements BlockchainService {
    private db: sqlite3.Database;

    constructor() {
        const dbPath = path.resolve(__dirname, '../../database.sqlite');
        this.db = new sqlite3.Database(dbPath);
        this.initializeDatabase();
    }

    public async initializeDatabase(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS device_keys (
                    macAddress TEXT PRIMARY KEY,
                    publicKey TEXT NOT NULL
                )
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise<void>((resolve, reject) => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS certificates (
                    macAddress TEXT,
                    signature TEXT,
                    mediaHash TEXT,
                    timestamp INTEGER,
                    version TEXT,
                    PRIMARY KEY (macAddress, mediaHash, signature)
                )
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async registerDevicePublicKey(macAddress: string, publicKey: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(
                `INSERT INTO device_keys (macAddress, publicKey) VALUES (?, ?)`,
                [macAddress, publicKey],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    }

    async storeCertificate(certificate: MediaCertificate): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(
                `INSERT INTO certificates (macAddress, signature, mediaHash, timestamp, version) VALUES (?, ?, ?, ?, ?)`,
                [certificate.macAddress, certificate.signature, certificate.mediaHash, certificate.timestamp, certificate.version],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    }

    async getDevicePublicKey(macAddress: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT publicKey FROM device_keys WHERE macAddress = ?`, [macAddress], (err, row: { publicKey: string }) => {
                if (err) reject(err);
                else if (!row) reject(new Error('Device public key not found'));
                else resolve(row.publicKey);
            });
        });
    }

    async verifyCertificate(certificate: MediaCertificate): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT 1 FROM certificates WHERE macAddress = ? AND mediaHash = ? AND signature = ?`,
                [certificate.macAddress, certificate.mediaHash, certificate.signature],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(!!row);
                }
            );
        });
    }
}