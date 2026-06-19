export interface DevNotification {
  id: string;
  timestamp: string;
  eventType: string;
  author: string;
  details: string;
  emailSentTo: string;
  status: 'sent' | 'pending';
}

const STORAGE_KEY = 'uet_dev_notifications';

export const getDevNotifications = (): DevNotification[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    // Generate some starter mock notifications to populate the dev's dashboard elegantly
    const starter: DevNotification[] = [
      {
        id: 'dn-1',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        eventType: 'Course Handout Upload',
        author: 'Dr. Saad Malik (Teacher)',
        details: 'Uploaded "Lecture 5 Assembly registers and subroutines.pdf" for Software Engineering course.',
        emailSentTo: 'info.qasimusman.cse@gmail.com',
        status: 'sent'
      },
      {
        id: 'dn-2',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        eventType: 'Student Grievance / Feedback',
        author: 'Anonymous Student (Computer Systems)',
        details: 'Submitted curriculum feedback: "Suggesting more practical interfacing sessions for CS-304 Microprocessors."',
        emailSentTo: 'info.qasimusman.cse@gmail.com',
        status: 'sent'
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starter));
    return starter;
  }
  return JSON.parse(data);
};

export const clearDevNotifications = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const triggerDevNotification = (
  eventType: string,
  author: string,
  details: string,
  developerEmail: string = 'info.qasimusman.cse@gmail.com'
): DevNotification => {
  const newNotif: DevNotification = {
    id: `dn-${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    eventType,
    author,
    details,
    emailSentTo: developerEmail,
    status: 'sent'
  };

  const list = getDevNotifications();
  list.unshift(newNotif);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  // Dispatch a custom event so that components like a Toast Container can display this in real-time
  const event = new CustomEvent('uet_dev_alert', { detail: newNotif });
  window.dispatchEvent(event);

  return newNotif;
};
