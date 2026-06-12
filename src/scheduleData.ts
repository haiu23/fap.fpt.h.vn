/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, TimetableItem, CourseFee, CourseGrade, Term } from './types';

// Let's define the 3 students matching the images and user profile
export const students: Student[] = [
  {
    id: 'HE204435',
    name: 'Lê Thị Quỳnh Như',
    email: 'nhultqhe204435@gmail.com',
    campus: 'FPTU-Hòa Lạc',
    major: 'Digital Arts & Design',
    curriculum: 'Multimedia Communications 2025',
    cohort: 'K20',
  },
];

// Define standard 16 weeks of Summer 2026 Semester
// Starts from 11/05 to 30/08
export const weeks = [
  { start: '11/05', end: '17/05' },
  { start: '18/05', end: '24/05' },
  { start: '25/05', end: '31/05' },
  { start: '01/06', end: '07/06' },
  { start: '08/06', end: '14/06' }, // Week index 4 - Current Week (includes June 11, 2026)
  { start: '15/06', end: '21/06' },
  { start: '22/06', end: '28/06' },
  { start: '29/06', end: '05/07' },
  { start: '06/07', end: '12/07' },
  { start: '13/07', end: '19/07' },
  { start: '20/07', end: '26/07' },
  { start: '27/07', end: '02/08' },
  { start: '03/08', end: '09/08' },
  { start: '10/08', end: '16/08' },
  { start: '17/08', end: '23/08' },
  { start: '24/08', end: '30/08' },
];

export const tuitionFees: { [email: string]: CourseFee[] } = {
  'phungvanba2007@gmail.com': [
    { subjectCode: 'PRN211', subjectName: 'Basic Cross-platform Application Programming with .NET', credits: 3, fee: 5520000, feeInternational: 5520000 },
    { subjectCode: 'SWT301', subjectName: 'Software Testing', credits: 3, fee: 5520000, feeInternational: 5520000 },
    { subjectCode: 'ITE302c', subjectName: 'IT Ethics', credits: 2, fee: 3680000, feeInternational: 3680000 },
    { subjectCode: 'SYA301', subjectName: 'System Analysis and Design', credits: 3, fee: 5520000, feeInternational: 5520000 },
  ],
  'pvba203@gmail.com': [
    { subjectCode: 'AIB301c', subjectName: 'AI for Business', credits: 3, fee: 5520000, feeInternational: 5520000 },
    { subjectCode: 'ADY201m', subjectName: 'Data Science with Python & SQL', credits: 3, fee: 5520000, feeInternational: 5520000 },
    { subjectCode: 'AFA201', subjectName: 'Human Anatomy for Artist', credits: 3, fee: 5520000, feeInternational: 5520000 },
    { subjectCode: 'MLN122', subjectName: 'Introduction to Ho Chi Minh Ideology', credits: 2, fee: 3680000, feeInternational: 3680000 },
  ],
  'nhultqhe204435@gmail.com': [
    { subjectCode: 'ADI201', subjectName: 'Brand Identity Design', credits: 3, fee: 5520000, feeInternational: 5520000 },
    { subjectCode: 'ADP301', subjectName: 'Packaging Design', credits: 3, fee: 5520000, feeInternational: 5520000 },
    { subjectCode: 'AET102', subjectName: 'Aesthetic 2', credits: 2, fee: 3680000, feeInternational: 3680000 },
    { subjectCode: 'ADS301', subjectName: 'Google Ads and SEO', credits: 3, fee: 5520000, feeInternational: 5520000 },
    { subjectCode: 'UXD201', subjectName: 'User Experience Design', credits: 3, fee: 5520000, feeInternational: 5520000 },
  ],
};

