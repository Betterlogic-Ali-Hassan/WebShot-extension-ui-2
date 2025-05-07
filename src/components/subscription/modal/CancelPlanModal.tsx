"use client";

import { AlertCircle, X } from "lucide-react";

import Button from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { Toast } from "@/components/ui/toast";

interface CancelPlanModalProps {
  currentPlan: string;
  renewalDate: string;
  onClose: () => void;
}

export function CancelPlanModal({
  currentPlan,
  renewalDate,
  onClose,
}: CancelPlanModalProps) {
  const handleCancel = () => {
    Toast.error("Subscription Cancelled");
    onClose();
  };

  return (
    <Modal>
      <div className='p-6'>
        <div className='flex items-center'>
          <AlertCircle className='w-5 h-5 text-error mr-2' />
          <h3 className='text-lg font-semibold text-text'>
            Cancel Your Subscription
          </h3>
        </div>
        <p className='text-sm text-foreground mt-1'>
          You'll lose access to premium features at the end of your billing
          period.
        </p>
      </div>
      <div className='p-6 pt-0'>
        <p className='mb-4 text-foreground'>
          Are you sure you want to cancel your {currentPlan} plan? Your
          subscription will remain active until {renewalDate}.
        </p>

        <div className='p-4 rounded-lg mb-6 bg-hover'>
          <h4 className='font-medium mb-2 text-text'>You'll lose access to:</h4>
          <ul className='space-y-2'>
            <li className='flex items-start'>
              <X className='w-4 h-4 text-error mr-2 mt-0.5' />
              <span className='text-sm text-text'>Advanced editing tools</span>
            </li>
            <li className='flex items-start'>
              <X className='w-4 h-4 text-error mr-2 mt-0.5' />
              <span className='text-sm text-text'>
                10GB storage (will be reduced to 1GB)
              </span>
            </li>
            <li className='flex items-start'>
              <X className='w-4 h-4 text-error mr-2 mt-0.5' />
              <span className='text-sm text-text'>Priority support</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='p-6 pt-0 flex justify-end sm:space-x-3 max-sm:flex-col max-sm:gap-3'>
        <Button
          onClick={onClose}
          className=' hover:bg-hover bg-card border border-border w-full justify-center'
        >
          Keep Subscription
        </Button>
        <Button
          onClick={handleCancel}
          className='bg-error hover:bg-error/40  text-text-primary w-full justify-center'
        >
          Cancel Subscription
        </Button>
      </div>
    </Modal>
  );
}
