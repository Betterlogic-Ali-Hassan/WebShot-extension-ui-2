"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { invoices } from "@/constant/InvoicesData";
import { cn } from "@/lib/utils";
import { Download, FileText } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InvoiceHistory = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Function to generate and download a PDF for a single invoice
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateInvoicePDF = (invoice: any) => {
    const doc = new jsPDF();

    // Add company logo/header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Company Name", 105, 20, { align: "center" });

    // Add invoice title
    doc.setFontSize(16);
    doc.text("INVOICE", 105, 30, { align: "center" });

    // Add invoice details
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.id}`, 20, 50);
    doc.text(`Date: ${invoice.date}`, 20, 60);
    doc.text(`Amount: ${invoice.amount}`, 20, 70);
    doc.text(`Status: ${invoice.status}`, 20, 80);

    // Add a line
    doc.setDrawColor(220, 220, 220);
    doc.line(20, 90, 190, 90);

    // Add footer
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, 100, { align: "center" });
    doc.text(
      "For questions about this invoice, please contact support@company.com",
      105,
      110,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`invoice-${invoice.id}.pdf`);
  };

  // Function to handle downloading a single invoice
  const handleDownloadInvoice = (invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    if (invoice) {
      generateInvoicePDF(invoice);
      console.log(`Downloaded invoice ${invoiceId}`);
    }
  };

  // Get filtered invoices based on active tab
  const getFilteredInvoices = () => {
    if (activeTab === "all") return invoices;
    return invoices.filter(
      (invoice) => invoice.status.toLowerCase() === activeTab
    );
  };

  return (
    <div className='mt-8'>
      <h2 className='text-xl font-semibold mb-4'>Invoice History</h2>

      <div>
        <div className='pb-3'>
          <Tabs
            defaultValue='all'
            className='w-full'
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className='grid w-full grid-cols-3 mb-2'>
              <TabsTrigger value='all'>All Invoices</TabsTrigger>
              <TabsTrigger value='paid'>Paid</TabsTrigger>
              <TabsTrigger value='pending'>Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <div className='rounded-md border'>
            <div className='relative w-full overflow-auto'>
              <table className='w-full caption-bottom text-sm'>
                <thead>
                  <tr className='border-b bg-card'>
                    <th className='h-12 px-4 text-left font-medium'>Invoice</th>
                    <th className='h-12 px-4 text-left font-medium'>Date</th>
                    <th className='h-12 px-4 text-left font-medium'>Amount</th>
                    <th className='h-12 px-4 text-left font-medium'>Status</th>
                    <th className='h-12 px-4 text-left font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredInvoices().map((invoice) => (
                    <tr
                      key={invoice.id}
                      className='border-b transition-colors hover:bg-hover/50 cursor-pointer '
                    >
                      <td className='p-4 align-middle font-medium whitespace-nowrap'>
                        {invoice.id}
                      </td>
                      <td className='p-4 align-middle whitespace-nowrap'>
                        {invoice.date}
                      </td>
                      <td className='p-4 align-middle'>{invoice.amount}</td>
                      <td className='p-4 align-middle'>
                        <div
                          className={cn(
                            "border border-border rounded-full text-center max-w-[48px] text-xs py-0.5",
                            invoice.status === "Current" &&
                              "border-info text-info max-w-[60px]"
                          )}
                        >
                          {invoice.status}
                        </div>
                      </td>
                      <td className='p-4 align-middle'>
                        <Button
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className='h-8 w-8 hover:bg-hover justify-center'
                        >
                          <span className='sr-only'>
                            Download invoice {invoice.id}
                          </span>
                          <Download className='h-4 w-4 flex-shrink-0' />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='flex justify-between pt-3'>
          <div className='text-sm text-muted-foreground'>
            Showing {getFilteredInvoices().length} invoices
          </div>
          <Button className='border-border border hover:bg-hover'>
            <FileText className='mr-2 h-4 w-4' />
            Export All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHistory;
