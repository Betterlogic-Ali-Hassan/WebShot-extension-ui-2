"use client";

import { X, Check, CreditCard, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PremiumFeaturePopupProps {
  position: { top: number; left: number; width: number };
  isDarkMode: boolean;
  onClose: () => void;
  featureName: string;
}

export function PremiumFeaturePopup({
  //   position,
  isDarkMode,
  onClose,
  featureName,
}: PremiumFeaturePopupProps) {
  // Plans data
  const plans = [
    {
      name: "Monthly",
      price: "$9.99",
      period: "per month",
      features: [
        "All premium features",
        "Unlimited exports",
        "Cloud storage",
        "Priority support",
      ],
      popular: false,
    },
    {
      name: "Yearly",
      price: "$79.99",
      period: "per year",
      features: [
        "All premium features",
        "Unlimited exports",
        "Cloud storage",
        "Priority support",
        "Save 33%",
      ],
      popular: true,
    },
  ];

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
          isDarkMode
            ? "bg-[#1C1C1E] border border-[#3A3A3C]"
            : "bg-white border border-gray-200"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "relative p-6 pb-8 text-center",
            isDarkMode
              ? "bg-gradient-to-b from-[#2C2C2E] to-[#1C1C1E]"
              : "bg-gradient-to-b from-gray-50 to-white"
          )}
        >
          <Button
            className={cn(
              "absolute top-3 right-3 h-8 w-8 rounded-full justify-center",
              isDarkMode
                ? "hover:bg-[#3A3A3C] text-gray-400"
                : "hover:bg-gray-100 text-gray-500"
            )}
            onClick={onClose}
          >
            <X className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Close</span>
          </Button>

          <div className='mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4'>
            <Sparkles className='h-6 w-6 text-amber-600' />
          </div>

          <h2
            className={cn(
              "text-xl font-bold mb-2",
              isDarkMode ? "text-white" : "text-gray-900"
            )}
          >
            Unlock Premium Features
          </h2>

          <p
            className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}
          >
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
                    ? isDarkMode
                      ? "border-amber-500/50 bg-amber-500/10"
                      : "border-amber-500/50 bg-amber-50"
                    : isDarkMode
                    ? "border-[#3A3A3C] bg-[#2C2C2E]"
                    : "border-gray-200 bg-gray-50"
                )}
              >
                {plan.popular && (
                  <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs font-bold py-1 px-3 rounded-full'>
                    Best Value
                  </div>
                )}

                <div className='text-center mb-4 pt-2'>
                  <h3
                    className={cn(
                      "font-medium",
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    )}
                  >
                    {plan.name}
                  </h3>
                  <div className='mt-1'>
                    <span
                      className={cn(
                        "text-xl font-bold",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={cn(
                        "text-xs ml-1",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}
                    >
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
                          plan.popular
                            ? "text-amber-500"
                            : isDarkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        )}
                      />
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full text-xs h-8",
                    plan.popular
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : isDarkMode
                      ? "bg-[#3A3A3C] hover:bg-[#4A4A4C] text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  )}
                >
                  <CreditCard className='h-3.5 w-3.5 mr-1.5' />
                  Subscribe
                </Button>
              </div>
            ))}
          </div>

          <div className='mt-6 text-center'>
            <p
              className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}
            >
              All plans include a 7-day free trial. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
