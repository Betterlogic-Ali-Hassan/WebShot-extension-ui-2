import { cn } from "@/lib/utils";
interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const MobileTabs = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className='md:hidden mb-6 flex rounded-lg overflow-hidden bg-card'>
      <button
        onClick={() => setActiveTab("actions")}
        className={cn(
          "flex-1 py-3 text-center text-sm font-medium transition-all text-text hover:bg-hover",
          activeTab === "actions" && "bg-hover text-text"
        )}
      >
        Actions
      </button>
      <button
        onClick={() => setActiveTab("details")}
        className={cn(
          "flex-1 py-3 text-center text-sm font-medium transition-all text-text hover:bg-hover",
          activeTab === "details" && "bg-hover text-text"
        )}
      >
        Details
      </button>
    </div>
  );
};

export default MobileTabs;
