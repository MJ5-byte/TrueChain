# Deepfake Prevention System

## Overview
The Deepfake Prevention System is designed to ensure the authenticity of media content through cryptographic signatures and blockchain technology. This demo showcases how devices can capture media, sign it, and verify its authenticity using a simulated blockchain service.

## Features
- **Key Pair Generation**: Generate RSA key pairs for signing and verifying media.
- **Media Signing**: Capture media and sign it with a private key.
- **Certificate Generation**: Create certificates that embed media signatures and hashes.
- **Blockchain Simulation**: Register devices and store certificates on a mock blockchain.
- **Media Verification**: Verify the authenticity of media content against stored certificates.

## Prerequisites
Before running the demo, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

## Installation

Install the dependencies:

1. Install npm:
   ```bash
   npm install
   ```

2. Install sqlite3:
   ```bash
   npm install sqlite3
   ```

## Running the Demo

1. **Start the demo**:
   ```bash
   npm run demo
   ```

2. **View the demo output**: 
   The demo will run in the terminal, displaying logs of the various steps taken, including device registration, media capture, certificate generation, and verification results.

## Demo Workflow
The demo follows these steps:
1. **Device Registration**: A device is registered on the mock blockchain with its public key.
2. **Media Capture**: The device captures media content and signs it.
3. **Certificate Generation**: A certificate is generated that includes the media's signature and hash.
4. **Certificate Storage**: The certificate is stored on the mock blockchain.
5. **Media Verification**: The original media is verified against the stored certificate.
6. **Tampered Media Test**: The system tests verification with tampered media to demonstrate the detection of modifications.



