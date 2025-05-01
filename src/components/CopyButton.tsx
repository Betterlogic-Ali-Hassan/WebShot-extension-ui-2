import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({
  textToCopy,
  onCopy,
}: {
  textToCopy: string;
  onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onCopy();

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "px-3 py-1 mr-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1",
        copied
          ? "bg-green-500/20 text-green-500"
          : "bg-card hover:bg-tool-selected-color text-foreground"
      )}
    >
      {copied ? (
        <>
          <Check className='h-3.5 w-3.5' />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className='h-3.5 w-3.5' />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