export const markReports: { [email: string]: CourseGrade[] } = {
  'phungvanba2007@gmail.com': [
    {
      subjectCode: 'PRN211',
      subjectName: 'Basic Cross-platform Application Programming with .NET',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Progress Test 1', weight: 0.1, grade: 8.5 },
        { name: 'Progress Test 2', weight: 0.1, grade: 9.0 },
        { name: 'Lab 1', weight: 0.15, grade: 7.5 },
        { name: 'Lab 2', weight: 0.15, grade: 8.0 },
        { name: 'Practical Exam', weight: 0.15, grade: 8.5 },
        { name: 'Final Written Exam', weight: 0.25, grade: null },
      ],
    },
    {
      subjectCode: 'SWT301',
      subjectName: 'Software Testing',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Quiz 1', weight: 0.1, grade: 9.2 },
        { name: 'Quiz 2', weight: 0.1, grade: 8.8 },
        { name: 'Assignment 1', weight: 0.2, grade: 8.0 },
        { name: 'Assignment 2', weight: 0.2, grade: 8.5 },
        { name: 'Final Presentation', weight: 0.3, grade: null },
      ],
    },
    {
      subjectCode: 'ITE302c',
      subjectName: 'IT Ethics',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Group Discussion', weight: 0.2, grade: 9.0 },
        { name: 'Case Study Report', weight: 0.3, grade: 8.8 },
        { name: 'Final Essay', weight: 0.4, grade: null },
      ],
    },
    {
      subjectCode: 'SYA301',
      subjectName: 'System Analysis and Design',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Quiz 1', weight: 0.15, grade: 8.0 },
        { name: 'Individual Assignment', weight: 0.2, grade: 7.5 },
        { name: 'Group Project Phase 1', weight: 0.25, grade: 8.2 },
        { name: 'Final Board Exam', weight: 0.3, grade: null },
      ],
    },
  ],
  'pvba203@gmail.com': [
    {
      subjectCode: 'AIB301c',
      subjectName: 'AI for Business',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Midterm Test', weight: 0.25, grade: 8.5 },
        { name: 'Lab 1', weight: 0.15, grade: 9.0 },
        { name: 'Lab 2', weight: 0.15, grade: 9.5 },
        { name: 'Final Project', weight: 0.35, grade: null },
      ],
    },
    {
      subjectCode: 'ADY201m',
      subjectName: 'Data Science with Python & SQL',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Assignment', weight: 0.3, grade: 8.8 },
        { name: 'Practical Exam', weight: 0.3, grade: 7.2 },
        { name: 'Final Exam', weight: 0.3, grade: null },
      ],
    },
    {
      subjectCode: 'AFA201',
      subjectName: 'Human Anatomy for Artist',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Sketchbook Check 1', weight: 0.2, grade: 9.0 },
        { name: 'Sketchbook Check 2', weight: 0.2, grade: 8.5 },
        { name: 'Anatomical Model Project', weight: 0.2, grade: 9.5 },
        { name: 'Final Showcase', weight: 0.3, grade: null },
      ],
    },
    {
      subjectCode: 'MLN122',
      subjectName: 'Introduction to Ho Chi Minh Ideology',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Presentation', weight: 0.3, grade: 8.0 },
        { name: 'Essays', weight: 0.3, grade: 8.5 },
        { name: 'Final MCQ Test', weight: 0.3, grade: null },
      ],
    },
  ],
  'nhultqhe204435@gmail.com': [
    {
      subjectCode: 'ADI201',
      subjectName: 'Brand Identity Design',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Brand Guidebook Progress', weight: 0.2, grade: 9.2 },
        { name: 'Logo Design Review', weight: 0.2, grade: 8.5 },
        { name: 'Presentation Pitch', weight: 0.2, grade: 9.0 },
        { name: 'Final Portfolio', weight: 0.3, grade: null },
      ],
    },
    {
      subjectCode: 'ADP301',
      subjectName: 'Packaging Design',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Box Prototype 3D', weight: 0.3, grade: 8.8 },
        { name: 'Label Graphics', weight: 0.3, grade: 9.0 },
        { name: 'Final Physical Printout', weight: 0.3, grade: null },
      ],
    },
    {
      subjectCode: 'AET102',
      subjectName: 'Aesthetic 2',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Theory Paper 1', weight: 0.2, grade: 8.5 },
        { name: 'Exhibition Critique', weight: 0.3, grade: 8.2 },
        { name: 'Final Analysis Paper', weight: 0.4, grade: null },
      ],
    },
    {
      subjectCode: 'ADS301',
      subjectName: 'Google Ads and SEO',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Keyword Research Lab', weight: 0.2, grade: 9.5 },
        { name: 'Ad Campaign Draft', weight: 0.2, grade: 8.0 },
        { name: 'SEO Compliance Report', weight: 0.2, grade: 8.8 },
        { name: 'Final Presentation Pitch', weight: 0.3, grade: null },
      ],
    },
    {
      subjectCode: 'UXD201',
      subjectName: 'User Experience Design',
      items: [
        { name: 'Attendance', weight: 0.1, grade: 10 },
        { name: 'Wireframing Lab', weight: 0.2, grade: 8.5 },
        { name: 'Hi-Fi Prototyping', weight: 0.2, grade: 9.0 },
        { name: 'Usability Testing Report', weight: 0.2, grade: 8.8 },
        { name: 'Final Presentation', weight: 0.3, grade: null },
      ],
    },
  ],
};

