import { Bug, FileQuestion, HelpCircle, Lightbulb } from "lucide-react";

export function ResourcesSection() {
  return (
    <section className='mb-12'>
      <div className='flex items-center mb-8'>
        <div className='icon-container mr-3 p-2 bg-card rounded-full'>
          <HelpCircle className='h-6 w-6' />
        </div>
        <h2 className='text-2xl font-bold text-text'>Additional Resources</h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <a
          href='#'
          className='card flex flex-col items-center text-center hover:bg-hover hover:shadow-sm transition duration-200 bg-card border border-border rounded-xl p-6'
        >
          <div className='icon-container mb-4 p-3 bg-border rounded-full'>
            <FileQuestion className='h-8 w-8' />
          </div>
          <h3 className='font-semibold text-lg mb-2 text-text'>
            Knowledge Base
          </h3>
          <p className='text-base text-foreground'>
            Browse our detailed guides and tutorials
          </p>
        </a>

        <a
          href='#'
          className='card flex flex-col items-center text-center hover:bg-hover hover:shadow-sm transition duration-200 bg-card border border-border rounded-xl p-6'
        >
          <div className='icon-container mb-4 p-3 bg-border rounded-full'>
            <Bug className='h-8 w-8' />
          </div>
          <h3 className='font-semibold text-lg mb-2 text-text'>Bug Reports</h3>
          <p className='text-base text-foreground'>
            Report issues or check known bugs
          </p>
        </a>

        <a
          href='#'
          className='card flex flex-col items-center text-center hover:bg-hover hover:shadow-sm transition duration-200 bg-card border border-border rounded-xl p-6'
        >
          <div className='icon-container mb-4 p-3 bg-border rounded-full'>
            <Lightbulb className='h-8 w-8' />
          </div>
          <h3 className='font-semibold text-lg mb-2 text-text'>
            Feature Requests
          </h3>
          <p className='text-base text-foreground'>
            Suggest new features and improvements
          </p>
        </a>
      </div>
    </section>
  );
}
