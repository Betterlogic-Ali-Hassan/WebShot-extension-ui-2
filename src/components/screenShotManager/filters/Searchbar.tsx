import { useScreenShot } from "@/context/ScreenShotContext";
import { Search } from "lucide-react";

const Searchbar = () => {
  const { searchQuery, setSearchQuery } = useScreenShot();
  return (
    <div className='relative flex items-center text-text'>
      <div className='absolute left-3 text-foreground pointer-events-none transition-all duration-200'>
        <Search size={18} />
      </div>
      <input
        type='text'
        placeholder='Search screenshots...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='pl-10 pr-4 py-2 rounded-full w-full md:w-64 input border border-border'
      />
    </div>
  );
};

export default Searchbar;
