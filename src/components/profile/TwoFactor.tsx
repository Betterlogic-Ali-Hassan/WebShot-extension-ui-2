"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ConfirmationDialog } from "../ui/ConfirmationDialog";
import { Toast } from "../ui/toast";

interface TwoFactorSetupProps {
  onComplete: () => void;
  onCancel: () => void;
}

const BACKUP_CODES = [
  "ABCD-EFGH-IJKL",
  "MNOP-QRST-UVWX",
  "YZAB-CDEF-GHIJ",
  "KLMN-OPQR-STUV",
  "WXYZ-ABCD-EFGH",
  "IJKL-MNOP-QRST",
  "UVWX-YZAB-CDEF",
  "GHIJ-KLMN-OPQR",
];

export function TwoFactorSetup({ onComplete, onCancel }: TwoFactorSetupProps) {
  const [setupStep, setSetupStep] = useState(1);
  const [authMethod, setAuthMethod] = useState<"app" | "sms">("app");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [setupComplete, setSetupComplete] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const printFrameRef = useRef<HTMLIFrameElement>(null);

  // Handle verification code input
  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Handle verification code paste
  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const cleanedData = pastedData.replace(/\D/g, "").slice(0, 6);

    if (cleanedData.length > 0) {
      const newCode = [...verificationCode];
      for (let i = 0; i < cleanedData.length && i < 6; i++) {
        newCode[i] = cleanedData[i];
      }
      setVerificationCode(newCode);

      // Focus last filled input or next empty one
      const lastIndex = Math.min(cleanedData.length, 5);
      const nextInput = document.getElementById(`code-${lastIndex}`);
      nextInput?.focus();
    }
  };

  // Verify code and proceed
  const verifyCode = () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      // In a real app, you would validate this code against the server
      setSetupStep(4);
    } else {
      Toast.success("Please enter a valid 6-digit code");
    }
  };

  // Complete 2FA setup
  const complete2FASetup = () => {
    setSetupComplete(true);
    // In a real app, you would save this preference to the server
    Toast.success("2FA has been successfully set up!");
    onComplete();
  };

  // Reset 2FA setup
  const reset2FASetup = () => {
    setShowCancelDialog(true);
  };

  // Function to download backup codes as a text file
  const downloadCodes = () => {
    const codesText = BACKUP_CODES.join("\n");
    const blob = new Blob([codesText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-codes.txt";
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Toast.success("Backup codes downloaded successfully!");
  };

  // Function to print backup codes
  const printCodes = () => {
    if (!printFrameRef.current) return;

    const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>2FA Backup Codes</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { font-size: 18px; margin-bottom: 15px; }
        .codes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .code { font-family: monospace; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        .info { margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <h1>Two-Factor Authentication Backup Codes</h1>
      <div class="codes">
        ${BACKUP_CODES.map((code) => `<div class="code">${code}</div>`).join(
          ""
        )}
      </div>
      <div class="info">
        <p>Keep these codes in a safe place. Each code can only be used once.</p>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
      </div>
    </body>
    </html>
  `;

    const iframe = printFrameRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(printContent);
      iframeDoc.close();

      // Wait for content to load before printing
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      }, 250);
    }
  };

  // Function to copy backup codes to clipboard
  const copyToClipboard = async () => {
    const codesText = BACKUP_CODES.join("\n");

    try {
      await navigator.clipboard.writeText(codesText);
      setCopySuccess(true);

      // Reset success message after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      Toast.error("Failed to copy codes. Please try again.");
      console.error("Failed to copy: ", err);
    }
  };

  if (setupComplete) {
    return (
      <div className='mt-6 p-5 rounded-lg border border-border bg-card'>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <div className='w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-info text-text-primary'>
              <Check />
            </div>
            <div>
              <h4 className='font-medium'>Two-Factor Authentication Enabled</h4>
              <p className='text-sm opacity-70'>
                Your account is now protected with 2FA
              </p>
            </div>
          </div>

          <div className='flex gap-3 mt-4'>
            <button
              onClick={() => {
                setSetupComplete(false);
                setSetupStep(4);
              }}
              className='px-4 py-2 rounded-lg text-sm transition-colors border hover:bg-hover'
            >
              View Backup Codes
            </button>

            <button
              onClick={() => setShowDisableDialog(true)}
              className='px-4 py-2 rounded-lg text-sm transition-colors bg-error text-text-primary hover:bg-error'
            >
              Disable 2FA
            </button>
          </div>
        </div>

        {/* Disable 2FA Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={showDisableDialog}
          title='Disable Two-Factor Authentication'
          message='Are you sure you want to disable 2FA? This will make your account less secure.'
          confirmText='Disable 2FA'
          confirmVariant='danger'
          onConfirm={() => {
            setShowDisableDialog(false);
            onCancel();
          }}
          onCancel={() => setShowDisableDialog(false)}
        />
      </div>
    );
  }

  return (
    <div className='mt-6 p-5 rounded-lg border border-border bg-card/50'>
      <div className='space-y-6'>
        {/* Progress indicator */}
        <div className='flex items-center mb-2'>
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                  setupStep === step
                    ? "bg-info text-text-primary"
                    : setupStep > step
                    ? "bg-info text-text-primary"
                    : "bg-hover text-foreground"
                )}
              >
                {setupStep > step ? <Check size={16} /> : step}
              </div>
              {step < 4 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1",
                    setupStep > step ? "bg-info" : "bg-border"
                  )}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Choose 2FA Method */}
        {setupStep === 1 && (
          <div>
            <h4 className='text-sm font-medium mb-3'>
              Step 1: Choose Authentication Method
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div
                onClick={() => setAuthMethod("app")}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer flex items-center bg-background",
                  authMethod === "app" ? " border-info" : " border-border"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center",
                    authMethod === "app" ? "border-info" : "border-border"
                  )}
                >
                  {authMethod === "app" && (
                    <div className='w-2.5 h-2.5 rounded-full bg-info'></div>
                  )}
                </div>
                <div>
                  <p className='font-medium text-sm'>Authenticator App</p>
                  <p className='text-xs opacity-70'>
                    Google Authenticator, Authy, etc.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setAuthMethod("sms")}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer flex items-center bg-background",
                  authMethod === "sms" ? " border-info" : " border-border"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center",
                    authMethod === "sms" ? "border-info" : "border-border"
                  )}
                >
                  {authMethod === "sms" && (
                    <div className='w-2.5 h-2.5 rounded-full bg-info'></div>
                  )}
                </div>
                <div>
                  <p className='font-medium text-sm'>SMS Authentication</p>
                  <p className='text-xs opacity-70'>
                    Receive codes via text message
                  </p>
                </div>
              </div>
            </div>

            <div className='flex justify-between mt-6'>
              <button
                onClick={reset2FASetup}
                className='px-4 py-2 rounded-lg text-sm transition-colors bg-background hover:bg-hover border '
              >
                Cancel
              </button>

              <button
                onClick={() => setSetupStep(2)}
                className='px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-text hover:bg-text/80 text-card'
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Setup Method (QR Code for App or Phone Number for SMS) */}
        {setupStep === 2 && (
          <div>
            <h4 className='text-sm font-medium mb-3'>
              {authMethod === "app"
                ? "Step 2: Scan QR Code"
                : "Step 2: Verify Phone Number"}
            </h4>

            {authMethod === "app" ? (
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='p-3 rounded-lg border bg-background border-border inline-flex items-center justify-center'>
                  <div className='w-32 h-32 bg-foreground flex items-center justify-center'>
                    <div className='text-xs text-background text-center'>
                      QR Code
                      <br />
                      Placeholder
                    </div>
                  </div>
                </div>
                <div className='space-y-3'>
                  <p className='text-sm'>
                    Scan this QR code with your authenticator app.
                  </p>
                  <p className='text-sm opacity-70'>
                    If you can't scan the QR code, you can manually enter this
                    setup key:
                  </p>
                  <div className='p-2 rounded border font-mono text-sm break-all bg-card border-border'>
                    JBSW Y3DP EHPK 3PXP
                  </div>
                </div>
              </div>
            ) : (
              <div className='space-y-4'>
                <p className='text-sm'>
                  Enter your phone number to receive verification codes via SMS.
                </p>

                <div>
                  <label
                    htmlFor='phone-number'
                    className='block text-sm font-medium mb-1.5'
                  >
                    Phone Number
                  </label>
                  <input
                    id='phone-number'
                    type='tel'
                    placeholder='+1 (555) 123-4567'
                    className='w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border focus:ring-info'
                  />
                </div>
              </div>
            )}

            <div className='flex justify-between mt-6'>
              <button
                onClick={() => setSetupStep(1)}
                className='px-4 py-2 rounded-lg text-sm transition-colors bg-background hover:bg-hover border '
              >
                Back
              </button>

              <button
                onClick={() => setSetupStep(3)}
                className='px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-text hover:bg-text/80 text-card'
              >
                {authMethod === "app" ? "Continue" : "Send Code"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Verify Code */}
        {setupStep === 3 && (
          <div>
            <h4 className='text-sm font-medium mb-3'>
              Step 3: Verify Authentication Code
            </h4>
            <p className='text-sm mb-3'>
              Enter the 6-digit code from your{" "}
              {authMethod === "app" ? "authenticator app" : "SMS message"}
            </p>

            <div className='flex gap-2 mb-4' onPaste={handleCodePaste}>
              {verificationCode.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type='text'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => {
                    // Handle backspace to go to previous input
                    if (e.key === "Backspace" && !digit && i > 0) {
                      const prevInput = document.getElementById(
                        `code-${i - 1}`
                      );
                      prevInput?.focus();
                    }
                  }}
                  className='w-10 h-12 text-center text-lg font-medium rounded-md border focus:outline-none focus:ring-2 bg-background  border-border focus:ring-info'
                />
              ))}
            </div>

            <div className='flex justify-between mt-6'>
              <button
                onClick={() => setSetupStep(2)}
                className='px-4 py-2 rounded-lg text-sm transition-colors bg-background hover:bg-hover border '
              >
                Back
              </button>

              <button
                onClick={verifyCode}
                className='px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-text hover:bg-text/80 text-card'
              >
                Verify Code
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Backup Codes */}
        {setupStep === 4 && (
          <div>
            <h4 className='text-sm font-medium mb-3'>
              Step 4: Save Backup Codes
            </h4>
            <p className='text-sm mb-3'>
              If you lose access to your authentication device, you can use
              these backup codes to sign in. Each code can only be used once.
            </p>

            <div className='p-3 rounded-lg border grid grid-cols-2 gap-2 mb-4 bg-card border-border'>
              {BACKUP_CODES.map((code, i) => (
                <div key={i} className='font-mono text-sm p-1.5'>
                  {code}
                </div>
              ))}
            </div>

            <div className='flex flex-wrap gap-3 mb-6'>
              <button
                onClick={downloadCodes}
                className='px-4 py-2 rounded-lg font-medium text-sm transition-colors bg-background hover:bg-hover'
              >
                Download Codes
              </button>

              <button
                onClick={printCodes}
                className='px-4 py-2 rounded-lg font-medium text-sm transition-colors bg-background hover:bg-hover'
              >
                Print Codes
              </button>

              <button
                onClick={copyToClipboard}
                className='px-4 py-2 rounded-lg font-medium text-sm transition-colors bg-background hover:bg-hover flex items-center'
              >
                {copySuccess ? (
                  <>
                    <Check className='h-4 w-4 mr-1' />
                    Copied!
                  </>
                ) : (
                  "Copy to Clipboard"
                )}
              </button>
            </div>

            <div className='flex justify-between'>
              <button
                onClick={() => setSetupStep(3)}
                className='px-4 py-2 rounded-lg text-sm transition-colors bg-background hover:bg-hover border '
              >
                Back
              </button>

              <button
                onClick={complete2FASetup}
                className='px-5 py-2 rounded-lg text-sm font-medium transition-colors bg-text hover:bg-text/80 text-card'
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showCancelDialog}
        title='Cancel 2FA Setup'
        message='Are you sure you want to cancel the two-factor authentication setup? Your progress will be lost.'
        confirmText='Yes, Cancel Setup'
        onConfirm={() => {
          setShowCancelDialog(false);
          onCancel();
        }}
        onCancel={() => setShowCancelDialog(false)}
      />

      {/* Hidden iframe for printing */}
      <iframe
        ref={printFrameRef}
        style={{ position: "absolute", width: "0", height: "0", border: "0" }}
        title='Print Frame'
      />
    </div>
  );
}
