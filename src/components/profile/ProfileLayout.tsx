"use client";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function ProfileLayout() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <header className='sticky top-0 z-10 border-b px-4 py-3 flex items-center justify-between bg-background border-border'>
        <div className='flex items-center'>
          <button
            onClick={() => navigate(-1)}
            className='mr-4 p-2 rounded-full transition-colors hover:bg-hover'
            aria-label='Go back'
          >
            <ArrowLeft className='h-5 w-5' />
          </button>
          <h1 className='text-xl font-semibold'>Profile Settings</h1>
        </div>
      </header>
    </>
  );
}
