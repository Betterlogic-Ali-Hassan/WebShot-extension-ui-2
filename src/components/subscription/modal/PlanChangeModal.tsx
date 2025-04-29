"use client";

import Button from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { Plan, PlanName } from "@/types/Plan";

interface PlanChangeModalProps {
  currentPlan: PlanName;
  selectedPlan: Plan;
  billingPeriod: string;
  plans: Plan[];
  isProcessing: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function PlanChangeModal({
  currentPlan,
  selectedPlan,
  billingPeriod,
  plans,
  isProcessing,
  onClose,
  onConfirm,
}: PlanChangeModalProps) {
  return (
    <Modal>
      <div className='p-6'>
        <h3 className='text-lg font-semibold text-text'>Confirm Plan Change</h3>
        <p className='text-sm text-text'>
          Review your plan change details before confirming
        </p>
      </div>
      <div className='p-6 pt-0'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between pb-4 border-b border-border'>
            <div>
              <p className='font-medium text-text'>Current Plan</p>
              <p className='text-sm text-text'>{currentPlan}</p>
            </div>
            <div className='text-right'>
              <p className='font-medium text-text'>New Plan</p>
              <p className='text-sm text-text'>{selectedPlan?.name}</p>
            </div>
          </div>

          <div className='flex items-center justify-between pb-4 border-b border-border'>
            <p className='text-sm text-text'>Price Change</p>
            <p className='font-medium text-text'>
              {billingPeriod === "monthly"
                ? `${plans.find((p) => p.name === currentPlan)?.price} → ${
                    selectedPlan?.price
                  }`
                : `${
                    plans.find((p) => p.name === currentPlan)?.yearlyPrice
                  } → ${selectedPlan?.yearlyPrice}`}
              <span className='text-xs text-text ml-1'>
                /{billingPeriod === "monthly" ? "mo" : "yr"}
              </span>
            </p>
          </div>

          <div className='flex items-center justify-between'>
            <p className='text-sm text-text'>Effective Date</p>
            <p className='font-medium text-text'>Immediately</p>
          </div>
        </div>
      </div>
      <div className='p-6 pt-0 flex justify-end space-x-3'>
        <Button
          onClick={onClose}
          disabled={isProcessing}
          className='border-border border bg-card hover:bg-hover'
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isProcessing}
          className='bg-text hover:bg-text/80 text-card'
        >
          {isProcessing ? (
            <>
              <svg
                className='animate-spin -ml-1 mr-2 h-4 w-4 text-card'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Confirm Change"
          )}
        </Button>
      </div>
    </Modal>
  );
}
