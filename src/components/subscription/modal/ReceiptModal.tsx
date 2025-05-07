"use client";

import { X, Download } from "lucide-react";
import Button from "@/components/ui/button";
import type { ReceiptData } from "@/types/Plan";
import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Modal from "@/components/ui/Modal";
import { Toast } from "@/components/ui/toast";

interface ReceiptModalProps {
  receiptData: ReceiptData;
  billingPeriod: string;
  onClose: () => void;
}

export function ReceiptModal({
  receiptData,
  billingPeriod,
  onClose,
}: ReceiptModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      // Create a new PDF document
      const doc = new jsPDF();

      // Add company logo/header
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text("RECEIPT", 105, 20, { align: "center" });

      // Add receipt details
      doc.setFontSize(12);
      doc.text(`Invoice #: ${receiptData.invoiceNumber}`, 20, 40);
      doc.text(`Date: ${receiptData.date}`, 20, 50);

      // Add customer info section
      doc.setFontSize(14);
      doc.text("Receipt Details", 20, 70);

      // Create table for receipt details
      autoTable(doc, {
        startY: 75,
        head: [["Item", "Details"]],
        body: [
          ["Plan", receiptData.planName],
          ["Billing", receiptData.billingPeriod],
          [
            "Price",
            `${receiptData.price}/${
              billingPeriod === "monthly" ? "month" : "year"
            }`,
          ],
          ["Next Billing Date", receiptData.nextBillingDate],
          receiptData.prorated ? ["Charge Type", "Prorated"] : ["", ""],
        ],
        theme: "grid",
        headStyles: { fillColor: [60, 60, 60] },
      });

      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(
          "Thank you for your business!",
          105,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      }

      // Save the PDF
      doc.save(`Receipt-${receiptData.invoiceNumber}.pdf`);

      Toast.success("Receipt Downloaded Successfully");
    } catch (error) {
      console.error("Error generating receipt:", error);
      Toast.error("Failed to download receipt. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal>
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-text'>Receipt</h3>
          <Button
            onClick={onClose}
            className='rounded-full h-10 w-10 flex items-center justify-center hover:bg-hover'
          >
            <X className='w-5 h-5 flex-shrink-0' />
          </Button>
        </div>
      </div>
      <div className='p-6 pt-0'>
        <div className='space-y-4'>
          <div className='flex justify-between items-center pb-2 border-b border-border'>
            <span className='text-sm text-foreground'>Plan</span>
            <span className='font-medium text-text'>
              {receiptData.planName}
            </span>
          </div>
          <div className='flex justify-between items-center pb-2 border-b border-border'>
            <span className='text-sm text-foreground'>Billing</span>
            <span className='font-medium text-text'>
              {receiptData.billingPeriod}
            </span>
          </div>
          <div className='flex justify-between items-center pb-2 border-b border-border'>
            <span className='text-sm text-foreground'>Price</span>
            <span className='font-medium text-text'>
              {receiptData.price}/
              {billingPeriod === "monthly" ? "month" : "year"}
            </span>
          </div>
          <div className='flex justify-between items-center pb-2 border-b border-border'>
            <span className='text-sm text-foreground'>Date</span>
            <span className='font-medium text-text'>{receiptData.date}</span>
          </div>
          <div className='flex justify-between items-center pb-2 border-b border-border'>
            <span className='text-sm text-foreground'>Invoice Number</span>
            <span className='font-medium text-text'>
              {receiptData.invoiceNumber}
            </span>
          </div>
          {receiptData.prorated && (
            <div className='flex justify-between items-center pb-2 border-b border-border'>
              <span className='text-sm text-foreground'>Charge Type</span>
              <span className='px-2 py-1 text-xs rounded-full border border-border'>
                Prorated
              </span>
            </div>
          )}
          <div className='flex justify-between items-center'>
            <span className='text-sm text-foreground'>Next Billing Date</span>
            <span className='font-medium text-text'>
              {receiptData.nextBillingDate}
            </span>
          </div>
        </div>
      </div>
      <div className='p-6 pt-0 flex justify-between'>
        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          className='flex items-center bg-card border border-border hover:bg-hover'
        >
          <Download className='w-4 h-4 mr-2' />
          {isGenerating ? "Generating..." : "Download Receipt"}
        </Button>
        <Button
          onClick={onClose}
          className='bg-text hover:bg-text/80 text-card'
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