// Generate timetable items for a specific student for all 16 weeks
export const getStudentTimetable = (email: string): TimetableItem[] => {
  const items: TimetableItem[] = [];
  
  // Custom course definitions for schedules
  const details = {
    'phungvanba2007@gmail.com': [
      { code: 'PRN211', name: 'Basic Cross-platform Application Programming with .NET', classCode: 'SE1823-NJ', room: 'AL-302', teacher: 'ChiLP', days: [0, 2, 4], slot: 2 }, // Mon, Wed, Fri Slot 2 (09:15-10:45)
      { code: 'SWT301', name: 'Software Testing', classCode: 'SE1823-NJ', room: 'BE-204', teacher: 'DucNA', days: [0, 2, 4], slot: 4 }, // Mon, Wed, Fri Slot 4 (12:50-14:20)
      { code: 'SYA301', name: 'System Analysis and Design', classCode: 'SE1823-NJ', room: 'BE-102', teacher: 'HuyenTT', days: [1, 3], slot: 3 }, // Tue, Thu Slot 3 (11:00-12:30)
      { code: 'ITE302c', name: 'IT Ethics', classCode: 'SE1823-NJ', room: 'DE-401', teacher: 'MinhLQ', days: [1, 3], slot: 5 }, // Tue, Thu Slot 5 (14:30-16:00)
    ],
    'pvba203@gmail.com': [
      { code: 'AIB301c', name: 'AI for Business', classCode: 'AI1802', room: 'AL-204', teacher: 'SonNT', days: [0, 2, 4], slot: 1 }, // Mon, Wed, Fri Slot 1 (07:30-09:00)
      { code: 'ADY201m', name: 'Data Science with Python & SQL', classCode: 'AI1802', room: 'BE-405', teacher: 'QuangHN', days: [0, 2, 4], slot: 3 }, // Mon, Wed, Fri Slot 3 (11:00-12:30)
      { code: 'MLN122', name: 'Introduction to Ho Chi Minh Ideology', classCode: 'AI1802', room: 'GA-201', teacher: 'KhanhPT', days: [1, 3], slot: 2 }, // Tue, Thu Slot 2 (09:15-10:45)
      { code: 'AFA201', name: 'Human Anatomy for Artist', classCode: 'AI1802', room: 'DE-102', teacher: 'DiepTH', days: [1, 3], slot: 4 }, // Tue, Thu Slot 4 (12:50-14:20)
    ],
    'nhultqhe204435@gmail.com': [
      { code: 'ADI201', name: 'Brand Identity Design', classCode: 'GD1901', room: 'BE-301', teacher: 'DungNTA', days: [0, 2, 4], slot: 2 }, // Mon, Wed, Fri Slot 2 (09:15-10:45)
      { code: 'ADP301', name: 'Packaging Design', classCode: 'GD1901', room: 'DE-202', teacher: 'TrinhLM', days: [0, 2, 4], slot: 4 }, // Mon, Wed, Fri Slot 4 (12:50-14:20)
      { code: 'AET102', name: 'Aesthetic 2', classCode: 'GD1901', room: 'AL-405', teacher: 'HuyVT', days: [1, 3], slot: 1 }, // Tue, Thu Slot 1 (07:30-09:00)
      { code: 'ADS301', name: 'Google Ads and SEO', classCode: 'GD1901', room: 'GA-302', teacher: 'PhongTT', days: [1, 3], slot: 3 }, // Tue, Thu Slot 3 (11:00-12:30)
      { code: 'UXD201', name: 'User Experience Design', classCode: 'GD1901', room: 'DE-104', teacher: 'LinhDN', days: [1, 3], slot: 5 }, // Tue, Thu Slot 5 (14:30-16:00)
    ]
  };

  const studentCourses = details[email as keyof typeof details] || details['phungvanba2007@gmail.com'];

  // Current date boundary: June 12, 2026 is inside Week index 4 (08/06 to 14/06)
  // Day index for Friday is 4 (Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6)
  const currentWeekIndex = 4;
  const currentDayIndex = 4;

  for (let w = 0; w < 16; w++) {
    for (const c of studentCourses) {
      for (const day of c.days) {
        // Attendance determination logic: Only slots of June 12, 2026 (Week 4, day 4, slot <= 2) and earlier are completed/attended, the rest (slot > 2 or days after, or later weeks) are "future" (not studied yet/chưa học).
        let status: 'attended' | 'absent' | 'future' | 'no-data' = 'attended';

        if (w > currentWeekIndex) {
          status = 'future';
        } else if (w === currentWeekIndex) {
          if (day > 4) {
            status = 'future';
          } else if (day === 4) {
            if (c.slot > 2) {
              // Today (Friday June 12, 2026) has no slot 12:50 (Slot 4) or later afternoon classes scheduled.
              continue;
            } else {
              status = 'attended';
            }
          } else {
            status = 'attended';
          }
        } else {
          status = 'attended';
        }

        items.push({
          id: `${email}-${w}-${c.code}-${day}-${c.slot}`,
          subjectCode: c.code,
          subjectName: c.name,
          classCode: c.classCode,
          room: c.room,
          teacher: c.teacher,
          slot: c.slot,
          dayOfWeek: day,
          status,
          weekIndex: w,
        });
      }
    }
  }

  return items;
};

// Global terms
export const termsList: Term[] = [
  { name: 'Summer2026', department: 'Software Engineering' },
  { name: 'Spring2026', department: 'Data Science & BI' },
  { name: 'Fall2025', department: 'Information Tech' },
  { name: 'Summer2025', department: 'Chinese language' },
  { name: 'Spring2025', department: 'Multimedia Communications' },
  { name: 'Fall2024', department: 'Business Administration' },
  { name: 'Summer2024', department: 'Japanese language' },
  { name: 'Spring2024', department: 'English preparation' }
];
