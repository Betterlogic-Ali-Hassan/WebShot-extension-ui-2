"use client";

import { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import Button from "@/components/ui/button";
import Tooltip from "@/components/ui/toolip";
import { cn } from "@/lib/utils";
import { Plan, PlanName } from "@/types/Plan";

interface AvailablePlansSectionProps {
  plans: Plan[];
  currentPlan: PlanName;
  billingPeriod: string;
  onBillingPeriodChange: (period: string) => void;
  onPlanSelect: (plan: Plan) => void;
}

export function AvailablePlansSection({
  plans,
  billingPeriod,
  onBillingPeriodChange,
  onPlanSelect,
}: AvailablePlansSectionProps) {
  const [expandedPlan, setExpandedPlan] = useState<PlanName | null>(null);

  // Toggle expanded plan view
  const togglePlanDetails = (planName: PlanName) => {
    if (expandedPlan === planName) {
      setExpandedPlan(null);
    } else {
      setExpandedPlan(planName);
    }
  };

  return (
    <section className='py-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <div>
          <h2 className='text-xl font-bold text-text'>Available Plans</h2>
          <p className='text-foreground mt-1'>
            Choose the plan that works best for you
          </p>
        </div>
        <div className='mt-2 md:mt-0'>
          <div className='bg-card border border-border rounded-full p-1 flex items-center'>
            <Button
              className={cn(
                "rounded-full px-4",
                billingPeriod === "monthly" && "bg-background shadow-sm"
              )}
              onClick={() => onBillingPeriodChange("monthly")}
            >
              Monthly
            </Button>
            <Button
              className={cn(
                "rounded-full px-4",
                billingPeriod === "yearly" && "bg-background shadow-sm"
              )}
              onClick={() => onBillingPeriodChange("yearly")}
            >
              Yearly (Save 20%)
            </Button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            billingPeriod={billingPeriod}
            isExpanded={expandedPlan === plan.name}
            onToggleDetails={() => togglePlanDetails(plan.name)}
            onSelect={() => onPlanSelect(plan)}
          />
        ))}
      </div>

      <div className='mt-8 p-4 border rounded-xl bg-card/60 mb-12 border-border'>
        <div className='flex items-start'>
          <Sparkles className='w-5 h-5 mr-2 text-info flex-shrink-0 mt-0.5' />
          <div>
            <h3 className='font-medium text-text'>Need a custom plan?</h3>
            <p className='text-sm text-foreground mt-1'>
              Contact our sales team for enterprise solutions with custom
              features, dedicated support, and volume pricing.
            </p>
            <Button className='p-0 h-auto mt-1 text-info hover:underline'>
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PlanCardProps {
  plan: Plan;
  billingPeriod: string;
  isExpanded: boolean;
  onToggleDetails: () => void;
  onSelect: () => void;
}

function PlanCard({
  plan,
  billingPeriod,
  isExpanded,
  onToggleDetails,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] rounded-xl border bg-background",
        plan.isCurrent
          ? "border-text shadow-lg shadow-text/10"
          : plan.popular && !plan.isCurrent
          ? "border-text/30"
          : "border-border"
      )}
    >
      {plan.popular && (
        <div className='absolute top-0 right-0'>
          <span className='!rounded-tl-none !rounded-br-none rounded-full px-2.5 py-1 text-xs font-medium bg-text text-card '>
            <Sparkles className='w-3 h-3 mr-1 inline-block' />
            Popular
          </span>
        </div>
      )}

      {plan.isCurrent && (
        <div className='absolute -top-1 left-0 m-2'>
          <span className='px-2 py-0.5 mb-2 text-xs font-medium rounded-full bg-text/10 text-text border border-border'>
            <CheckCircle2 className='w-3 h-3 mr-1 inline-block' />
            Current
          </span>
        </div>
      )}

      <div className='p-6 pb-2'>
        <div className='flex items-center'>
          <div className='text-2xl mr-3 w-12 h-12 flex items-center justify-center rounded-full bg-btn-hover'>
            {plan.icon}
          </div>
          <div>
            <h3 className='text-lg font-semibold text-text'>{plan.name}</h3>
            <div className='flex items-baseline mt-1'>
              <span className='text-2xl font-bold text-text'>
                {billingPeriod === "monthly" ? plan.price : plan.yearlyPrice}
              </span>
              <span className='text-sm ml-1 text-foreground'>
                /{billingPeriod === "monthly" ? plan.period : plan.yearlyPeriod}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='p-6 pt-2 pb-0'>
        <p className='text-sm text-foreground mb-4'>{plan.description}</p>

        <div className='space-y-3'>
          {plan.keyFeatures.map((feature, i) => (
            <div key={i} className='flex items-center'>
              <div className='flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-2 bg-text/10'>
                <CheckCircle2 className='w-3.5 h-3.5 text-text' />
              </div>
              <span className='text-sm text-text'>{feature}</span>
            </div>
          ))}
        </div>

        <Button
          className='px-0 mt-4 h-auto font-normal text-text'
          onClick={onToggleDetails}
        >
          {isExpanded ? (
            <span className='flex items-center'>
              Show less <ChevronUp className='ml-1 w-3 h-3' />
            </span>
          ) : (
            <span className='flex items-center'>
              Show all features <ChevronDown className='ml-1 w-3 h-3' />
            </span>
          )}
        </Button>

        {isExpanded && (
          <div className='mt-3 pt-3 border-t border-border space-y-3'>
            {plan.features.map((feature, i) => (
              <div key={i} className='flex items-start'>
                {feature.included ? (
                  <div className='flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 bg-text/10'>
                    <CheckCircle2 className='w-3.5 h-3.5 text-text' />
                  </div>
                ) : (
                  <div className='flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 bg-hover'>
                    <XCircle className='w-3.5 h-3.5 text-foreground' />
                  </div>
                )}
                <div className='flex items-center'>
                  <span
                    className={cn(
                      "text-sm",
                      feature.included ? "text-text" : "text-foreground"
                    )}
                  >
                    {feature.name}
                  </span>
                  {feature.info && (
                    <Tooltip
                      id={`feature-info-${i}`}
                      content={feature.info}
                      place='top'
                    >
                      <HelpCircle className='w-3.5 h-3.5 ml-1.5 cursor-help text-foreground' />
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='p-6 pt-4'>
        {!plan.isCurrent ? (
          <Button
            onClick={onSelect}
            className={cn(
              "w-full justify-center",
              plan.action === "Downgrade"
                ? "border border-border hover:bg-hover "
                : "bg-text hover:bg-text/80 text-card"
            )}
          >
            {plan.action === "Upgrade"
              ? "Upgrade to " + plan.name
              : plan.action}
          </Button>
        ) : (
          <div className='w-full flex flex-col gap-2'>
            <Button
              className='w-full border border-border justify-center disabled:opacity-60'
              disabled
            >
              Current Plan
            </Button>
            <p className='text-xs text-center text-foreground'>
              Renews on {new Date().toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
