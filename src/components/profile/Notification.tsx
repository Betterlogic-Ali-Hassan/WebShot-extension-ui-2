import { useState } from "react";
import { Bell, Mail, Save } from "lucide-react";
import { Switch } from "../ui/switch";
import { Toast } from "../ui/toast";

interface NotificationsSectionProps {
  onSave?: (data: {
    emailAlerts: boolean;
    inAppNotifications: boolean;
  }) => void;
}

export function NotificationsSection({ onSave }: NotificationsSectionProps) {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    inAppNotifications: true,
  });

  const saveNotificationPreferences = () => {
    if (onSave) {
      onSave(notifications);
    } else {
      Toast.success("Notification preferences saved!");
    }
  };

  return (
    <section className='mb-8 p-6 rounded-xl border  bg-background  border-border'>
      <div className='flex items-center mb-6'>
        <div className='p-2 rounded-full mr-3 bg-hover'>
          <Bell className='h-5 w-5' />
        </div>
        <h2 className='text-lg font-medium'>Notification Preferences</h2>
      </div>

      <div className='space-y-5'>
        {/* Email Notifications */}
        <div className='flex items-center justify-between py-3 px-4 rounded-lg bg-card '>
          <div className='flex items-center'>
            <Mail className='h-5 w-5 mr-3 opacity-70' />
            <div>
              <h3 className='text-sm font-medium'>Email Alerts</h3>
              <p className='text-xs opacity-70 mt-1'>
                Receive notifications via email
              </p>
            </div>
          </div>
          <Switch
            checked={notifications.emailAlerts}
            onClick={() =>
              setNotifications({
                ...notifications,
                emailAlerts: !notifications.emailAlerts,
              })
            }
          />
        </div>

        {/* In-App Notifications */}
        <div className='flex items-center justify-between py-3 px-4 rounded-lg bg-card  '>
          <div className='flex items-center'>
            <Bell className='h-5 w-5 mr-3 opacity-70' />
            <div>
              <h3 className='text-sm font-medium'>In-App Notifications</h3>
              <p className='text-xs opacity-70 mt-1'>
                Show notifications within the application
              </p>
            </div>
          </div>

          <Switch
            checked={notifications.inAppNotifications}
            onClick={() =>
              setNotifications({
                ...notifications,
                inAppNotifications: !notifications.inAppNotifications,
              })
            }
          />
        </div>

        <div className='pt-4'>
          <button
            onClick={saveNotificationPreferences}
            className='flex items-center px-5 py-2.5 rounded-lg font-medium transition-colors bg-text hover:bg-text/80 text-card'
          >
            <Save className='h-4 w-4 mr-2' />
            Save Preferences
          </button>
        </div>
      </div>
    </section>
  );
}
