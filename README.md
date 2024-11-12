# Blockchain Cryptocurrency System

## Introduction

This project is a simplified implementation of a blockchain system designed for cryptocurrency transactions. It includes essential features like transaction creation, block mining, and chain validation. The system uses elliptic curve cryptography (ECC) for secure transaction signing and verification. Additionally, advanced modules detect and mitigate double-spending attacks, ensuring the integrity of the blockchain.

---

## Features
- **Secure Transactions**: Transactions are signed using ECC (secp256k1) for cryptographic security.
- **Block Mining**: Proof-of-Work (PoW) mechanism ensures integrity and rewards miners.
- **Double-Spending Detection**: Detects and resolves double-spending attacks using monitoring and alert modules.
- **Dynamic Blockchain Management**: Transactions are added to blocks, mined, and validated seamlessly.

---

## Prerequisites

1. **Operating System**: 
   - Windows 10 or higher
   - Linux (Ubuntu 20.04+ recommended)
   - macOS (10.15+)

2. **Software and Libraries**:
   - Node.js: Version 14.x or higher
   - npm: Version 6.x or higher
   - Modules:
     - `crypto-js`
     - `elliptic`
   - Development Tools: Visual Studio Code (or any preferred IDE).

---

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>