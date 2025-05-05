import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='border-b sticky top-0 z-10 bg-background border-border'>
      <div className='max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center'>
        <div className='flex items-center'>
          <button
            onClick={() => navigate("/")}
            className='mr-4 p-2 rounded-full transition-colors hover:bg-hover'
            aria-label='Go back'
          >
            <ArrowLeft className='w-5 h-5' />
          </button>
          <h1 className='text-xl font-bold text-text'>Manage Plan</h1>
        </div>
        <div>
          <button
            className='flex px-4 py-2 text-sm font-medium rounded-md border border-border hover:bg-hover'
            onClick={() => navigate("/support")}
          >
            Need Help?
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
