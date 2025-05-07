import Modal from "@/components/ui/Modal";
import { Toast } from "@/components/ui/toast";
import { useScreenShot } from "@/context/ScreenShotContext";
import { screenShot } from "@/types/ScreenShot";
import { ArrowUpRight, Download, Edit, Share, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PreviewModal = () => {
  const {
    previewImage,
    setIsPreviewOpen,
    handleShare,
    handleRestore,
    handleDownload,
  } = useScreenShot();
  const navigate = useNavigate();
  const handleEdit = (screenshot: screenShot | null) => {
    if (!screenshot?.url) {
      Toast.error("No URL found for editing");
      return;
    }

    navigate(`/?image=${encodeURIComponent(screenshot.url)}`);
  };
  return (
    <Modal className='max-w-4xl rounded-2xl'>
      <div className='relative w-full  rounded-2xl overflow-hidden  shadow-lg transition-all duration-200 bg-background '>
        {/* Modal header */}
        <div className='flex items-center justify-between p-4 border-b border-border'>
          <h3 className='font-medium'>{previewImage?.name}</h3>
          <button
            onClick={() => setIsPreviewOpen(false)}
            className='p-1.5 rounded-full transition-all duration-200 hover:bg-hover'
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className='p-4 bg-checkered overflow-hidden'>
          <div className='max-h-[70vh] overflow-y-auto no-scrollbar'>
            <img
              src={previewImage?.url || "/placeholder.svg"}
              alt={previewImage?.name}
              className='w-full object-contain'
            />
          </div>
        </div>

        {/* Modal footer */}
        <div className='flex items-center justify-between p-4 border-t no-scrollbar flex-wrap gap-4'>
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-foreground'>
              {previewImage?.date}
            </span>
            {previewImage?.tags && previewImage.tags.length > 0 && (
              <div className='flex flex-wrap gap-1'>
                {previewImage?.tags.map((tag) => (
                  <span
                    key={tag}
                    className='px-2 py-0.5 rounded-full text-xs transition-colors duration-200 bg-card'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            {!previewImage?.trash && (
              <>
                <button
                  onClick={() => {
                    handleEdit(previewImage);
                    setIsPreviewOpen(false);
                  }}
                  className='flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 bg-card hover:bg-hover'
                >
                  <Edit size={14} className='mr-1' />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    handleShare(previewImage);
                    setIsPreviewOpen(false);
                  }}
                  className='flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 bg-card hover:bg-hover'
                >
                  <Share size={14} className='mr-1' />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => {
                    handleDownload(previewImage);
                    setIsPreviewOpen(false);
                  }}
                  className='flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow bg-info hover:bg-info-hover text-text-primary'
                >
                  <Download size={14} className='mr-1' />
                  <span>Download</span>
                </button>
              </>
            )}

            {previewImage?.trash && (
              <button
                onClick={() => {
                  handleRestore(previewImage.id);
                  setIsPreviewOpen(false);
                }}
                className='flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow bg-info hover:bg-info-hover text-text-primary'
              >
                <ArrowUpRight size={14} className='mr-1' />
                <span>Restore</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
