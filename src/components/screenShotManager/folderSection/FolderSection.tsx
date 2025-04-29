// import { useScreenShot } from "@/context/ScreenShotContext";
// import AddNewFolder from "./AddNewFolder";

// const FolderSection = () => {
//   const { currentFolder, activeTab, subfolders } = useScreenShot();
//   return (
//     <>
//       {currentFolder !== "trash" && activeTab !== "recycle-bin" && (
//         <div className='mb-8'>
//           <AddNewFolder />

//           <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
//             {subfolders.map((folder) => (
//               <div
//                 key={folder.id}
//                 onDragOver={handleDragOver}
//                 onDrop={(e) => handleDrop(e, folder.id)}
//                 className='relative group cursor-pointer rounded-2xl p-4 border shadow-sm hover:shadow transition-all  duration-300 transform hover:scale-[1.02]'
//               >
//                 {/* Folder actions */}
//                 <div
//                   className={cn(
//                     "absolute top-2 right-2 opacity-0 group-hover:opacity-100",
//                     "transition-opacity duration-200"
//                   )}
//                 >
//                   <div className='relative'>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         document
//                           .getElementById(`folder-menu-${folder.id}`)
//                           .classList.toggle("hidden");
//                       }}
//                       className={cn(
//                         "p-1.5 rounded-full transition-all duration-200",
//                         isDarkMode ? "hover:bg-[#4A4A4C]" : "hover:bg-gray-200"
//                       )}
//                     >
//                       <MoreVertical size={16} />
//                     </button>

//                     {/* Folder menu */}
//                     <div
//                       id={`folder-menu-${folder.id}`}
//                       className={cn(
//                         "absolute right-0 mt-1 w-40 rounded-xl shadow-lg z-10 hidden",
//                         "border transition-all duration-200",
//                         isDarkMode
//                           ? "bg-[#2C2C2E] border-[#3A3A3C]"
//                           : "bg-white border-gray-200"
//                       )}
//                     >
//                       <div className='py-1'>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setEditingFolder(folder);
//                             document
//                               .getElementById(`folder-menu-${folder.id}`)
//                               .classList.add("hidden");
//                           }}
//                           className={cn(
//                             "flex items-center w-full px-4 py-2 text-left text-sm",
//                             "transition-colors duration-200",
//                             isDarkMode
//                               ? "hover:bg-[#3A3A3C]"
//                               : "hover:bg-gray-100"
//                           )}
//                         >
//                           <Pencil size={14} className='mr-2' />
//                           Rename
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteFolder(folder.id);
//                             document
//                               .getElementById(`folder-menu-${folder.id}`)
//                               .classList.add("hidden");
//                           }}
//                           className={cn(
//                             "flex items-center w-full px-4 py-2 text-left text-sm text-red-500",
//                             "transition-colors duration-200",
//                             isDarkMode
//                               ? "hover:bg-[#3A3A3C]"
//                               : "hover:bg-gray-100"
//                           )}
//                         >
//                           <Trash2 size={14} className='mr-2' />
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Folder content */}
//                 <div
//                   onClick={() => handleFolderClick(folder.id)}
//                   className='flex flex-col items-center text-center'
//                 >
//                   <div
//                     className={cn(
//                       "w-16 h-16 flex items-center justify-center rounded-xl mb-2",
//                       "transition-all duration-200",
//                       isDarkMode ? "bg-[#3A3A3C]" : "bg-blue-50"
//                     )}
//                   >
//                     <FolderOpen
//                       size={32}
//                       className={isDarkMode ? "text-blue-400" : "text-blue-500"}
//                     />
//                   </div>

//                   {editingFolder && editingFolder.id === folder.id ? (
//                     <div className='mt-2 w-full'>
//                       <input
//                         type='text'
//                         defaultValue={folder.name}
//                         autoFocus
//                         onBlur={(e) =>
//                           handleFolderRename(folder.id, e.target.value)
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") {
//                             handleFolderRename(folder.id, e.target.value);
//                           } else if (e.key === "Escape") {
//                             setEditingFolder(null);
//                           }
//                         }}
//                         onClick={(e) => e.stopPropagation()}
//                         className={cn(
//                           "w-full px-2 py-1 text-center rounded-lg border",
//                           "transition-all duration-200",
//                           isDarkMode
//                             ? "bg-[#3A3A3C] border-[#4A4A4C] text-white"
//                             : "bg-white border-gray-200 text-gray-900"
//                         )}
//                       />
//                     </div>
//                   ) : (
//                     <p className='mt-1 text-sm font-medium truncate w-full'>
//                       {folder.name}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}

//             {/* Create folder button */}
//             <button
//               onClick={() => setIsCreateFolderOpen(true)}
//               className={cn(
//                 "flex flex-col items-center justify-center h-full w-full rounded-2xl p-4",
//                 "border-2 border-dashed transition-all duration-300 transform hover:scale-[1.02]",
//                 isDarkMode
//                   ? "border-[#3A3A3C] hover:border-[#4A4A4C] hover:bg-[#2C2C2E]"
//                   : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//               )}
//             >
//               <div
//                 className={cn(
//                   "w-16 h-16 flex items-center justify-center rounded-xl mb-2",
//                   "transition-all duration-200",
//                   isDarkMode ? "bg-[#3A3A3C]" : "bg-blue-50"
//                 )}
//               >
//                 <Plus
//                   size={24}
//                   className={isDarkMode ? "text-blue-400" : "text-blue-500"}
//                 />
//               </div>
//               <p className='text-sm font-medium'>Create Folder</p>
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FolderSection;
