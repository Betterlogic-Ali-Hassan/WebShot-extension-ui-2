export type PlanName = "Free" | "Pro" | "Team";
export type PlanFeature = {
    name: string;
    included: boolean;
    info: string;
  };
  
  export type Plan = {
    name: PlanName;
    icon: string;
    price: string;
    yearlyPrice: string;
    period: string;
    yearlyPeriod: string;
    description: string;
    keyFeatures: string[];
    features: PlanFeature[];
    isCurrent: boolean;
    action: "Upgrade" | "Downgrade" | "Current";
    popular?: boolean;
  };
  
  export type PaymentMethod = {
    type: string;
    last4: string;
    expiry: string;
  };
  
  export type UsageData = {
    screenshots: {
      used: number;
      total: number;
      percentage: number;
    };
    storage: {
      used: number;
      total: number;
      percentage: number;
    };
    history: {
      days: number;
      used: number;
      percentage: number;
    };
  };
  
  export type BillingHistoryItem = {
    date: string;
    amount: string;
    status: string;
    invoice: string;
  };
  
  export type ReceiptData = {
    planName: string;
    price: string;
    billingPeriod: string;
    date: string;
    invoiceNumber: string;
    prorated: boolean;
    nextBillingDate: string;
  };
  
  export type PaymentFormData = {
    cardNumber: string;
    expiry: string;
    cvv: string;
    name: string;
    country: string;
  };