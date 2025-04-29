export interface PaymentMethod {
    type: string
    last4: string
    expMonth: number
    expYear: number
    isDefault: boolean
  }
  
  export interface BillingAddress {
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  
  export interface Invoice {
    id: string
    date: string
    amount: string
    status: "Paid" | "Current" | "Pending"
    period: string
  }
  
  export interface SubscriptionSummary {
    plan: string
    billingCycle: string
    nextPaymentDate: string
    nextPaymentAmount: string
  }
  