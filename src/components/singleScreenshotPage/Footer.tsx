import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='py-6 px-6 mt-8 border-t bg-background text-text w-full'>
      <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between'>
        <div className='mb-4 md:mb-0'>
          <p className='text-sm'>
            Shared via <span className='font-semibold'>Screenshot Manager</span>
          </p>
        </div>
        <div className='flex items-center space-x-4'>
          <Link
            to='/'
            className='text-sm hover:underline transition-all text-info hover:text-info'
          >
            Create your own
          </Link>
          <Link
            to='/support'
            className='text-sm hover:underline transition-all text-info hover:text-info'
          >
            Get support
          </Link>
          <Link to='/privacy' className='text-sm hover:underline'>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
