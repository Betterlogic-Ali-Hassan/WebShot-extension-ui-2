"use client";

import { useState } from "react";
import { AddressForm } from "./AddressForm";
import { UpdatePaymentModal } from "../modal/UpdatePaymentModal";
import { useModal } from "@/context/ModalsContext";
import { CancelPlanModal } from "../modal/CancelPlanModal";
import { useSubscriptionData } from "@/hooks/useSubscriptionHook";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import PaymentMethod from "./PaymentMethod";
import BillingAddress from "./BillingAddress";
import SubscriptionSummary from "./SubscriptionSummary";
import InvoiceHistory from "./InvoiceHistory";
export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
export default function Billing() {
  const {
    showPaymentModal,
    setShowPaymentModal,
    isProcessing,
    handlePaymentSuccess,
    onPaymentSubmit,
    setIsProcessing,
    addressFormModal,
    setAddressFormModal,
    showCancelModal,
    setShowCancelModal,
  } = useModal();
  const { currentPlan, renewalDate } = useSubscriptionData();
  const [billingAddress, setBillingAddress] = useState<Address>({
    name: "John Doe",
    line1: "123 Main St",
    line2: "Suite 101",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "United States",
  });

  const onSave = (address: Address) => {
    setBillingAddress(address);
  };

  return (
    <div className='max-h-screen overflow-y-auto'>
      <div className=' max-w-4xl mx-auto py-8 px-4 md:px-6'>
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Header */}
        <Header />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left column - Payment & Billing */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Payment Method */}
            <PaymentMethod />

            {/* Billing Address */}
            <BillingAddress billingAddress={billingAddress} />
          </div>

          {/* Right column - Subscription Summary */}
          <SubscriptionSummary />
        </div>

        {/* Invoice History */}
        <InvoiceHistory />
      </div>
      {addressFormModal && (
        <AddressForm
          onClose={() => setAddressFormModal(false)}
          initialAddress={billingAddress}
          onSave={onSave}
        />
      )}
      {showPaymentModal && (
        <UpdatePaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          handlePaymentUpdate={onPaymentSubmit}
          addNew
        />
      )}
      {showCancelModal && (
        <CancelPlanModal
          currentPlan={currentPlan}
          renewalDate={renewalDate}
          onClose={() => setShowCancelModal(false)}
        />
      )}
    </div>
  );
}
