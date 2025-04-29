"use client";

import { X, Check, CreditCard, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { plans } from "@/constant/PlansData";
import { useImageEditor } from "@/context/ImageContext";

export function PremiumFeaturePopup() {
  const { handleClosePremiumPopup: onClose, premiumFeatureName: featureName } =
    useImageEditor();

  return (
    <div
      className='fixed z-50 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200",
          "bg-background border-border"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "relative p-6 pb-8 text-center",
            "bg-gradient-to-b from-card to-background"
          )}
        >
          <Button
            className={cn(
              "absolute top-3 right-3 h-8 w-8 rounded-full justify-center",
              "hover:bg-hover text-text"
            )}
            onClick={onClose}
          >
            <X className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Close</span>
          </Button>

          <div className='mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4'>
            <Sparkles className='h-6 w-6 text-amber-600' />
          </div>

          <h2 className={cn("text-xl font-bold mb-2", "text-foreground")}>
            Unlock Premium Features
          </h2>

          <p className={cn("text-sm", "text-text")}>
            <span className='font-medium text-amber-500'>{featureName}</span> is
            a premium feature. Upgrade to access all premium tools and enhance
            your screenshots.
          </p>
        </div>

        {/* Plans */}
        <div className='p-6 pt-0'>
          <div className='grid grid-cols-2 gap-4'>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "rounded-xl p-4 border relative",
                  plan.popular
                    ? "border-amber-500/50 bg-amber-500/10"
                    : "border-border bg-card"
                )}
              >
                {plan.popular && (
                  <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs font-bold py-1 px-3 rounded-full'>
                    Best Value
                  </div>
                )}

                <div className='text-center mb-4 pt-2'>
                  <h3 className='font-medium text-text-primary'>{plan.name}</h3>
                  <div className='mt-1'>
                    <span className='text-xl font-bold text-foreground'>
                      {plan.price}
                    </span>
                    <span className='text-xs ml-1 text-text'>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className='space-y-2 mb-4'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='flex items-center text-xs'>
                      <Check
                        className={cn(
                          "h-3.5 w-3.5 mr-2 flex-shrink-0",
                          plan.popular ? "text-amber-500" : "text-text"
                        )}
                      />
                      <span className='text-text'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full text-xs h-8 justify-center",
                    plan.popular
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "bg-background hover:bg-btn-hover text-foreground"
                  )}
                >
                  <CreditCard className='h-3.5 w-3.5 mr-1.5' />
                  Subscribe
                </Button>
              </div>
            ))}
          </div>

          <div className='mt-6 text-center'>
            <p className={cn("text-xs", "text-text")}>
              All plans include a 7-day free trial. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
