"use client";

import { useState } from "react";
import { Lock, Save, Shield } from "lucide-react";
import { TwoFactorSetup } from "./TwoFactor";
import { Switch } from "../ui/switch";
import { Toast } from "../ui/toast";

interface SecuritySectionProps {
  onSave?: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
}

export function SecuritySection({ onSave }: SecuritySectionProps) {
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });

  const saveSecuritySettings = () => {
    if (security.newPassword !== security.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (onSave) {
      onSave(security);
    } else {
      Toast.success("Security settings saved!");
    }
  };

  return (
    <section className='mb-8 p-6 rounded-xl border shadow-sm bg-background border-border'>
      <div className='flex items-center mb-6'>
        <div className='p-2 rounded-full mr-3 bg-hover'>
          <Lock className='h-5 w-5' />
        </div>
        <h2 className='text-lg font-medium'>Password & Security</h2>
      </div>

      <div className='space-y-8'>
        {/* Change Password */}
        <div className='space-y-5'>
          <h3 className='text-base font-medium'>Change Password</h3>

          <div>
            <label
              htmlFor='current-password'
              className='block text-sm font-medium mb-1.5'
            >
              Current Password
            </label>
            <input
              id='current-password'
              type='password'
              value={security.currentPassword}
              onChange={(e) =>
                setSecurity({ ...security, currentPassword: e.target.value })
              }
              className='w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border focus:ring-info'
              placeholder='••••••••••••'
            />
          </div>

          <div>
            <label
              htmlFor='new-password'
              className='block text-sm font-medium mb-1.5'
            >
              New Password
            </label>
            <input
              id='new-password'
              type='password'
              value={security.newPassword}
              onChange={(e) =>
                setSecurity({ ...security, newPassword: e.target.value })
              }
              className='w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border focus:ring-info'
              placeholder='••••••••••••'
            />
          </div>

          <div>
            <label
              htmlFor='confirm-password'
              className='block text-sm font-medium mb-1.5'
            >
              Confirm New Password
            </label>
            <input
              id='confirm-password'
              type='password'
              value={security.confirmPassword}
              onChange={(e) =>
                setSecurity({ ...security, confirmPassword: e.target.value })
              }
              className='w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border focus:ring-info'
              placeholder='••••••••••••'
            />
          </div>

          <div className='pt-2'>
            <button
              onClick={saveSecuritySettings}
              className='flex items-center px-5 py-2.5 rounded-lg font-medium transition-colors bg-text hover:bg-text/80 text-card'
            >
              <Save className='h-4 w-4 mr-2' />
              Update Password
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className='pt-6 border-t border-opacity-10 border-border'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start md:items-center'>
              <Shield className='h-5 w-5 mr-3 mt-0.5 md:mt-0' />
              <div>
                <h3 className='text-base font-medium'>
                  Two-Factor Authentication (2FA)
                </h3>
                <p className='text-sm opacity-70 mt-1'>
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <Switch
              checked={security.twoFactorEnabled}
              onClick={() =>
                setSecurity({
                  ...security,
                  twoFactorEnabled: !security.twoFactorEnabled,
                })
              }
            />
          </div>

          {/* 2FA Setup UI - Only shown when 2FA is enabled */}
          {security.twoFactorEnabled && (
            <TwoFactorSetup
              onComplete={() => {}}
              onCancel={() =>
                setSecurity({ ...security, twoFactorEnabled: false })
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
