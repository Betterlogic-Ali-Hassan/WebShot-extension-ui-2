import Button from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Address } from "./Billing";
import { useModal } from "@/context/ModalsContext";

const BillingAddress = ({ billingAddress }: { billingAddress: Address }) => {
  const { setAddressFormModal } = useModal();

  return (
    <div className='border border-border p-6 bg-background rounded-lg '>
      <div className='pb-4'>
        <h3 className='text-lg font-semibold'>Billing Address</h3>
        <div>The address used for your billing statements</div>
      </div>
      <div>
        <div className='space-y-1'>
          <p className='font-medium'>{billingAddress.name}</p>
          <p className='text-sm'>{billingAddress.line1}</p>
          {billingAddress.line2 && (
            <p className='text-sm'>{billingAddress.line2}</p>
          )}
          <p className='text-sm'>
            {billingAddress.city}, {billingAddress.state}{" "}
            {billingAddress.postalCode}
          </p>
          <p className='text-sm'>{billingAddress.country}</p>
        </div>
      </div>
      <div className='pt-9'>
        <Button
          className='border-border border bg-background  hover:bg-hover '
          onClick={() => setAddressFormModal(true)}
        >
          <Edit className='mr-2 h-4 w-4' />
          Update Address
        </Button>
      </div>
    </div>
  );
};

export default BillingAddress;
