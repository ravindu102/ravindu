export type Tab = 'timetable' | 'assignments' | 'notes' | 'gpa' | 'aiBuddy';

export interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  completed: boolean;
  reminderSet: boolean;
}

export interface TimeSlot {
  id: number;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  course: string;
  location: string;
  color: string;
}

export interface GpaEntry {
  id: number;
  course: string;
  credits: number;
  grade: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}