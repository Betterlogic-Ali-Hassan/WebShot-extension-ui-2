import { ArrowLeft, CheckSquare, Grid, List, Square } from "lucide-react";
import { UserAvatarDropdown } from "../tools/UserAvatarDropdown";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useScreenShot } from "@/context/ScreenShotContext";
import UploadBtn from "./UploadBtn";

const Header = () => {
  const { viewMode, setIsMultiSelectMode, setViewMode, isMultiSelectMode } =
    useScreenShot();
  const navigate = useNavigate();
  return (
    <header className='sticky top-0 z-10 py-4 px-6 backdrop-blur-md bg-background shadow-sm border-b'>
      <div className='max-w-screen-2xl mx-auto '>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <button
              onClick={() => navigate("/")}
              className='p-2 rounded-full transition-all duration-200 hover:bg-hover'
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className='sm:text-2xl text-lg font-bold'>
              Screenshot Manager
            </h1>
          </div>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className='p-2 rounded-full transition-all duration-200 hover:bg-hover'
            >
              {viewMode === "grid" ? <List size={20} /> : <Grid size={20} />}
            </button>
            <UploadBtn className='max-sm:hidden' />
            <div className='flex items-center space-x-3'>
              <button
                onClick={() => setIsMultiSelectMode(!isMultiSelectMode)}
                className={cn(
                  "p-2 rounded-full transition-all duration-200 hover:bg-hover",
                  isMultiSelectMode &&
                    "bg-info text-text-primary hover:bg-info-hover"
                )}
                title='Multi-select mode'
              >
                {isMultiSelectMode ? (
                  <CheckSquare size={20} />
                ) : (
                  <Square size={20} />
                )}
              </button>
              <UserAvatarDropdown
                userName='John Doe'
                userEmail='john@example.com'
                subscriptionPlan='Pro'
                renewalDate='Sep 20, 2025'
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
