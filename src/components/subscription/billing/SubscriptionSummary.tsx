import Button from "@/components/ui/button";
import Separator from "@/components/ui/Separator";
import { useModal } from "@/context/ModalsContext";
import { useNavigate } from "react-router-dom";

const SubscriptionSummary = () => {
  const { setShowCancelModal } = useModal();
  const navigate = useNavigate();
  return (
    <div className='border border-border p-6 bg-background rounded-lg space-y-6 '>
      <div>
        <div className='pb-3'>
          <h3 className='text-base font-semibold'>Subscription Summary</h3>
          <p>Your current plan and billing cycle</p>
        </div>
        <div>
          <div className='space-y-4'>
            <div className='space-y-1'>
              <div className='text-sm text-muted-foreground'>Current Plan</div>
              <div className='font-medium'>Webshot Pro</div>
            </div>
            <Separator orientation='horizontal' className='mt-3' />
            <div className='space-y-1'>
              <div className='text-sm text-muted-foreground'>Billing Cycle</div>
              <div className='font-medium'>Monthly</div>
            </div>
            <Separator orientation='horizontal' className='mt-3' />
            <div className='space-y-1'>
              <div className='text-sm text-muted-foreground'>Next Payment</div>
              <div className='font-medium'>May 1, 2024</div>
              <div className='text-sm text-muted-foreground'>$19.99</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-stretch gap-2 pt-9'>
          <Button
            onClick={() => navigate("/subscription")}
            className='bg-text text-card border border-border hover:bg-text/80 justify-center'
          >
            Manage Subscription
          </Button>
          <Button
            onClick={() => setShowCancelModal(true)}
            className=' border border-border hover:bg-hover justify-center'
          >
            Cancel Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSummary;
