import { isPlanCurrent } from "@/hooks/useSubscriptionHook";
import { Plan } from "@/types/Plan";

export const plans = [
  {
    name: "Monthly",
    price: "$9.99",
    period: "per month",
    features: [
      "All premium features",
      "Unlimited exports",
      "Cloud storage",
      "Priority support",
    ],
    popular: false,
  },
  {
    name: "Yearly",
    price: "$79.99",
    period: "per year",
    features: [
      "All premium features",
      "Unlimited exports",
      "Cloud storage",
      "Priority support",
      "Save 33%",
    ],
    popular: true,
  },
];
export const projectPlans: Plan[] = [
  {
    name: "Free",
    icon: "💼",
    price: "$0",
    yearlyPrice: "$0",
    period: "mo",
    yearlyPeriod: "yr",
    description: "Basic features for personal use",
    keyFeatures: [
      "5 screenshots per month",
      "1GB storage",
      "Basic editing tools",
    ],
    features: [
      {
        name: "5 screenshots per month",
        included: true,
        info: "Limited to 5 new screenshots each month",
      },
      {
        name: "1GB storage",
        included: true,
        info: "Store up to 1GB of screenshots and assets",
      },
      {
        name: "Basic editing tools",
        included: true,
        info: "Access to essential editing features",
      },
      {
        name: "7-day history",
        included: true,
        info: "Access your screenshots for up to 7 days",
      },
      {
        name: "Cloud sync",
        included: false,
        info: "Sync your screenshots across devices",
      },
      {
        name: "Priority support",
        included: false,
        info: "Get faster responses from our support team",
      },
      {
        name: "Advanced export options",
        included: false,
        info: "Export in various formats and resolutions",
      },
    ],
    isCurrent: isPlanCurrent("Free"),
    action: "Downgrade",
  },
  {
    name: "Pro",
    icon: "⭐",
    price: "$12",
    yearlyPrice: "$115", // $12 * 12 months = $144, with 20% discount = $115.20, rounded to $115
    period: "mo",
    yearlyPeriod: "yr",
    description: "Advanced features for professionals",
    keyFeatures: [
      "1,000 screenshots per month",
      "10GB storage",
      "Advanced editing tools",
    ],
    features: [
      {
        name: "1,000 screenshots per month",
        included: true,
        info: "Take up to 1,000 screenshots monthly",
      },
      {
        name: "10GB storage",
        included: true,
        info: "Store up to 10GB of screenshots and assets",
      },
      {
        name: "Advanced editing tools",
        included: true,
        info: "Access to all editing features including AI enhancement",
      },
      {
        name: "30-day history",
        included: true,
        info: "Access your screenshots for up to 30 days",
      },
      {
        name: "Cloud sync",
        included: true,
        info: "Sync your screenshots across all your devices",
      },
      {
        name: "Priority email support",
        included: true,
        info: "Get responses within 24 hours",
      },
      {
        name: "Team collaboration",
        included: false,
        info: "Share and collaborate with team members",
      },
    ],
    isCurrent: isPlanCurrent("Pro"),
    action: "Current",
    popular: true,
  },
  {
    name: "Team",
    icon: "👥",
    price: "$49",
    yearlyPrice: "$470", // $49 * 12 months = $588, with 20% discount = $470.40, rounded to $470
    period: "mo",
    yearlyPeriod: "yr",
    description: "Complete solution for teams",
    keyFeatures: [
      "Unlimited screenshots",
      "50GB storage",
      "Team collaboration",
    ],
    features: [
      {
        name: "Unlimited screenshots",
        included: true,
        info: "Take unlimited screenshots",
      },
      {
        name: "50GB storage",
        included: true,
        info: "Store up to 50GB of screenshots and assets",
      },
      {
        name: "All editing tools",
        included: true,
        info: "Access to all editing features including AI enhancement",
      },
      {
        name: "90-day history",
        included: true,
        info: "Access your screenshots for up to 90 days",
      },
      {
        name: "Cloud sync",
        included: true,
        info: "Sync across unlimited devices",
      },
      {
        name: "Priority support",
        included: true,
        info: "Get responses within 4 hours",
      },
      {
        name: "Team collaboration",
        included: true,
        info: "Share and collaborate with unlimited team members",
      },
    ],
    isCurrent: isPlanCurrent("Team"),
    action: "Upgrade",
  },
];
