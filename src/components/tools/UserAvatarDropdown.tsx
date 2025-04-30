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
import { useImageEditor } from "@/context/ImageContext";
import { useNavigate } from "react-router-dom";

interface UserAvatarDropdownProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  subscriptionPlan?: "Free" | "Pro" | "Team" | "Enterprise";
  renewalDate?: string;
}

export function UserAvatarDropdown({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar,
  subscriptionPlan = "Pro",
  renewalDate = "Sep 20, 2025",
}: UserAvatarDropdownProps) {
  const { toolbarPosition } = useImageEditor();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
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

  // Get plan-specific styling
  const getPlanStyles = () => {
    switch (subscriptionPlan) {
      case "Pro":
        return {
          gradient: "bg-gradient-to-r from-blue-400 to-indigo-500",
          bg: "bg-blue-100",
          text: "text-blue-600",
        };
      case "Team":
        return {
          gradient: "bg-gradient-to-r from-purple-400 to-pink-500",
          bg: "bg-purple-100",
          text: "text-purple-600",
        };
      case "Enterprise":
        return {
          gradient: "bg-gradient-to-r from-amber-400 to-orange-500",
          bg: "bg-amber-100",
          text: "text-amber-600",
        };
      default:
        return {
          gradient: "bg-gradient-to-r from-gray-400 to-gray-500",
          bg: "bg-gray-100",
          text: "text-gray-600",
        };
    }
  };

  // Get dropdown position based on toolbar position
  const getDropdownPosition = () => {
    switch (toolbarPosition) {
      case "left":
        return "left-0 ml-[100px]";
      case "bottom":
        return "mb-[80px] bottom-0";
      default:
        return "right-1/2 min-[1600px]:translate-x-[150%] translate-x-[115%] left-1/2";
    }
  };

  // Menu action handlers
  const handleMenuAction = (action: string) => {
    navigate(action);
    setIsOpen(false);
    console.log(`Action: ${action}`);
    // Implement actual navigation/actions here
  };

  const planStyles = getPlanStyles();

  return (
    <div ref={dropdownRef}>
      {/* Avatar Button */}
      <Tooltip id='user-avatar' content='Profile'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center justify-center rounded-full w-9 h-9 transition-colors bg-card hover:bg-btn-hover'
          aria-expanded={isOpen}
          aria-haspopup='true'
          aria-label='User profile menu'
        >
          {userAvatar ? (
            <img
              src={userAvatar || "/placeholder.svg"}
              alt={`${userName}'s avatar`}
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
            "fixed mt-2 w-72 rounded-xl shadow-xl py-3 z-50 border backdrop-blur-lg",
            "animate-in fade-in-80 slide-in-from-top-3 zoom-in-98 bg-background border-border text-text",
            getDropdownPosition()
          )}
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='user-menu-button'
        >
          {/* User Info Header */}
          <div className='px-4 py-3 border-b border-opacity-10 border-current'>
            <p className='text-base font-medium'>{userName}</p>
            <p className='text-sm opacity-70 truncate'>{userEmail}</p>
          </div>

          {/* Subscription Info */}
          <div className='px-4 py-3'>
            <div className='rounded-lg overflow-hidden bg-background border border-border'>
              {/* Plan header with gradient accent */}
              <div className={cn("h-1.5 w-full", planStyles.gradient)} />

              <div className='p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full mr-3",
                        planStyles.bg,
                        planStyles.text
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
                          <span className='ml-2 text-xs px-1.5 py-0.5 rounded-full bg-info text-text-primary'>
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
                    onClick={() => handleMenuAction("/subscription")}
                    className='flex-1 text-sm flex items-center justify-center py-2 px-3 rounded-md transition-all duration-200 bg-info text-text-primary hover:bg-info-hover'
                  >
                    <CreditCard className='h-4 w-4 mr-2' />
                    Manage Plan
                  </button>

                  <button
                    onClick={() => handleMenuAction("/billing")}
                    className='text-sm flex items-center justify-center py-2 px-3 rounded-md transition-all duration-200 bg-card hover:bg-hover'
                    aria-label='View billing details'
                  >
                    <ChevronRight className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className='py-1' aria-label='User menu'>
            <button
              onClick={() => handleMenuAction("/profile")}
              className='flex items-center w-full px-5 py-2.5 text-base transition-colors hover:bg-hover'
              role='menuitem'
            >
              <User className='h-5 w-5 mr-3 opacity-70' />
              <span>Profile Settings</span>
              <ChevronRight className='h-5 w-5 ml-auto opacity-50' />
            </button>

            <button
              onClick={() => handleMenuAction("/screenshot")}
              className='flex items-center w-full px-5 py-2.5 text-base transition-colors hover:bg-hover'
              role='menuitem'
            >
              <ImageIcon className='h-5 w-5 mr-3 opacity-70' />
              <span>Manage Uploads</span>
              <ChevronRight className='h-5 w-5 ml-auto opacity-50' />
            </button>

            <button
              onClick={() => handleMenuAction("help")}
              className='flex items-center w-full px-5 py-2.5 text-base transition-colors hover:bg-hover'
              role='menuitem'
            >
              <LifeBuoy className='h-5 w-5 mr-3 opacity-70' />
              <span>Help & Support</span>
              <ChevronRight className='h-5 w-5 ml-auto opacity-50' />
            </button>

            <div className='h-px my-1 opacity-20 bg-current' role='separator' />

            <button
              onClick={() => handleMenuAction("logout")}
              className='flex items-center w-full px-5 py-2.5 text-base transition-colors hover:bg-hover text-error'
              role='menuitem'
            >
              <LogOut className='h-5 w-5 mr-3 opacity-70' />
              <span>Log Out</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
