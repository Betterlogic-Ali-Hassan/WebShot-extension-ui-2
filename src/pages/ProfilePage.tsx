import { NotificationsSection } from "@/components/profile/Notification";
import { PersonalInfoSection } from "@/components/profile/PersonalInfo";
import { SecuritySection } from "@/components/profile/Security";
import { toast } from "react-toastify";

export default function ProfilePage() {
  // Handle form submissions
  const handlePersonalInfoSave = (data: {
    name: string;
    email: string;
    avatar: string;
  }) => {
    console.log("Saving personal info:", data);
    toast.success("Personal information saved!");
  };

  const handleSecuritySave = (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    console.log("Saving security settings:", data);
    // API call would go here
    toast.success("Security settings saved!");
  };

  const handleNotificationsSave = (data: {
    emailAlerts: boolean;
    inAppNotifications: boolean;
  }) => {
    console.log("Saving notification preferences:", data);
    toast.success("Notification preferences saved!");
  };

  return (
    <main className='max-h-screen overflow-y-auto max-w-4xl mx-auto py-8 px-4 sm:px-6 no-scrollbar'>
      <PersonalInfoSection onSave={handlePersonalInfoSave} />
      <SecuritySection onSave={handleSecuritySave} />
      <NotificationsSection onSave={handleNotificationsSave} />
    </main>
  );
}
