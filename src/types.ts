/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string; // HE181234
  name: string; // Phùng Văn Bá
  email: string; // phungvanba2007@gmail.com
  campus: string; // FPTU-Hòa Lạc
  major: string; // Software Engineering
  curriculum: string; // Software Engineering 2024
  cohort: string; // k18
}

export interface TimetableItem {
  id: string;
  subjectCode: string; // e.g. PRN211
  subjectName: string; // e.g. Basic Cross-platform Application Programming with .NET
  classCode: string; // e.g. SE1823-NJ
  room: string; // e.g. AL-203
  teacher: string; // e.g. ChiLP
  slot: number; // 1 to 6 (or up to 12)
  dayOfWeek: number; // 0 for Mon, 1 for Tue, ..., 6 for Sun
  status: 'attended' | 'absent' | 'future' | 'no-data';
  weekIndex: number; // 0 to 15 representing the 16 weeks
}

export interface CourseFee {
  subjectCode: string;
  subjectName: string;
  credits: number;
  fee: number;
  feeInternational: number;
}

export interface CourseGrade {
  subjectCode: string;
  subjectName: string;
  items: {
    name: string;
    weight: number; // e.g., 10% -> 0.1
    grade: number | null; // e.g., 8.5
  }[];
}

export interface Term {
  name: string;
  department: string;
}

export interface FeedbackQuestion {
  id: string;
  question: string;
  rating: number; // 1 to 5
  comment?: string;
}
