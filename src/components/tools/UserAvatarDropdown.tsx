"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  CreditCard,
  LifeBuoy,
  LogOut,
  ImageIcon,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Tooltip from "../ui/toolip";

interface UserAvatarDropdownProps {
  isDarkMode: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  subscriptionPlan?: "Free" | "Pro" | "Team" | "Enterprise";
  renewalDate?: string;
  onProfileClick?: () => void;
  onManageUploadsClick?: () => void;
  onHelpClick?: () => void;
  onLogoutClick?: () => void;
  onManagePlanClick?: () => void;
  toolbarPosition: "top" | "left" | "bottom";
}

export function UserAvatarDropdown({
  isDarkMode,
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar,
  subscriptionPlan = "Pro",
  renewalDate = "Sep 20, 2025",
  toolbarPosition,
}: UserAvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to close dropdown
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  // Get plan icon based on subscription plan
  const getPlanIcon = () => {
    switch (subscriptionPlan) {
      case "Pro":
        return "⭐";
      case "Team":
        return "👥";
      case "Enterprise":
        return "🏢";
      default:
        return "💼";
    }
  };

  // Handle menu item clicks
  const handleProfileClick = () => {
    setIsOpen(false);
    // router.push("/profile");
  };

  const handleManageUploadsClick = () => {
    setIsOpen(false);
    // router.push("/screenshots");
    // Ensure we're navigating to the screenshots page
    console.log("Navigating to screenshots page");
  };

  const handleHelpClick = () => {
    setIsOpen(false);
    // router.push("/support");
  };

  const handleManagePlanClick = () => {
    setIsOpen(false);
    // router.push("/subscription");
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    // In a real app, you would handle logout logic here
    // For now, just redirect to the home page
    // router.push("/");
  };

  return (
    <div ref={dropdownRef}>
      {/* Avatar Button */}

      <Tooltip id='user-avatar' content={"Profile"}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-center rounded-full w-9 h-9 transition-colors",
            isDarkMode
              ? "bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          )}
          aria-expanded={isOpen}
          aria-haspopup='true'
        >
          {userAvatar ? (
            <img
              src={userAvatar || "/placeholder.svg"}
              alt={userName}
              className='w-full h-full rounded-full object-cover'
            />
          ) : (
            <span className='text-sm font-medium'>{userName.charAt(0)}</span>
          )}
        </button>
      </Tooltip>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "fixed mt-2 w-72 rounded-xl shadow-xl py-3 z-50 border backdrop-blur-lg transform transition-all duration-300 ease-out",
            "animate-in fade-in-80 slide-in-from-top-3 zoom-in-98",
            isDarkMode
              ? "bg-[#1C1C1E]/90 border-[#2C2C2E] text-[#F2F2F7] shadow-[0_8px_30px_rgb(0,0,0,0.25)]"
              : "bg-white/95 border-gray-200 text-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
            toolbarPosition === "left"
              ? "left-0 ml-[100px] "
              : toolbarPosition === "bottom"
              ? "mb-[80px] bottom-0"
              : "right-1/2 min-[1600px]:translate-x-[150%] translate-x-[115%] left-1/2 "
          )}
        >
          {/* User Info Header */}
          <div className='px-4 py-3 border-b border-opacity-10 border-current'>
            <p className='text-base font-medium'>{userName}</p>
            <p className='text-sm opacity-70 truncate'>{userEmail}</p>
          </div>

          {/* Subscription Info */}
          <div className='px-4 py-3'>
            <div
              className={cn(
                "rounded-lg overflow-hidden",
                isDarkMode
                  ? "bg-gradient-to-br from-[#2C2C2E] to-[#1C1C1E] border border-[#3A3A3C]"
                  : "bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm"
              )}
            >
              {/* Plan header with gradient accent */}
              <div
                className={cn(
                  "h-1.5 w-full",
                  subscriptionPlan === "Pro"
                    ? "bg-gradient-to-r from-blue-400 to-indigo-500"
                    : subscriptionPlan === "Team"
                    ? "bg-gradient-to-r from-purple-400 to-pink-500"
                    : subscriptionPlan === "Enterprise"
                    ? "bg-gradient-to-r from-amber-400 to-orange-500"
                    : "bg-gradient-to-r from-gray-400 to-gray-500"
                )}
              />

              <div className='p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full mr-3",
                        subscriptionPlan === "Pro"
                          ? "bg-blue-100 text-blue-600"
                          : subscriptionPlan === "Team"
                          ? "bg-purple-100 text-purple-600"
                          : subscriptionPlan === "Enterprise"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      <span className='text-lg' aria-hidden='true'>
                        {getPlanIcon()}
                      </span>
                    </div>
                    <div>
                      <p className='text-base font-medium flex items-center'>
                        {subscriptionPlan} Plan
                        {subscriptionPlan === "Pro" && (
                          <span
                            className={cn(
                              "ml-2 text-xs px-1.5 py-0.5 rounded-full",
                              isDarkMode
                                ? "bg-blue-900/30 text-blue-300"
                                : "bg-blue-100 text-blue-700"
                            )}
                          >
                            Active
                          </span>
                        )}
                      </p>
                      <p className='text-sm opacity-70'>
                        Renews: {renewalDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex items-center mt-3 space-x-2'>
                  <button
                    onClick={handleManagePlanClick}
                    className={cn(
                      "flex-1 text-sm flex items-center justify-center py-2 px-3 rounded-md transition-all duration-200",
                      isDarkMode
                        ? "bg-blue-500 hover:bg-blue-400 text-white shadow-sm hover:shadow-md hover:shadow-blue-500/20 hover:scale-[1.02]"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-sm hover:shadow-md hover:shadow-blue-500/20 hover:scale-[1.02]"
                    )}
                  >
                    <CreditCard className='h-4 w-4 mr-2' />
                    Manage Plan
                  </button>

                  <button
                    // onClick={() => router.push("/subscription/billing")}
                    className={cn(
                      "text-sm flex items-center justify-center py-2 px-3 rounded-md transition-all duration-200",
                      isDarkMode
                        ? "bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    )}
                  >
                    <ChevronRight className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className='py-1'>
            <button
              onClick={handleProfileClick}
              className={cn(
                "flex items-center w-full px-5 py-2.5 text-base transition-colors",
                isDarkMode ? "hover:bg-[#2C2C2E]" : "hover:bg-gray-100"
              )}
            >
              <User className='h-5 w-5 mr-3 opacity-70' />
              <span>Profile Settings</span>
              <ChevronRight className='h-5 w-5 ml-auto opacity-50' />
            </button>

            <button
              onClick={handleManageUploadsClick}
              className={cn(
                "flex items-center w-full px-5 py-2.5 text-base transition-colors",
                isDarkMode ? "hover:bg-[#2C2C2E]" : "hover:bg-gray-100"
              )}
            >
              <ImageIcon className='h-5 w-5 mr-3 opacity-70' />
              <span>Manage Uploads</span>
              <ChevronRight className='h-5 w-5 ml-auto opacity-50' />
            </button>

            <button
              onClick={handleHelpClick}
              className={cn(
                "flex items-center w-full px-5 py-2.5 text-base transition-colors",
                isDarkMode ? "hover:bg-[#2C2C2E]" : "hover:bg-gray-100"
              )}
            >
              <LifeBuoy className='h-5 w-5 mr-3 opacity-70' />
              <span>Help & Support</span>
              <ChevronRight className='h-5 w-5 ml-auto opacity-50' />
            </button>

            <div className='h-px my-1 opacity-20 bg-current' />

            <button
              onClick={handleLogoutClick}
              className={cn(
                "flex items-center w-full px-5 py-2.5 text-base transition-colors",
                isDarkMode
                  ? "hover:bg-[#2C2C2E] text-red-400"
                  : "hover:bg-gray-100 text-red-500"
              )}
            >
              <LogOut className='h-5 w-5 mr-3 opacity-70' />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
