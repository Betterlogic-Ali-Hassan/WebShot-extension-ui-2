"use client";

import { Toast } from "@/components/ui/toast";
import { billingHistory } from "@/constant/BillingHistoryData";
import { projectPlans as plans } from "@/constant/PlansData";
import { usageData } from "@/constant/UsageData";
import {
  PaymentFormData,
  PaymentMethod,
  Plan,
  PlanName,
  ReceiptData,
} from "@/types/Plan";

// Define types for better type safety
export const currentPlan: PlanName = "Pro";

export const isPlanCurrent = (planName: PlanName): boolean => {
  return planName === currentPlan;
};

export function useSubscriptionData() {
  // Mock data - in a real app, this would come from your backend

  const renewalDate = "September 20, 2025";
  const paymentMethod: PaymentMethod = {
    type: "Visa",
    last4: "4242",
    expiry: "09/26",
  };

  const checkDowngradeRestrictions = (plan: Plan) => {
    const restrictions = {
      hasRestrictions: false,
      message: "",
    };

    if (plan.name === "Free" && usageData.screenshots.used > 5) {
      restrictions.hasRestrictions = true;
      restrictions.message =
        "You currently have more than 5 screenshots. Please delete some before downgrading.";
    }

    if (plan.name === "Free" && usageData.storage.used > 1) {
      restrictions.hasRestrictions = true;
      restrictions.message =
        "You're using more than 1GB storage. Please reduce usage before downgrading.";
    }

    return restrictions;
  };

  // Handle plan change
  const handlePlanChange = (plan: Plan) => {
    if (plan.isCurrent) return null;

    if (plan.action === "Downgrade") {
      const usageLimitations = checkDowngradeRestrictions(plan);
      if (usageLimitations.hasRestrictions) {
        Toast.error("Cannot Downgrade Plan");
        return null;
      }
    }

    return plan;
  };

  // Handle payment update
  const handlePaymentUpdate = async (formData: PaymentFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update payment method state (in a real app, this would be done via API)
    const last4 = formData.cardNumber.slice(-4);

    Toast.success("Payment Method Updated");

    return { success: true, last4 };
  };

  // Confirm plan change
  const confirmPlanChange = async (
    selectedPlan: Plan,
    billingPeriod: string
  ): Promise<ReceiptData | null> => {
    if (!selectedPlan) return null;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate receipt data
    const receipt: ReceiptData = {
      planName: selectedPlan.name,
      price:
        billingPeriod === "monthly"
          ? selectedPlan.price
          : selectedPlan.yearlyPrice,
      billingPeriod: billingPeriod === "monthly" ? "Monthly" : "Yearly",
      date: new Date().toLocaleDateString(),
      invoiceNumber: `INV-${Date.now().toString().slice(-8)}`,
      prorated: selectedPlan.action === "Upgrade",
      nextBillingDate: new Date(
        Date.now() +
          (billingPeriod === "monthly" ? 30 : 365) * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    };

    Toast.success(
      `Plan ${selectedPlan.action === "Upgrade" ? "Upgraded" : "Downgraded"}`
    );

    return receipt;
  };

  return {
    currentPlan,
    renewalDate,
    paymentMethod,
    usageData,
    billingHistory,
    plans,
    handlePlanChange,
    handlePaymentUpdate,
    confirmPlanChange,
  };
}
