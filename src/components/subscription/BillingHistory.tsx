"use client";

import { useState } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Toast } from "../ui/toast";

interface BillingHistoryItem {
  date: string;
  amount: string;
  status: string;
  invoice: string;
}

interface BillingHistorySectionProps {
  billingHistory: BillingHistoryItem[];
}

export function BillingHistorySection({
  billingHistory,
}: BillingHistorySectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  // Calculate the total number of pages
  const totalPages = Math.ceil(billingHistory.length / itemsPerPage);

  // Get current items for the page
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return billingHistory.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to generate and download a PDF receipt
  const generateReceipt = (item: BillingHistoryItem) => {
    const doc = new jsPDF();

    // Add company logo/header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Company Name", 105, 20, { align: "center" });

    // Add receipt title
    doc.setFontSize(16);
    doc.text("RECEIPT", 105, 30, { align: "center" });

    // Add receipt details
    doc.setFontSize(12);
    doc.text(`Receipt Number: ${item.invoice}`, 20, 50);
    doc.text(`Date: ${item.date}`, 20, 60);
    doc.text(`Amount: ${item.amount}`, 20, 70);
    doc.text(`Status: ${item.status}`, 20, 80);

    // Add a line
    doc.setDrawColor(220, 220, 220);
    doc.line(20, 90, 190, 90);

    // Add footer
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, 100, { align: "center" });
    doc.text(
      "For questions about this receipt, please contact support@company.com",
      105,
      110,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`receipt-${item.invoice}.pdf`);
  };

  // Function to handle downloading a single invoice
  const handleDownloadInvoice = (invoice: string) => {
    const item = billingHistory.find((item) => item.invoice === invoice);
    if (item) {
      generateReceipt(item);
      Toast.success("Invoice Downloaded");
    }
  };

  // Function to handle downloading all invoices
  const handleDownloadAllInvoices = () => {
    // For multiple invoices, we'll create a single PDF with multiple pages
    const doc = new jsPDF();

    billingHistory.forEach((item, index) => {
      // Add a new page for each invoice except the first one
      if (index > 0) {
        doc.addPage();
      }

      // Add company logo/header
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text("Company Name", 105, 20, { align: "center" });

      // Add receipt title
      doc.setFontSize(16);
      doc.text("RECEIPT", 105, 30, { align: "center" });

      // Add receipt details
      doc.setFontSize(12);
      doc.text(`Receipt Number: ${item.invoice}`, 20, 50);
      doc.text(`Date: ${item.date}`, 20, 60);
      doc.text(`Amount: ${item.amount}`, 20, 70);
      doc.text(`Status: ${item.status}`, 20, 80);

      // Add a line
      doc.setDrawColor(220, 220, 220);
      doc.line(20, 90, 190, 90);

      // Add footer
      doc.setFontSize(10);
      doc.text("Thank you for your business!", 105, 100, { align: "center" });
      doc.text(
        "For questions about this receipt, please contact support@company.com",
        105,
        110,
        { align: "center" }
      );
    });

    // Save the PDF
    doc.save(`all-receipts.pdf`);
    Toast.success("All Invoices Downloaded");
  };

  return (
    <section>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold text-text'>Billing History</h2>
        <Button
          onClick={handleDownloadAllInvoices}
          className='flex items-center border-border border bg-background hover:bg-hover'
        >
          <Download className='w-4 h-4 mr-2' />
          Download All
        </Button>
      </div>

      <div className='rounded-xl overflow-hidden border border-border bg-background'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-card/80 '>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground'>
                  Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground'>
                  Amount
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground'>
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border'>
              {getCurrentItems().map((item, index) => (
                <tr key={index} className='transition-colors hover:bg-card/80'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-text'>
                    {item.date}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-text'>
                    {item.amount}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span className='px-2.5 py-0.5 text-xs rounded-full font-semibold text-text border border-border'>
                      {item.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <button
                      className='flex items-center text-info hover:underline'
                      onClick={() => handleDownloadInvoice(item.invoice)}
                    >
                      {item.invoice}
                      <Download className='w-3 h-3 ml-1' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-center py-4 border-t border-border'>
            <div className='flex items-center space-x-2'>
              <Button
                className='h-8 w-8 border-border border hover:bg-hover justify-center'
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label='Previous page'
              >
                <ChevronLeft className='h-4 w-4 flex-shrink-0' />
              </Button>

              <div className='flex items-center gap-2'>
                {/* Show first page */}
                {currentPage > 2 && (
                  <Button
                    className={cn(
                      "h-8 w-8 border-border hover:bg-hover",
                      currentPage === 1 && "bg-text text-card"
                    )}
                    onClick={() => paginate(1)}
                    aria-label='Page 1'
                  >
                    1
                  </Button>
                )}

                {/* Ellipsis if needed */}
                {currentPage > 3 && (
                  <span className='px-2 text-foreground'>...</span>
                )}

                {/* Previous page if not first */}
                {currentPage > 1 && (
                  <Button
                    className='h-8 w-8 border-border border hover:bg-hover justify-center'
                    onClick={() => paginate(currentPage - 1)}
                    aria-label={`Page ${currentPage - 1}`}
                  >
                    {currentPage - 1}
                  </Button>
                )}

                {/* Current page */}
                <Button
                  className='h-8 w-8 bg-text text-card justify-center'
                  aria-label={`Page ${currentPage}`}
                  aria-current='page'
                >
                  {currentPage}
                </Button>

                {/* Next page if not last */}
                {currentPage < totalPages && (
                  <Button
                    className='h-8 w-8 border-border border hover:bg-hover justify-center'
                    onClick={() => paginate(currentPage + 1)}
                    aria-label={`Page ${currentPage + 1}`}
                  >
                    {currentPage + 1}
                  </Button>
                )}

                {/* Ellipsis if needed */}
                {currentPage < totalPages - 2 && (
                  <span className='px-2 text-foreground'>...</span>
                )}

                {/* Last page if not current */}
                {currentPage < totalPages - 1 && (
                  <Button
                    className='h-8 w-8 border-border border justify-center hover:bg-hover'
                    onClick={() => paginate(totalPages)}
                    aria-label={`Page ${totalPages}`}
                  >
                    {totalPages}
                  </Button>
                )}
              </div>

              <Button
                className='h-8 w-8 border-border border hover:bg-hover justify-center'
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label='Next page'
              >
                <ChevronRight className='h-4 w-4 flex-shrink-0' />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
