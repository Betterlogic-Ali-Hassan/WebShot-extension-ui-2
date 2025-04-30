import Button from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>
          Billing & Invoices
        </h1>
        <p className='text-muted-foreground mt-1'>
          Manage your payment methods and view invoice history
        </p>
      </div>
      <div className='mt-4 md:mt-0'>
        <Button>
          <Link
            to='/subscription'
            className='flex items-center  border border-border bg-background px-3 py-2 text-sm rounded-md hover:bg-hover'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Plans
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
