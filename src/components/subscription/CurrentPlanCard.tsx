"use client";

import { Sparkles, Info } from "lucide-react";
import Button from "@/components/ui/button";
import Tooltip from "@/components/ui/toolip";
import { PlanName } from "@/types/Plan";

interface CurrentPlanCardProps {
  currentPlan: PlanName;
  renewalDate: string;
  onCancelClick: () => void;
  onUpgradeClick: () => void;
}

export function CurrentPlanCard({
  currentPlan,
  renewalDate,
  onCancelClick,
  onUpgradeClick,
}: CurrentPlanCardProps) {
  // Get icon based on plan
  const getPlanIcon = (plan: PlanName) => {
    switch (plan) {
      case "Free":
        return "💼";
      case "Pro":
        return "⭐";
      case "Team":
        return "👥";
      default:
        return "⭐";
    }
  };

  return (
    <section>
      <div className='overflow-hidden rounded-lg shadow-sm border border-border bg-background'>
        <div className='p-6 pb-2'>
          <h3 className='text-2xl font-semibold text-text'>Current Plan</h3>
          <p className='text-sm text-foreground mt-1'>
            Your subscription details and renewal information
          </p>
        </div>
        <div className='p-6 pt-0'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='flex items-start'>
              <div className='text-3xl mr-4 w-12 h-12 flex items-center justify-center rounded-full bg-btn-hover'>
                {getPlanIcon(currentPlan)}
              </div>
              <div>
                <div className='flex items-center'>
                  <h2 className='text-xl font-bold text-text'>
                    {currentPlan} Plan
                  </h2>
                  {currentPlan === "Pro" && (
                    <span className='ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-info-hover/15 text-info flex items-center'>
                      <Sparkles className='w-3 h-3 mr-1 inline-block' />
                      Popular
                    </span>
                  )}
                </div>
                <div className='flex items-center mt-1'>
                  <p className='text-sm text-foreground'>
                    Renews on {renewalDate}
                  </p>
                  <Tooltip
                    id='renewal-info'
                    content='Your plan will automatically renew on this date. You can cancel anytime before then.'
                    place='top'
                  >
                    <Info className='w-4 h-4 ml-1.5 cursor-help text-foreground' />
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className='mt-4 md:mt-0 flex flex-col sm:flex-row gap-3 '>
              <Button
                onClick={onCancelClick}
                className='border-border bg-background border hover:bg-hover justify-center'
              >
                Cancel Plan
              </Button>
              <Button
                onClick={onUpgradeClick}
                className='bg-text hover:bg-text/80 text-card text-center justify-center'
              >
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
