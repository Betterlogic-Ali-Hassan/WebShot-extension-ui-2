import { NotificationsSection } from "@/components/profile/Notification";
import { PersonalInfoSection } from "@/components/profile/PersonalInfo";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { SecuritySection } from "@/components/profile/Security";
import { Toast } from "@/components/ui/toast";

export default function ProfilePage() {
  // Handle form submissions
  const handlePersonalInfoSave = (data: {
    name: string;
    email: string;
    avatar: string;
  }) => {
    console.log("Saving personal info:", data);
    Toast.success("Personal information saved!");
  };

  const handleSecuritySave = (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    console.log("Saving security settings:", data);
    // API call would go here
    Toast.success("Security settings saved!");
  };

  const handleNotificationsSave = (data: {
    emailAlerts: boolean;
    inAppNotifications: boolean;
  }) => {
    console.log("Saving notification preferences:", data);
    Toast.success("Notification preferences saved!");
  };

  return (
    <div className='max-h-screen overflow-y-auto bg-card/50'>
      <ProfileLayout />
      <main className=' max-w-4xl mx-auto py-8 px-4 sm:px-6 '>
        <PersonalInfoSection onSave={handlePersonalInfoSave} />
        <SecuritySection onSave={handleSecuritySave} />
        <NotificationsSection onSave={handleNotificationsSave} />
      </main>
    </div>
  );
}
