import { cn } from "@/lib/utils";
import Button from "../ui/button";
import { useNavigate } from "react-router-dom";
import ArrowUpIcon from "../svgs/ArrowUpIcon";
import WarningIcon from "../svgs/WarningIcon";
const storageData = {
  used: 2.4,
  total: 10,
  percentage: 24,
};

const StorageUsage = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 p-5 rounded-xl border transition-all bg-gradient-to-r  bg-background animate-in fade-in duration-300  border-border'>
      <div className='flex flex-col space-y-3 w-full sm:w-auto mb-4 sm:mb-0'>
        <div className='flex items-center justify-between'>
          <span className='text-base font-semibold'>
            Storage Used: {storageData.used} GB / {storageData.total} GB
          </span>
          <span className='text-sm font-medium ml-2 px-2 py-0.5 rounded-full bg-info-hover/20 text-info'>
            {storageData.percentage}%
          </span>
        </div>
        <div className='w-full sm:w-72 h-3 bg-border rounded-full overflow-hidden'>
          <div
            className='h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-600 dark:to-blue-500'
            style={{ width: `${storageData.percentage}%` }}
          ></div>
        </div>
        {storageData.percentage > 80 && (
          <p className='text-sm text-error flex items-center'>
            <WarningIcon />
            You're running out of storage. Consider upgrading your plan.
          </p>
        )}
      </div>
      <Button
        onClick={() => navigate("/subscription")}
        className={cn(
          "px-5 py-2.5 rounded-lg text-text font-medium transition-all duration-200",
          "bg-info hover:bg-info-hover text-text-primary border border-border",
          "shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
          "flex items-center space-x-2"
        )}
      >
        <ArrowUpIcon />
        <span>Upgrade Plan</span>
      </Button>
    </div>
  );
};

export default StorageUsage;
