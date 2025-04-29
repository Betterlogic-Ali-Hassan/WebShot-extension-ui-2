"use client";

import { useSubscriptionData } from "@/hooks/useSubscriptionHook";
import type { PaymentFormData } from "@/types/Plan";
import type React from "react";
import { createContext, useContext, useState } from "react";

// Define the context type
type ModalContextType = {
  showCancelModal: boolean;
  setShowCancelModal: (show: boolean) => void;
  addressFormModal: boolean;
  setAddressFormModal: (address: boolean) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  showPlanModal: boolean;
  setShowPlanModal: (show: boolean) => void;
  showReceiptModal: boolean;
  setShowReceiptModal: (show: boolean) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  handlePaymentSuccess: () => void;
  onPaymentSubmit: (formData: PaymentFormData) => Promise<void>;
};

// Create the context with a default undefined value
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider component
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { handlePaymentUpdate } = useSubscriptionData();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [addressFormModal, setAddressFormModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle payment success
  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setShowPlanModal(true);
  };
  const onPaymentSubmit = async (formData: PaymentFormData) => {
    setIsProcessing(true);
    try {
      await handlePaymentUpdate(formData);
      handlePaymentSuccess();
    } finally {
      setIsProcessing(false);
    }
  };

  // Create the context value object
  const contextValue: ModalContextType = {
    showCancelModal,
    setShowCancelModal,
    showPaymentModal,
    setShowPaymentModal,
    showPlanModal,
    setShowPlanModal,
    showReceiptModal,
    setShowReceiptModal,
    isProcessing,
    handlePaymentSuccess,
    onPaymentSubmit,
    setIsProcessing,
    addressFormModal,
    setAddressFormModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within an ModalProvider");
  }
  return context;
};
