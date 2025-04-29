import Filters from "./filters/Filters";
import Header from "./Header";
import StorageUsage from "./StorageUsage";
import TabNavigation from "./TabNavigation";

const ScreenShotManager = () => {
  return (
    <div>
      <Header />
      <main>
        <Filters />
        <TabNavigation />
        <StorageUsage />
      </main>
    </div>
  );
};

export default ScreenShotManager;
