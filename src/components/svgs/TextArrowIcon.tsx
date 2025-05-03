const TextArrowIcon = () => {
  return (
    <div className='relative h-4 w-4'>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 left-0'
      >
        <rect
          x='2'
          y='2'
          width='12'
          height='10'
          rx='2'
          stroke='currentColor'
          strokeWidth='1.5'
        />
      </svg>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute -bottom-1 -right-1'
      >
        <path
          d='M12 10L18 16M18 16H14M18 16V12'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

export default TextArrowIcon;
