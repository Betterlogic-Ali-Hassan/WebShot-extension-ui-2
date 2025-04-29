import { cn } from "@/lib/utils";
import Button from "../ui/button";
import { useNavigate } from "react-router-dom";
const storageData = {
  used: 2.4,
  total: 10,
  percentage: 24,
};

const StorageUsage = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 p-5 rounded-lg border transition-all duration-200 bg-card border-border'>
      <div className='flex flex-col space-y-3 w-full sm:w-auto mb-4 sm:mb-0'>
        <div className='flex items-center justify-between'>
          <span className='text-base font-semibold'>
            Storage Used: {storageData.used} GB / {storageData.total} GB
          </span>
          <span className='text-sm font-medium ml-2 px-2 py-0.5 rounded-full bg-card text-card'>
            {storageData.percentage}%
          </span>
        </div>
        <div className='w-full sm:w-72 h-3 bg-background rounded-full overflow-hidden'>
          <div
            className='h-full rounded-full transition-all duration-500 bg-card text-card'
            style={{ width: `${storageData.percentage}%` }}
          ></div>
        </div>
        {storageData.percentage > 80 && (
          <p className='text-sm text-error flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
            You're running out of storage. Consider upgrading your plan.
          </p>
        )}
      </div>
      <Button
        onClick={() => navigate("/subscription")}
        className={cn(
          "px-5 py-2.5 rounded-lg text-text font-medium transition-all duration-200",
          "bg-card hover:bg-hover border border-border",
          "shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
          "flex items-center space-x-2"
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 10l7-7m0 0l7 7m-7-7v18'
          />
        </svg>
        <span>Upgrade Plan</span>
      </Button>
    </div>
  );
};

export default StorageUsage;
