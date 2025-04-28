"use client";

import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { FeedbackModal } from "./FeedbackModal";
import Button from "../ui/button";

export function FeedbackSection() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <section className='mb-12 card'>
      <div className='flex items-center mb-6'>
        <div className='icon-container mr-3'>
          <MessageSquare className='h-6 w-6' />
        </div>
        <h2 className='text-2xl font-bold text-text'>Submit Feedback</h2>
      </div>

      <p className='mb-6 text-base leading-relaxed text-foreground'>
        We value your input! Share your thoughts, report bugs, or suggest new
        features to help us improve.
      </p>

      <Button
        onClick={() => setShowFeedbackModal(true)}
        className='btn btn-secondary flex items-center bg-card border border-border hover:bg-hover '
      >
        <Send className='h-4 w-4 mr-2' />
        Submit Feedback
      </Button>

      {showFeedbackModal && (
        <FeedbackModal onClose={() => setShowFeedbackModal(false)} />
      )}
    </section>
  );
}
