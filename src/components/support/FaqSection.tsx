"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "@/constant/FaqData";

export function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section className='mb-12'>
      <div className='flex items-center mb-8'>
        <div className='icon-container mr-3 bg-card p-2 rounded-full'>
          <FileQuestion className='h-6 w-6' />
        </div>
        <h2 className='text-2xl font-bold text-text'>
          Frequently Asked Questions
        </h2>
      </div>

      <div className='rounded-xl overflow-hidden border border-border shadow-sm'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className='border-b last:border-b-0 border-border transition-all duration-200'
          >
            <button
              onClick={() => toggleFaq(index)}
              className={cn(
                "flex items-center justify-between w-full p-5 text-left transition-all duration-200",
                expandedFaq === index ? "bg-card/50" : "hover:bg-card/50"
              )}
            >
              <span className='font-medium text-base text-text'>
                {faq.question}
              </span>
              <div
                className={cn(
                  "p-1 rounded-full transition-all duration-200",
                  expandedFaq === index ? "bg-hover" : "bg-card"
                )}
              >
                {expandedFaq === index ? (
                  <ChevronUp className='h-4 w-4 flex-shrink-0' />
                ) : (
                  <ChevronDown className='h-4 w-4 flex-shrink-0' />
                )}
              </div>
            </button>

            {expandedFaq === index && (
              <div className='p-5 text-base leading-relaxed animate-in slide-in-from-top-2 duration-200 bg-card/50 text-foreground'>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
