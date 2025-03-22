import { DeviceFirmware } from './firmware/DeviceFirmware';
import { CertificateService } from './services/CertificateService';
import { SQLiteBlockchainService } from './services/BlockchainService';
import { VerificationService } from './services/VerificationService';

async function runDemo() {
    console.log('🚀 Starting Deepfake Prevention System Demo\n');

    // Initialize services
    const macAddress = '00:1B:44:11:3A:B7';
    const device = new DeviceFirmware(macAddress);
    const certificateService = new CertificateService();
    const blockchainService = new SQLiteBlockchainService();
    await blockchainService.initializeDatabase(); // Ensure database is initialized
    const verificationService = new VerificationService(blockchainService);

    // Register device on blockchain
    console.log('📱 Registering device on blockchain...');
    await blockchainService.registerDevicePublicKey(macAddress, device.getPublicKey());
    console.log('✅ Device registered successfully\n');

    // Simulate capturing media
    console.log('📸 Capturing media...');
    const originalContent = Buffer.from('This is sample media content');
    const { signature, mediaHash, timestamp } = await device.captureAndSignMedia(originalContent);
    console.log('✅ Media captured and signed\n');

    // Generate and embed certificate
    console.log('📜 Generating certificate...');
    const certificate = certificateService.generateCertificate(
        macAddress,
        signature,
        mediaHash,
        timestamp
    );
    console.log('Certificate details:', certificate);

    const mediaWithCertificate = certificateService.embedCertificate(originalContent, certificate);
    console.log('✅ Certificate embedded in media\n');

    // Store certificate on blockchain
    console.log('🔗 Storing certificate on blockchain...');
    await blockchainService.storeCertificate(certificate);
    console.log('✅ Certificate stored on blockchain\n');

    // Verify original media
    console.log('🔍 Verifying original media...');
    const verificationResult = await verificationService.verifyMedia(originalContent, certificate);
    console.log('Verification result:', verificationResult, '\n');

    // Simulate tampered media
    console.log('🚨 Testing with tampered media...');
    const tamperedContent = Buffer.from('This is tampered media content');
    const tamperedVerification = await verificationService.verifyMedia(tamperedContent, certificate);
    console.log('Tampered media verification result:', tamperedVerification);
}

// Run the demo
runDemo().catch(console.error);