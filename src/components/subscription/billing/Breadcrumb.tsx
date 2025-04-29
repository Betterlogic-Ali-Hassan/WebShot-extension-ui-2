import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div className='flex items-center text-sm text-muted-foreground mb-6'>
      <Link
        to='/'
        className='flex items-center hover:text-foreground transition-colors hover:underline'
      >
        <Home className='h-4 w-4 mr-1' />
        <span>Home</span>
      </Link>
      <span className='mx-2'>/</span>
      <Link
        to='/subscription'
        className='hover:text-foreground transition-colors hover:underline'
      >
        Subscription
      </Link>
      <span className='mx-2'>/</span>
      <span className='text-foreground'>Billing</span>
    </div>
  );
};

export default Breadcrumb;
