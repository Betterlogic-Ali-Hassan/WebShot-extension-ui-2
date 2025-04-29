const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200'>
      <div className='w-full max-w-md rounded-lg border border-border bg-background'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
