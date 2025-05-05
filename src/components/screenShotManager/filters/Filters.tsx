import BreadCrumb from "../BreadCrumb";
import UploadBtn from "../UploadBtn";
import DateFilter from "./DateFilter";
import Searchbar from "./Searchbar";
import TagsSelectionFilter from "./TagsSelectionFilter";

const Filters = () => {
  return (
    <div className='flex sm:items-center justify-between max-sm:flex-col'>
      <div className='max-sm:flex items-center justify-between w-full max-sm:mb-4 flex-wrap '>
        <BreadCrumb />
        <UploadBtn className='sm:hidden' />
      </div>
      <div className='flex sm:items-center items-start gap-4 max-sm:flex-col'>
        <Searchbar />
        <TagsSelectionFilter />
        <DateFilter />
      </div>
    </div>
  );
};

export default Filters;
