import BreadCrumb from "../BreadCrumb";
import DateFilter from "./DateFilter";
import Searchbar from "./Searchbar";
import TagsSelectionFilter from "./TagsSelectionFilter";

const Filters = () => {
  return (
    <div className='flex items-center justify-between'>
      <BreadCrumb />
      <div className='flex items-center gap-4'>
        <Searchbar />
        <TagsSelectionFilter />
        <DateFilter />
      </div>
    </div>
  );
};

export default Filters;
