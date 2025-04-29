"use client";

import { useState } from "react";
import { useSubscriptionData } from "@/hooks/useSubscriptionHook";
import { Plan, ReceiptData } from "@/types/Plan";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { UsageStatistics } from "./UsageStatistics";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { BillingHistorySection } from "./BillingHistory";
import { AvailablePlansSection } from "./AvailablePlan";
import { CancelPlanModal } from "./modal/CancelPlanModal";
import { UpdatePaymentModal } from "./modal/UpdatePaymentModal";
import { PlanChangeModal } from "./modal/PlanChangeModal";
import { ReceiptModal } from "./modal/ReceiptModal";
import Header from "./Header";
import { useModal } from "@/context/ModalsContext";

export function Subscription() {
  const {
    currentPlan,
    renewalDate,
    paymentMethod,
    usageData,
    billingHistory,
    plans,
    handlePlanChange,
    confirmPlanChange,
  } = useSubscriptionData();

  // State for modals
  const {
    showCancelModal,
    setShowCancelModal,
    showPaymentModal,
    setShowPaymentModal,
    showPlanModal,
    setShowPlanModal,
    showReceiptModal,
    setShowReceiptModal,
    setIsProcessing,
    isProcessing,
    handlePaymentSuccess,
    onPaymentSubmit,
  } = useModal();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  // Handle plan selection
  const onPlanSelect = (plan: Plan) => {
    const processedPlan = handlePlanChange(plan);
    if (!processedPlan) return;

    setSelectedPlan(processedPlan);
    if (
      processedPlan.action === "Upgrade" &&
      processedPlan.price !== "$0" &&
      !paymentMethod?.last4
    ) {
      setShowPaymentModal(true);
    } else {
      setShowPlanModal(true);
    }
  };

  // Handle plan confirmation
  const onConfirmPlan = async () => {
    if (!selectedPlan) return;

    setIsProcessing(true);
    try {
      const receipt = await confirmPlanChange(selectedPlan, billingPeriod);
      if (receipt) {
        setReceiptData(receipt);
        setShowPlanModal(false);
        setShowReceiptModal(true);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='max-h-screen bg-background overflow-y-auto'>
      <Header />
      {/* Main Content */}
      <main className='max-w-[1100px] mx-auto py-8 px-4 sm:px-6'>
        <div className='space-y-8'>
          {/* Current Plan Section */}
          <CurrentPlanCard
            currentPlan={currentPlan}
            renewalDate={renewalDate}
            onCancelClick={() => setShowCancelModal(true)}
            onUpgradeClick={() => {
              const teamPlan = plans.find((p: Plan) => p.name === "Team");
              if (teamPlan) onPlanSelect(teamPlan);
            }}
          />

          {/* Usage Stats Section */}
          <UsageStatistics usageData={usageData} />

          {/* Payment Method Section */}
          <PaymentMethodCard
            paymentMethod={paymentMethod}
            onUpdateClick={() => setShowPaymentModal(true)}
          />

          {/* Billing History Section */}
          <BillingHistorySection billingHistory={billingHistory} />

          {/* Available Plans Section */}
          <AvailablePlansSection
            plans={plans}
            currentPlan={currentPlan}
            billingPeriod={billingPeriod}
            onBillingPeriodChange={setBillingPeriod}
            onPlanSelect={onPlanSelect}
          />
        </div>
      </main>

      {/* Modals */}
      {showCancelModal && (
        <CancelPlanModal
          currentPlan={currentPlan}
          renewalDate={renewalDate}
          onClose={() => setShowCancelModal(false)}
        />
      )}

      {showPaymentModal && (
        <UpdatePaymentModal
          onClose={() => {
            setShowPaymentModal(false);
            if (selectedPlan) setSelectedPlan(null);
          }}
          onSuccess={handlePaymentSuccess}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          handlePaymentUpdate={onPaymentSubmit}
        />
      )}

      {showPlanModal && selectedPlan && (
        <PlanChangeModal
          currentPlan={currentPlan}
          selectedPlan={selectedPlan}
          billingPeriod={billingPeriod}
          plans={plans}
          isProcessing={isProcessing}
          onClose={() => setShowPlanModal(false)}
          onConfirm={onConfirmPlan}
        />
      )}

      {showReceiptModal && receiptData && (
        <ReceiptModal
          receiptData={receiptData}
          billingPeriod={billingPeriod}
          onClose={() => setShowReceiptModal(false)}
        />
      )}
    </div>
  );
}
