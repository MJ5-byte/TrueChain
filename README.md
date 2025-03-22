# TrueChain: Blockchain-Based Digital Certificate Authentication

## Overview
TrueChain is an innovative cybersecurity solution designed to combat deepfakes and AI voice replication. It leverages **blockchain-based digital certificates** embedded within camera and microphone firmware to ensure the authenticity of video, image, and audio recordings in real time.

## Features
- **Real-Time Authentication**: Validates media authenticity at the moment of capture.
- **Blockchain Integration**: Uses a permissioned blockchain to store and verify digital certificates.
- **Tamper-Proof Security**: Prevents manipulation of metadata and digital certificates.
- **Seamless Integration**: Designed for hardware manufacturers to implement directly into camera and mic firmware.
- **Open Standard**: Allows third-party developers to integrate verification into their platforms.

## How It Works
1. **Certificate Generation**: Each media capture device (camera/mic) generates a unique cryptographic signature embedded within the media file.
2. **Blockchain Registration**: The digital certificate is recorded on a permissioned blockchain.
3. **Verification**: Platforms and users can verify authenticity using the blockchain-stored certificate.
4. **Tamper Detection**: If any alterations occur, verification will fail, flagging the content as potentially manipulated.

## Use Cases
- **Journalism & Media**: Ensuring video authenticity in news reporting.
- **Video Conferencing**: Preventing AI-generated deepfake attendees.
- **Law Enforcement**: Authenticating digital evidence.
- **Social Media Platforms**: Offering users the ability to verify media authenticity.

## Technology Stack
- **Blockchain**: Permissioned blockchain for certificate storage.
- **Cryptography**: Digital signatures for verification.
- **Firmware Integration**: Works at the hardware level with camera/mic manufacturers.
- **APIs & Plugins**: Enables third-party integration.

## Deepfake Prevention System

### Overview
The Deepfake Prevention System is designed to ensure the authenticity of media content through cryptographic signatures and blockchain technology. This demo showcases how devices can capture media, sign it, and verify its authenticity using a simulated blockchain service.

### Features
- **Key Pair Generation**: Generate RSA key pairs for signing and verifying media.
- **Media Signing**: Capture media and sign it with a private key.
- **Certificate Generation**: Create certificates that embed media signatures and hashes.
- **Blockchain Simulation**: Register devices and store certificates on a mock blockchain.
- **Media Verification**: Verify the authenticity of media content against stored certificates.

### Prerequisites
Before running the demo, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

Install the dependencies:

1. Install npm:
   ```bash
   npm install
   ```

2. Install sqlite3:
   ```bash
   npm install sqlite3
   ```

### Running the Demo

1. **Start the demo**:
   ```bash
   npm run demo
   ```

2. **View the demo output**: 
   The demo will run in the terminal, displaying logs of the various steps taken, including device registration, media capture, certificate generation, and verification results.

### Demo Workflow
The demo follows these steps:
1. **Device Registration**: A device is registered on the mock blockchain with its public key.
2. **Media Capture**: The device captures media content and signs it.
3. **Certificate Generation**: A certificate is generated that includes the media's signature and hash.
4. **Certificate Storage**: The certificate is stored on the mock blockchain.
5. **Media Verification**: The original media is verified against the stored certificate.
6. **Tampered Media Test**: The system tests verification with tampered media to demonstrate the detection of modifications.

## Contributors
- **Hamad Mohamed**
- **Sara AlShamari**
- **Mohamed Jameel Ahmed**
- **Fatema Alawadhi**
- **Ayat Ahmed**

## Future Improvements
- Expanding support for additional media formats.
- Enhancing verification speed and scalability.
- Partnering with hardware manufacturers for widespread adoption.

## License
This project is open-source and available for collaboration.

## Contact
For more information or collaboration opportunities, please reach out to any of the contributors.
