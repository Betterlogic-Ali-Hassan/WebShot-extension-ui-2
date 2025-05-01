"use client";

import type React from "react";

import { Send, X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeedbackModalProps {
  onClose: () => void;
}

export function FeedbackModal({ onClose }: FeedbackModalProps) {
  // Feedback form state
  const [feedbackForm, setFeedbackForm] = useState({
    type: "question",
    message: "",
    email: "",
    includeScreenshot: false,
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the feedback submission
    console.log("Feedback submitted:", feedbackForm);
    // Show success message
    alert("Thank you for your feedback! We'll get back to you soon.");
    onClose();
    // Reset form
    setFeedbackForm({
      type: "question",
      message: "",
      email: "",
      includeScreenshot: false,
    });
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200'>
      <div className='w-full max-w-md rounded-xl shadow-xl animate-in zoom-in-95 duration-300 bg-background border border-border'>
        <div className='flex items-center justify-between p-6 border-b border-border'>
          <h3 className='text-xl font-semibold text-text'>Submit Feedback</h3>
          <button
            onClick={onClose}
            className='p-2 rounded-full transition-colors duration-200 hover:bg-hover'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <form onSubmit={handleFeedbackSubmit} className='p-6 space-y-5'>
          <div className='space-y-1.5'>
            <label className='block text-sm font-medium text-text'>
              Feedback Type
            </label>
            <Select>
              <SelectTrigger
                value={feedbackForm.type}
                className='w-full p-3 rounded-lg border border-border bg-card text-text transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-info/50 !min-h-[50px] focus:border-info'
              >
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent className='bg-background'>
                <SelectItem value='question'>Question</SelectItem>
                <SelectItem value='bug'>Bug Report</SelectItem>
                <SelectItem value='feature'>Feature Request</SelectItem>
                <SelectItem value='other'>Other</SelectItem>
              </SelectContent>
            </Select>

            <p className='text-xs mt-1 text-foreground'>
              Select the category that best matches your feedback
            </p>
          </div>

          <div className='space-y-1.5'>
            <label className='block text-sm font-medium text-text'>
              Your Message
            </label>
            <textarea
              value={feedbackForm.message}
              onChange={(e) =>
                setFeedbackForm({ ...feedbackForm, message: e.target.value })
              }
              rows={4}
              placeholder='Please describe your feedback in detail...'
              className='w-full p-3 rounded-lg border border-border bg-card text-text placeholder-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-info/50 focus:border-info'
              required
            />
          </div>

          <div className='space-y-1.5'>
            <label className='block text-sm font-medium text-text'>
              Your Email (optional)
            </label>
            <input
              type='email'
              value={feedbackForm.email}
              onChange={(e) =>
                setFeedbackForm({ ...feedbackForm, email: e.target.value })
              }
              placeholder='email@example.com'
              className='w-full p-3 rounded-lg border border-border bg-card text-text placeholder-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-info/50 focus:border-info'
            />
            <p className='text-xs mt-1 text-foreground'>
              We'll only use this to follow up on your feedback
            </p>
          </div>

          <div className='pt-2'>
            <label className='flex items-center space-x-3 p-3 rounded-lg border border-border bg-hover/50 hover:bg-hover transition-all duration-200'>
              <input
                type='checkbox'
                checked={feedbackForm.includeScreenshot}
                onChange={(e) =>
                  setFeedbackForm({
                    ...feedbackForm,
                    includeScreenshot: e.target.checked,
                  })
                }
                className='h-4 w-4 rounded bg-card border-border text-info focus:ring-info/50 transition-colors duration-200'
              />
              <span className='text-sm text-text'>
                Include screenshot of current page
              </span>
            </label>
          </div>

          <div className='flex justify-end space-x-3 pt-3'>
            <Button
              type='button'
              onClick={onClose}
              className='bg-card border border-border hover:bg-hover rounded-lg  cursor-pointer  px-5 py-2.5 text-base font-medium text-text  disabled:cursor-not-allowed whitespace-nowrap flex items-center max-w-max'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-text text-card border border-border hover:bg-text/80 rounded-lg  cursor-pointer  px-5 py-2.5 text-base font-medium   disabled:cursor-not-allowed whitespace-nowrap flex items-center max-w-max ml-2'
            >
              <Send className='h-4 w-4 mr-2' />
              Submit Feedback
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
