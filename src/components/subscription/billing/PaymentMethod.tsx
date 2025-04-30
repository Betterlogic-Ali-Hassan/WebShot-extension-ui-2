import Button from "@/components/ui/button";
import { useModal } from "@/context/ModalsContext";
import { CreditCard, Edit, Plus } from "lucide-react";
// Mock data for demonstration
const paymentMethod = {
  type: "Visa",
  last4: "4242",
  expMonth: 12,
  expYear: 2025,
  isDefault: true,
};
const PaymentMethod = () => {
  const { setShowPaymentModal } = useModal();
  return (
    <div className='border border-border p-6 bg-background rounded-lg '>
      <div className='pb-4'>
        <h3 className='text-lg font-semibold'>Payment Method</h3>
        <p>Your current payment method used for subscription billing</p>
      </div>

      <div className='flex items-start space-x-4'>
        <div className='flex items-center justify-center h-12 w-16 rounded-md bg-card'>
          <CreditCard className='h-6 w-6' />
        </div>
        <div className='space-y-1'>
          <div className='flex items-center'>
            <p className='font-medium'>
              {paymentMethod.type} •••• {paymentMethod.last4}
            </p>
            {paymentMethod.isDefault && <div className='ml-2'>Default</div>}
          </div>
          <p className='text-sm text-muted-foreground'>
            Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
          </p>
        </div>
      </div>

      <div className='flex justify-between pt-9'>
        <Button
          onClick={() => setShowPaymentModal(true)}
          className='border border-border hover:bg-hover'
        >
          <Edit className='mr-2 h-4 w-4' />
          Update
        </Button>
        <Button
          onClick={() => setShowPaymentModal(true)}
          className='border border-border hover:bg-hover bg-background'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
