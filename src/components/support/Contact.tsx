import { Mail, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section className='mb-12'>
      <div className='flex items-center mb-8'>
        <div className='icon-container mr-3 bg-card p-2 rounded-full'>
          <Mail className='h-6 w-6' />
        </div>
        <h2 className='text-2xl font-bold text-text'>Contact Us</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-background p-6 rounded-xl border border-border hover:shadow-lg cursor-pointer  transition duration-200'>
          <h3 className='font-semibold text-lg mb-3 text-text'>
            Email Support
          </h3>
          <p className='mb-5 text-base text-foreground'>
            For general inquiries and support requests
          </p>
          <a
            href='mailto:support@screenshotapp.com'
            className=' bg-card border border-border hover:bg-hover rounded-lg  cursor-pointer  px-5 py-2.5 text-base font-medium text-text  disabled:cursor-not-allowed whitespace-nowrap flex items-center max-w-max '
          >
            <Mail className='h-4 w-4 mr-2' />
            Email Us
          </a>
        </div>

        <div className='bg-background p-6 rounded-xl border border-border hover:shadow-lg cursor-pointer  transition duration-200'>
          <h3 className='font-semibold text-lg mb-3 text-text'>
            Phone Support
          </h3>
          <p className='mb-5 text-base text-foreground'>
            Available Monday-Friday, 9am-5pm EST
          </p>
          <a
            href='tel:+18005551234'
            className=' text-base font-medium bg-card border border-border hover:bg-hover rounded-lg  cursor-pointer  px-5 py-2.5  text-text  disabled:cursor-not-allowed whitespace-nowrap flex items-center max-w-max '
          >
            <Phone className='h-4 w-4 mr-2' />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
