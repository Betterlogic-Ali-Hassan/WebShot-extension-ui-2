"use client";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SupportHeader() {
  const navigate = useNavigate();

  return (
    <header className='border-b border-border py-4 px-4 sm:px-6 bg-background'>
      <div className='max-w-4xl mx-auto flex items-center'>
        <button
          onClick={() => navigate("/")}
          className='mr-4 p-2 rounded-full transition-colors duration-200 flex items-center justify-center hover:bg-hover text-text'
          aria-label='Go back'
        >
          <ArrowLeft className='h-5 w-5' />
        </button>
        <div>
          <h1 className='text-2xl font-bold text-text'>Help & Support</h1>
          <p className='mt-1 text-foreground'>
            Find answers, submit feedback, or contact our team
          </p>
        </div>
      </div>
    </header>
  );
}
