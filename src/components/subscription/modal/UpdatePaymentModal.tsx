"use client";

import { useState } from "react";
import { X, CreditCardIcon, Calendar, Shield } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import LoaderIcon from "@/components/svgs/LoaderIcon";

interface UpdatePaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePaymentUpdate: (formData: any) => Promise<any>;
  addNew?: boolean;
}

export function UpdatePaymentModal({
  onClose,
  onSuccess,
  isProcessing,
  setIsProcessing,
  handlePaymentUpdate,
  addNew,
}: UpdatePaymentModalProps) {
  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    country: "United States",
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  // Handle payment form input
  const handlePaymentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setPaymentForm({
        ...paymentForm,
        [name]: formatted,
      });
    }
    // Format expiry with slash
    else if (name === "expiry") {
      let formatted = value.replace(/\D/g, "");
      if (formatted.length > 2) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      }
      setPaymentForm({
        ...paymentForm,
        [name]: formatted,
      });
    } else {
      setPaymentForm({
        ...paymentForm,
        [name]: value,
      });
    }

    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const errors = {
      cardNumber: "",
      expiry: "",
      cvv: "",
      name: "",
    };

    if (!paymentForm.name.trim()) {
      errors.name = "Name is required";
    }

    if (!paymentForm.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Invalid card number";
    }

    if (!paymentForm.expiry.trim()) {
      errors.expiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiry)) {
      errors.expiry = "Use MM/YY format";
    }

    if (!paymentForm.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
      errors.cvv = "Invalid CVV";
    }

    if (errors.cardNumber || errors.expiry || errors.cvv || errors.name) {
      setFormErrors(errors);
      return;
    }

    // Process payment update
    setIsProcessing(true);

    try {
      await handlePaymentUpdate(paymentForm);
      onSuccess();
    } catch (error) {
      console.error("Payment update failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal>
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-text'>
            {addNew ? "Add" : "Update"} Payment Method
          </h3>
          <Button
            onClick={onClose}
            className='hover:bg-hover h-10 w-10 flex items-center justify-center rounded-full'
          >
            <X className='w-5 h-5' />
          </Button>
        </div>
      </div>
      <div className='p-6 pt-0'>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4 mb-6'>
            <div>
              <label className='block text-sm font-medium mb-1 text-text'>
                Cardholder Name
              </label>
              <div
                className={cn(
                  "flex items-center rounded-lg border px-3 py-2 border-border",
                  formErrors.name && "border-error"
                )}
              >
                <input
                  type='text'
                  name='name'
                  placeholder='John Smith'
                  value={paymentForm.name}
                  onChange={handlePaymentInput}
                  className='w-full bg-transparent focus:outline-none text-text'
                />
              </div>
              {formErrors.name && (
                <p className='mt-1 text-sm text-error border-error'>
                  {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium mb-1 text-text'>
                Card Number
              </label>
              <div
                className={cn(
                  "flex items-center rounded-lg border px-3 py-2 border-border",
                  formErrors.cardNumber && "border-error"
                )}
              >
                <CreditCardIcon className='w-5 h-5 mr-2 text-foreground ' />
                <input
                  type='text'
                  name='cardNumber'
                  placeholder='1234 5678 9012 3456'
                  value={paymentForm.cardNumber}
                  onChange={handlePaymentInput}
                  maxLength={19}
                  className='w-full bg-transparent focus:outline-none text-text'
                />
              </div>
              {formErrors.cardNumber && (
                <p className='mt-1 text-sm text-error border-error'>
                  {formErrors.cardNumber}
                </p>
              )}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-1 text-text'>
                  Expiry Date
                </label>
                <div
                  className={cn(
                    "flex items-center rounded-lg border px-3 py-2 border-border",
                    formErrors.expiry && "border-error"
                  )}
                >
                  <Calendar className='w-5 h-5 mr-2 text-foreground ' />
                  <input
                    type='text'
                    name='expiry'
                    placeholder='MM/YY'
                    value={paymentForm.expiry}
                    onChange={handlePaymentInput}
                    maxLength={5}
                    className='w-full bg-transparent focus:outline-none text-text'
                  />
                </div>
                {formErrors.expiry && (
                  <p className='mt-1 text-sm text-error border-error'>
                    {formErrors.expiry}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-text'>
                  CVV
                </label>
                <div
                  className={cn(
                    "flex items-center rounded-lg border px-3 py-2 border-border",
                    formErrors.cvv && "border-error"
                  )}
                >
                  <Shield className='w-5 h-5 mr-2 text-foreground ' />
                  <input
                    type='text'
                    name='cvv'
                    placeholder='123'
                    value={paymentForm.cvv}
                    onChange={handlePaymentInput}
                    maxLength={4}
                    className='w-full bg-transparent focus:outline-none text-text'
                  />
                </div>
                {formErrors.cvv && (
                  <p className='mt-1 text-sm text-error border-error'>
                    {formErrors.cvv}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='flex justify-end space-x-3'>
            <Button
              onClick={onClose}
              disabled={isProcessing}
              className='border-border border bg-card hover:bg-hover'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isProcessing}
              className='bg-text hover:bg-text/80 text-card'
            >
              {isProcessing ? (
                <>
                  <LoaderIcon />
                  Processing...
                </>
              ) : (
                "Save Payment Method"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
