"use client";

import type React from "react";

import { useState } from "react";
import { User, Save, Camera } from "lucide-react";
import { Toast } from "../ui/toast";

interface PersonalInfoProps {
  initialData?: {
    name: string;
    email: string;
    avatar: string;
  };
  onSave?: (data: { name: string; email: string; avatar: string }) => void;
}

export function PersonalInfoSection({
  initialData = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.png",
  },
  onSave,
}: PersonalInfoProps) {
  const [personalInfo, setPersonalInfo] = useState(initialData);

  // Avatar upload handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPersonalInfo({
          ...personalInfo,
          avatar: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const savePersonalInfo = () => {
    if (onSave) {
      onSave(personalInfo);
    } else {
      Toast.success("Personal information saved!");
    }
  };

  return (
    <section className='mb-8 p-6 rounded-xl border shadow-sm bg-background border-border'>
      <div className='flex items-center mb-6'>
        <div className='p-2 rounded-full mr-3 bg-hover'>
          <User className='h-5 w-5' />
        </div>
        <h2 className='text-lg font-medium'>Personal Information</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start'>
        {/* Avatar */}
        <div className='flex flex-col items-center'>
          <div className='relative group'>
            <img
              src={personalInfo.avatar || "/placeholder.png"}
              alt='Profile avatar'
              className='w-36 h-36 rounded-full object-cover border-2 border-opacity-10 border-border'
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/50  rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
              <label
                htmlFor='avatar-upload'
                className='p-2 rounded-full cursor-pointer bg-background text-text hover:bg-hover transition-colors'
              >
                <Camera className='h-5 w-5' />
              </label>
            </div>
            <input
              id='avatar-upload'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleAvatarChange}
            />
          </div>
          <p className='text-xs mt-3 opacity-70'>Click to change avatar</p>
        </div>

        {/* Form Fields */}
        <div className='space-y-5'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium mb-1.5'>
              Full Name
            </label>
            <input
              id='name'
              type='text'
              value={personalInfo.name}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, name: e.target.value })
              }
              className='w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border focus:ring-info'
              placeholder='Enter your full name'
            />
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium mb-1.5'>
              Email Address
            </label>
            <input
              id='email'
              type='email'
              value={personalInfo.email}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, email: e.target.value })
              }
              className='w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-background border-border focus:ring-info'
              placeholder='your.email@example.com'
            />
          </div>

          <div className='pt-3'>
            <button
              onClick={savePersonalInfo}
              className='flex items-center px-5 py-2.5 rounded-lg font-medium transition-colors bg-text hover:bg-text/80 text-card'
            >
              <Save className='h-4 w-4 mr-2' />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
