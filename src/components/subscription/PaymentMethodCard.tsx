"use client";

import { CreditCard } from "lucide-react";
import Button from "@/components/ui/button";

interface PaymentMethodProps {
  paymentMethod: {
    type: string;
    last4: string;
    expiry: string;
  };
  onUpdateClick: () => void;
}

export function PaymentMethodCard({
  paymentMethod,
  onUpdateClick,
}: PaymentMethodProps) {
  return (
    <section>
      <h2 className='text-xl font-bold mb-4 text-text'>Payment Method</h2>
      <div className='rounded-xl border border-border bg-background'>
        <div className='p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-hover'>
                <CreditCard className='w-6 h-6 text-foreground' />
              </div>
              <div>
                <h3 className='font-medium text-text'>
                  {paymentMethod.type} •••• {paymentMethod.last4}
                </h3>
                <p className='text-sm text-foreground'>
                  Expires {paymentMethod.expiry}
                </p>
              </div>
            </div>
            <Button
              onClick={onUpdateClick}
              className='border-border bg-background border hover:bg-hover'
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
