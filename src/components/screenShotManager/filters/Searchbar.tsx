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
        className='pl-10 sm:pr-4 pr-14  py-2 rounded-full w-full md:w-64 bg-background text-base border border-border focus:ring-info outline-none focus:ring-2'
      />
    </div>
  );
};

export default Searchbar;
