import { Invoice } from "@/types/Billing"



export const generateInvoicePDF = async (invoice: Invoice): Promise<Blob> => {

  const invoiceText = `
    INVOICE ${invoice.id}
    ----------------
    Date: ${invoice.date}
    Period: ${invoice.period}
    Amount: ${invoice.amount}
    Status: ${invoice.status}
    
    Thank you for your business!
  `

  // Convert the text to a Blob (in a real app, this would be a PDF)
  const blob = new Blob([invoiceText], { type: "text/plain" })

  return blob
}

// Function to download the invoice
export const downloadInvoice = async (invoice: Invoice) => {
  try {
    // Generate the invoice PDF
    const pdfBlob = await generateInvoicePDF(invoice)

    // Create a download link
    const url = URL.createObjectURL(pdfBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `invoice-${invoice.id}.txt` // In a real app, this would be .pdf

    // Append to the document, click, and clean up
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error("Error downloading invoice:", error)
    return false
  }
}
