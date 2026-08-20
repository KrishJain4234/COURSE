/**
 * SecureVault Enterprise API Service
 * Mock service layer simulating cryptographic ledger verification,
 * tamper-proof hash generation, and certificate verification.
 */

const STORAGE_KEY = 'eduverse_securevault_ledger';

// Helper to get stored ledger
const getLedger = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to read SecureVault ledger:', e);
    return {};
  }
};

// Helper to save ledger
const saveLedger = (ledger) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ledger));
  } catch (e) {
    console.error('Failed to save SecureVault ledger:', e);
  }
};

// Generate deterministic pseudo-SHA256 hash for enterprise authenticity simulation
const generateHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x8f4b${hex}e92c4a71d88b901a${hex.slice(0, 4)}f5c2`;
};

export const secureVaultApi = {
  /**
   * Generates a tamper-proof certificate in the SecureVault ledger
   */
  generateCertificate: async ({
    courseId,
    courseTitle,
    learnerId = 'STU-2026-001',
    learnerName = 'Krish Jain',
    institution = 'BMS Institute of Technology',
    grade = 'Distinction (96.4%)',
    creditHours = '24 CPE Credits'
  }) => {
    // Simulate brief network delay for enterprise realism
    await new Promise((resolve) => setTimeout(resolve, 350));

    const ledger = getLedger();
    
    // Check if certificate already exists
    const existing = Object.values(ledger).find(
      (c) => c.courseId === courseId && c.learnerId === learnerId
    );
    if (existing) {
      return { success: true, certificate: existing, isExisting: true };
    }

    // Generate unique Certificate ID format: EDU-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const certificateId = `EDU-2026-${randomSuffix}`;
    const issueDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timestampIso = new Date().toISOString();

    const signatureHash = generateHash(`${certificateId}-${learnerId}-${courseId}-${timestampIso}`);
    const blockNumber = 14285900 + Math.floor(Math.random() * 10000);

    const certificate = {
      certificateId,
      courseId,
      courseTitle,
      learnerId,
      learnerName,
      institution,
      issueDate,
      issuedAt: timestampIso,
      status: 'Verified',
      verificationStatus: 'SecureVault Enabled',
      securityLevel: 'Enterprise Tier 3 Compliant',
      signatureHash,
      blockNumber,
      grade,
      creditHours,
      issuer: 'EduVerse Academic Certification Board & BMS Institute of Technology',
      signatories: [
        { name: 'Dr. Ramesh Sundaram', role: 'Dean of Academic Affairs, BMSIT' },
        { name: 'Dr. Aris Thorne', role: 'Director of Enterprise Learning, EduVerse' }
      ],
      qrVerificationUrl: `https://verify.eduverse.com/cert/${certificateId}`
    };

    ledger[certificateId] = certificate;
    saveLedger(ledger);

    return {
      success: true,
      certificate,
      message: 'Certificate successfully generated and anchored into SecureVault ledger.'
    };
  },

  /**
   * Verifies authenticity against the immutable ledger
   */
  verifyCertificate: async (certificateId) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const ledger = getLedger();
    const cert = ledger[certificateId];

    if (!cert) {
      return {
        success: false,
        verified: false,
        error: 'Certificate ID not found in the SecureVault Ledger or record may be invalid.'
      };
    }

    return {
      success: true,
      verified: true,
      certificate: cert,
      verificationTimestamp: new Date().toISOString(),
      ledgerMetadata: {
        network: 'SecureVault Enterprise Consortium Ledger',
        protocolVersion: 'v4.2.0',
        cryptographicProof: 'SHA256-RSA-4096-ECC',
        tamperProofState: 'INTEGRITY_VERIFIED'
      }
    };
  },

  /**
   * Retrieves certificate metadata for export/print
   */
  downloadCertificate: async (certificateId) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const ledger = getLedger();
    const cert = ledger[certificateId];

    if (!cert) {
      throw new Error('Certificate record not found.');
    }

    return {
      success: true,
      certificate: cert,
      exportFormat: 'PDF/A Enterprise ISO-19005',
      downloadUrl: `#download-${certificateId}`
    };
  },

  /**
   * Get all certificates in ledger for a learner
   */
  getAllCertificates: () => {
    const ledger = getLedger();
    return Object.values(ledger);
  },

  /**
   * Seed default initial certificates if not present
   */
  seedInitialCertificates: (initialCerts) => {
    const ledger = getLedger();
    let updated = false;
    initialCerts.forEach((cert) => {
      if (!ledger[cert.certificateId]) {
        ledger[cert.certificateId] = cert;
        updated = true;
      }
    });
    if (updated) {
      saveLedger(ledger);
    }
  }
};
