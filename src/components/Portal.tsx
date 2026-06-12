/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Student, TimetableItem, CourseFee, CourseGrade } from '../types';
import { weeks, tuitionFees, markReports, getStudentTimetable, termsList, students } from '../scheduleData';
import { Calendar, CreditCard, Award, User, LogOut, CheckCircle, XCircle, AlertCircle, RefreshCw, BookOpen, FileText, ChevronRight, HelpCircle } from 'lucide-react';

interface PortalProps {
  student: Student;
  campus: string;
  onLogout: () => void;
}

export default function Portal({ student: initialStudent, campus, onLogout }: PortalProps) {
  // Support switching active student just for easier inspection of data sets
  const [activeStudent, setActiveStudent] = useState<Student>(initialStudent);
  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'tuition' | 'attendance' | 'marks' | 'profile' | 'help'>('home');
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(4); // Default to Week 5 (index 4) containing 08/06 To 14/06
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const [selectedMarkSubject, setSelectedMarkSubject] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState('Summer2026');
  const [timetable, setTimetable] = useState<TimetableItem[]>([]);
  const [selectedSlotDetails, setSelectedSlotDetails] = useState<TimetableItem | null>(null);
  const [activeMobileDay, setActiveMobileDay] = useState<number>(4); // Default to Friday (index 4)

  useEffect(() => {
    // Generate timetable customized for the current active student
    setTimetable(getStudentTimetable(activeStudent.email));
  }, [activeStudent]);

  // Set default subjects on load
  useEffect(() => {
    const fees = tuitionFees[activeStudent.email] || [];
    if (fees.length > 0) {
      setSelectedSubjectCode(fees[0].subjectCode);
      setSelectedMarkSubject(fees[0].subjectCode);
    }
  }, [activeStudent]);

  const activeFees = tuitionFees[activeStudent.email] || [];
  const activeGrades = markReports[activeStudent.email] || [];

  // Filter timetable for selected week
  const weekTimetable = timetable.filter(item => item.weekIndex === selectedWeekIndex);

  // Calculate day headers with precise dates based on monday of selected week
  const getWeekDates = (weekIdx: number) => {
    // Week 1 starts on 11/05/2026. Therefore:
    const mondayOfSemester = new Date(2026, 4, 11); // May 11, 2026
    const daysToAdd = weekIdx * 7;
    const weekMonday = new Date(mondayOfSemester);
    weekMonday.setDate(mondayOfSemester.getDate() + daysToAdd);

    const dates: string[] = [];
    const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekMonday);
      d.setDate(weekMonday.getDate() + i);
      const formattedDate = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2);
      dates.push(`${weekdays[i]}\n${formattedDate}`);
    }
    return dates;
  };

  const dayHeaders = getWeekDates(selectedWeekIndex);

  // Slots matching FPT Standard timetable layout
  const slotsList = [
    { id: 1, name: 'Slot 1', time: '07:30 - 09:00' },
    { id: 2, name: 'Slot 2', time: '09:15 - 10:45' },
    { id: 3, name: 'Slot 3', time: '11:00 - 12:30' },
    { id: 4, name: 'Slot 4', time: '12:50 - 14:20' },
    { id: 5, name: 'Slot 5', time: '14:30 - 16:00' },
    { id: 6, name: 'Slot 6', time: '16:10 - 17:40' },
  ];

  // Map to group schedule items by (slot, dayOfWeek)
  const getScheduleCell = (slotNum: number, dayIdx: number) => {
    return weekTimetable.find(item => item.slot === slotNum && item.dayOfWeek === dayIdx);
  };

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-[#333333] flex flex-col" id="portal-workspace">
      
      {/* Authentic FAP Header Bar */}
      <header className="bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo & Portal Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-[#f37021] text-white p-2.5 rounded font-extrabold text-xl tracking-wider">
              FPT
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-800 leading-none">FPT University</h2>
              <span className="text-xs text-slate-500 font-semibold tracking-wide uppercase">Academic Portal (FAP)</span>
            </div>
          </div>

          {/* Right Side Info, Mobile Badges, & User Account */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            {/* Download Badges replicated */}
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-1.5 text-[10px] text-gray-500">
              <span className="font-semibold block text-slate-600">myFAP App:</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded border border-gray-300">App Store</span>
              <span className="px-2 py-0.5 bg-gray-150 rounded border border-gray-300">Google Play</span>
              <span className="text-slate-350">|</span>
              <span className="font-bold text-orange-600">Hotline: (024)73081313</span>
            </div>

            {/* FPT Logged user badge */}
            <div className="bg-[#acffac] border border-[#76d376] px-3 py-1 rounded text-xs font-medium flex flex-wrap items-center gap-2 justify-center md:justify-between shadow-3xs" id="logged-user-badge">
              <span className="text-emerald-950 font-bold font-mono text-xs">{activeStudent.email}</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-950 font-semibold uppercase">{campus}</span>
              <span className="text-slate-400">|</span>
              <button 
                onClick={onLogout}
                className="text-red-700 hover:text-red-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3 h-3 inline" /> logout
              </button>
            </div>
          </div>
        </div>

        {/* FAP Secondary Navigation Bar */}
        <div className="w-full bg-[#f1f1f1] border-t border-b border-gray-200 sticky top-0 z-20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto scrollbar-none flex-nowrap items-center gap-1 text-xs md:flex-wrap">
            <button
              onClick={() => setActiveTab('home')}
              className={`py-2 px-4 font-semibold transition flex-shrink-0 ${activeTab === 'home' ? 'bg-white border-l border-r border-gray-300 text-orange-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Home (Trang chủ)
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-2 px-4 font-semibold transition flex-shrink-0 ${activeTab === 'schedule' ? 'bg-white border-l border-r border-gray-300 text-orange-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Weekly Timetable (Lịch học tuần)
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-2 px-4 font-semibold transition flex-shrink-0 ${activeTab === 'attendance' ? 'bg-white border-l border-r border-gray-300 text-orange-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Attendance Check (Điểm danh)
            </button>
            <button
              onClick={() => setActiveTab('marks')}
              className={`py-2 px-4 font-semibold transition flex-shrink-0 ${activeTab === 'marks' ? 'bg-white border-l border-r border-gray-300 text-orange-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Mark Report (Bảng điểm)
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-4 font-semibold transition flex-shrink-0 ${activeTab === 'profile' ? 'bg-white border-l border-r border-gray-300 text-orange-600' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              Profile (Hồ sơ)
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Layout Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6" id="portal-content-area">
        
        {/* TAB 1: HOME DASHBOARD */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in">
            {/* Welcome banner and quick information */}
            <div className="bg-white border border-gray-200 p-5 rounded shadow-2xs">
              <h2 className="text-lg font-bold text-gray-800">
                Kính chào sinh viên <span className="text-orange-600 font-extrabold">{activeStudent.name}</span> ({activeStudent.id})!
              </h2>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
                <p><strong>Khóa học / Cohort:</strong> {activeStudent.cohort}</p>
                <p><strong>Chuyên ngành đăng ký:</strong> {activeStudent.major}</p>
                <p><strong>Cơ sở hiện tại:</strong> {campus}</p>
              </div>
            </div>

            {/* Academic Portal Categorized Grid Menu */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column (Main functional groups) - Span 8 */}
              <div className="md:col-span-8 space-y-6">
                
                {/* Categorized Menu Options (Matching FAP exactly) */}
                <div className="bg-white border border-gray-200 rounded p-5 shadow-2xs">
                  <h3 className="text-sm font-bold text-white bg-[#e37d22] py-1.5 px-3 -mx-5 -mt-5 mb-4 rounded-t uppercase flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Academic Activities (Hoạt động học tập)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#333]">
                    
                    {/* Column A: Registration / Applications */}
                    <div>
                      <h4 className="font-bold text-gray-800 border-b border-gray-200 pb-1.5 mb-2 text-slate-800 flex items-center">
                        <FileText className="w-4 h-4 inline text-orange-500 mr-1.5" /> Registration/Application (Thủ tục/đơn từ)
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> Suspend one semester (Bảo lưu một học kỳ)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> Move out of class (Hủy/chuyển lớp học)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> Đăng ký học môn tại nước ngoài
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> Đăng ký học vượt kỳ (Over-credit registration)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> Đăng ký học phụ đạo / học lại môn hỏng
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-red-600 font-semibold">
                            <span className="text-gray-400">▪</span> Đăng ký bảo hiểm y tế bắt buộc <span className="text-[9px] bg-red-100 text-red-600 px-1 rounded animate-pulse">NEW</span>
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Column B: Information Access */}
                    <div>
                      <h4 className="font-bold text-gray-800 border-b border-gray-200 pb-1.5 mb-2 text-slate-800 flex items-center">
                        <Calendar className="w-4 h-4 inline text-orange-500 mr-1.5" /> Information Access (Tra cứu thông tin)
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        <li>
                          <button onClick={() => setActiveTab('schedule')} className="text-left text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                            <span className="text-orange-500 font-bold">▪</span> Weekly timetable (Thời khóa biểu từng tuần)
                          </button>
                        </li>
                        <li>
                          <button onClick={() => setActiveTab('attendance')} className="text-left text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                            <span className="text-orange-500 font-bold">▪</span> Attendance report (Báo cáo chuyên cần)
                          </button>
                        </li>
                        <li>
                          <button onClick={() => setActiveTab('marks')} className="text-left text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                            <span className="text-orange-500 font-bold">▪</span> Mark Report (Xem báo cáo điểm số)
                          </button>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> View exam schedule (Xem lịch thi học kỳ)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> View Course Syllabuses (Xem đề cương chi tiết)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-[#33c]">
                            <span className="text-gray-400">▪</span> EduNext Student guidance system <span className="text-[9px] bg-red-100 text-red-600 px-1 rounded">NEW</span>
                          </a>
                        </li>
                      </ul>
                    </div>

                  </div>

                  {/* Secondary grid row (Reports, Others, Regulations) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#333] mt-6 border-t border-gray-100 pt-4">
                    {/* Feedbacks & Feedback report */}
                    <div>
                      <h4 className="font-bold text-gray-800 border-b border-gray-200 pb-1.5 mb-2 text-slate-800">
                        💬 Feedbacks (Ý kiến phản hồi)
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> Feedback about teaching (Phản hồi về chất lượng giảng dạy)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> Student Profile | Update details for parents
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Regulations */}
                    <div>
                      <h4 className="font-bold text-gray-800 border-b border-gray-200 pb-1.5 mb-2 text-slate-800">
                        ⚖️ Regulations (Các quy định)
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> General Academic Regulations ...
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> Dormitory regulations (Ký túc xá Hòa Lạc)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                            <span className="text-gray-400">▪</span> Dormitory regulations (Ký túc xá Cần Thơ)
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Important notice section mimicking image 6 */}
                <div className="bg-white border border-gray-200 rounded p-1 shadow-2xs overflow-x-auto">
                  <div className="bg-[#5cb85c] text-white py-1.5 px-3 rounded-t text-xs font-bold uppercase">
                    📢 IMPORTANT NOTICE (Thông báo thời hạn quan trọng)
                  </div>
                  
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#4f81bd] text-white border-b border-gray-300">
                        <th className="p-2 border border-gray-300 font-bold w-1/2">Type of procedure | Loại thủ tục</th>
                        <th className="p-2 border border-gray-300 font-bold">Deadline | Hạn nộp Đơn</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                      <tr>
                        <td className="p-2 border border-gray-200">1. Changing major (Chuyển ngành học)</td>
                        <td className="p-2 border border-gray-200 font-semibold text-blue-700">5 weeks before the new semester starts</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-2 border border-gray-200">2. Changing campus (Chuyển cơ sở đào tạo)</td>
                        <td className="p-2 border border-gray-200">Before completion of current phase</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-gray-200">3. Rejoin (Nhập học trở lại sau bảo lưu)</td>
                        <td className="p-2 border border-gray-200 font-semibold text-blue-700">10 days before the new semester</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-2 border border-gray-200">4. Suspend one semester (Bảo lưu học kỳ)</td>
                        <td className="p-2 border border-gray-200">1 week before the new semester starts</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-gray-200">5. Pay specialized tuition (Nộp học phí chuyên ngành)</td>
                        <td className="p-2 border border-gray-200 font-semibold text-red-600">5 working days before the new semester starts</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Right Column (Side news / QR / Support info) - Span 4 */}
              <div className="md:col-span-4 space-y-6">
                
                {/* QR and Mobile download replica */}
                <div className="bg-white border border-gray-200 rounded p-5 shadow-2xs text-center space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-100 pb-2">
                    Lấy ứng dụng di động myFAP
                  </h4>
                  <div className="flex justify-center bg-slate-50 p-3 rounded border border-gray-100">
                    {/* Simulated QR Code */}
                    <div className="w-32 h-32 bg-white p-2 border border-gray-300 flex flex-col justify-between items-center relative">
                      <div className="grid grid-cols-4 gap-1 w-full h-full opacity-80">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-2xs ${((i * 7 + 13) % 5 === 0 || (i * 3) % 4 === 0) ? 'bg-gray-800' : 'bg-transparent'}`} 
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white text-orange-600 font-bold px-1 rounded text-[10px] border border-orange-500 shadow-sm">myFAP</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2">
                    Quét mã QR để tải ứng dụng trên thiết bị di động iOS hoặc Android để cập nhật lịch học nhanh chóng.
                  </p>
                </div>

                {/* News & Notices block */}
                <div className="bg-white border border-gray-200 rounded shadow-2xs p-4">
                  <div className="text-xs font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3 flex items-center justify-between">
                    <span>📰 NEWS & STUDENT NOTICES</span>
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-mono">STU_NOTIFY</span>
                  </div>
                  <div className="space-y-4 text-xs">
                    <div className="group cursor-pointer">
                      <h5 className="font-bold text-blue-700 group-hover:underline">Thực hiện đăng ký học phụ đạo và trả nợ môn Học kỳ Summer 2026</h5>
                      <span className="text-[10px] text-gray-400 block mt-0.5">June 10, 2026</span>
                    </div>
                    <div className="group cursor-pointer">
                      <h5 className="font-bold text-blue-700 group-hover:underline">Thông báo về việc thay đổi phòng học tòa nhà Delta cho các ca lý thuyết</h5>
                      <span className="text-[10px] text-gray-400 block mt-0.5">June 08, 2026</span>
                    </div>
                    <div className="group cursor-pointer">
                      <h5 className="font-bold text-blue-700 group-hover:underline">Hướng dẫn thủ tục đăng ký thực tập kỳ OJT (On the job training) khối ngành Kĩ thuật</h5>
                      <span className="text-[10px] text-gray-400 block mt-0.5">May 29, 2026</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 2: WEEKLY TIMETABLE */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-fade-in" id="student-schedule-view">
            
            {/* Page main title */}
            <div className="bg-white border-l-4 border-orange-500 p-4 rounded shadow-3xs">
              <h2 className="text-xl font-bold text-gray-800">
                Activities for {activeStudent.id} ({activeStudent.name})
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Note: These activities do not include extra-curriculum activities, such as club activities or general meetings.
              </p>
            </div>

            {/* Instruction legend matching FPT block from Screen 4 */}
            <div className="bg-orange-50 border border-orange-200 p-4 rounded text-xs text-orange-950 leading-relaxed space-y-1 shadow-2xs">
              <p className="font-bold">💡 Chú thích vị trí phòng học / Building Code Explanations:</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-orange-900">
                <li>Các phòng học bắt đầu bằng <strong className="text-orange-950 leading-none">AL</strong> thuộc tòa nhà <strong className="text-orange-900 leading-none">Alpha</strong>. (VD: AL-203, AL-405,...)</li>
                <li>Các phòng học bắt đầu bằng <strong className="text-orange-950 leading-none">BE</strong> thuộc tòa nhà <strong className="text-orange-900 leading-none">Beta</strong>. (VD: BE-302, BE-104,...)</li>
                <li>Các phòng học bắt đầu bằng <strong className="text-orange-950 leading-none">GA</strong> thuộc tòa nhà <strong className="text-orange-900 leading-none">Gamma</strong>. (VD: GA-302)</li>
                <li>Các phòng tập bắt đầu hàng <strong className="text-orange-950 leading-none">R</strong> thuộc khu vực sân tập Vovinam.</li>
                <li>Các phòng học bắt đầu bằng <strong className="text-orange-950 leading-none">DE</strong> thuộc tòa nhà <strong className="text-orange-900 leading-none">Delta</strong>. VD: DE-202, DE-102.</li>
                <li><strong className="text-orange-950 leading-none">Little UK (LUK)</strong> thuộc tầng 5 tòa nhà Delta.</li>
                <li>Nhà võ số 1 (ký hiệu <strong>VOV1</strong>) nằm cuối tòa nhà Alpha, nhà võ số 2 (ký hiệu <strong>VOV2</strong>) cạnh cổng trường.</li>
              </ul>
            </div>

            {/* Selector toolbar (Year & Week Selection) */}
            <div className="bg-white p-4 border border-gray-200 rounded shadow-3xs flex flex-wrap items-center gap-4">
              {/* Year Select */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-gray-600 uppercase">Year:</span>
                <select 
                  defaultValue="2026" 
                  disabled
                  className="text-xs font-bold border border-gray-300 rounded px-2.5 py-1.5 bg-gray-150 text-gray-500 cursor-not-allowed"
                >
                  <option value="2026">2026</option>
                </select>
              </div>

              {/* Week Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-gray-600 uppercase">Semester Week:</span>
                <select
                  value={selectedWeekIndex}
                  onChange={(e) => setSelectedWeekIndex(parseInt(e.target.value))}
                  className="text-xs font-bold border border-orange-500 rounded px-2.5 py-1.5 bg-white text-orange-700 cursor-pointer focus:ring-1 focus:ring-orange-500"
                >
                  {weeks.map((w, index) => (
                    <option key={index} value={index}>
                      Week {index + 1}: {w.start} To {w.end} {index === 4 ? '(Current)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-sky-800 bg-sky-50 border border-sky-100 rounded px-3 py-1 ml-auto font-medium">
                📅 Học kỳ: <strong className="text-sky-950">Summer 2026</strong> (Kỳ 2 Năm 2: 11/05/2026 - 30/08/2026)
              </div>
            </div>

            {/* Desktop View: Timetable main grid panel */}
            <div className="hidden md:block bg-white border border-gray-300 shadow-sm rounded overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-xs">
                <thead>
                  {/* Row of Days of Week */}
                  <tr className="bg-[#5a87d0] border-b border-gray-300">
                    <th className="p-3 border border-gray-300 font-extrabold text-white text-center w-[12%] bg-slate-800">
                      YEAR 2026 / WEEK
                    </th>
                    {dayHeaders.map((dayLabel, index) => (
                      <th 
                        key={index} 
                        className={`p-3 border border-gray-300 font-extrabold text-white text-center w-[12.5%] whitespace-pre-line ${
                          selectedWeekIndex === 4 && index === 4 ? 'bg-orange-600 font-extrabold' : 'bg-[#4f81bd]'
                        }`}
                      >
                        {dayLabel}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {slotsList.map((slot) => (
                    <tr key={slot.id} className="hover:bg-slate-50 min-h-[90px]">
                      {/* Slot info cell */}
                      <td className="p-3 border border-gray-300 font-bold bg-[#f1f1f1] text-gray-700 text-center flex-col justify-center min-h-[90px]">
                        <div className="text-xs text-[#d9534f]">{slot.name}</div>
                        <div className="text-[10px] text-gray-500 font-normal font-mono whitespace-nowrap mt-1">{slot.time}</div>
                      </td>

                      {/* 7 Days columns mapping */}
                      {Array.from({ length: 7 }).map((_, dayIdx) => {
                        const cellItem = getScheduleCell(slot.id, dayIdx);
                        
                        return (
                          <td 
                            key={dayIdx} 
                            className={`border border-gray-300 p-2.5 text-center transition min-w-[100px] align-top relative ${
                              cellItem ? 'bg-orange-50/50 hover:bg-orange-100/75 cursor-pointer' : 'bg-transparent'
                            }`}
                            onClick={() => cellItem && setSelectedSlotDetails(cellItem)}
                          >
                            {cellItem ? (
                              <div className="space-y-1 align-top h-full flex flex-col justify-between">
                                {/* Subject Code */}
                                <div className="font-extrabold text-blue-700 text-xs tracking-wide">
                                  {cellItem.subjectCode}
                                </div>
                                {/* Classroom badge */}
                                <div className="text-[11px] text-orange-850 font-bold">
                                  at {cellItem.room}
                                </div>
                                {/* Teacher Name */}
                                <div className="text-[10px] text-slate-500 font-bold font-mono">
                                  ({cellItem.teacher})
                                </div>
                                {/* Attendance log indicator */}
                                <div className="mt-1.5">
                                  {cellItem.status === 'attended' && (
                                    <span className="inline-flex items-center text-[10px] font-bold text-green-700 gap-0.5 bg-green-50 px-1 py-0.5 rounded border border-green-200">
                                      <CheckCircle className="w-2.5 h-2.5" /> (attended)
                                    </span>
                                  )}
                                  {cellItem.status === 'absent' && (
                                    <span className="inline-flex items-center text-[10px] font-bold text-red-700 gap-0.5 bg-red-50 px-1 py-0.5 rounded border border-red-200">
                                      <XCircle className="w-2.5 h-2.5" /> (absent)
                                    </span>
                                  )}
                                  {cellItem.status === 'future' && (
                                    <span className="text-[11px] text-slate-400 font-mono">
                                      (-)
                                    </span>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-300 text-[10px] select-none font-mono">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View: High fidelity day-by-day vertical interactive timeline */}
            <div className="block md:hidden space-y-4 font-sans">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest text-center mt-1">
                Chọn ngày học trong tuần / Select Weekday:
              </span>
              
              {/* Horizontal Day Selector */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-between w-full">
                {dayHeaders.map((dayLabel, index) => {
                  const [dayName, dayDate] = dayLabel.split('\n');
                  const isSelected = activeMobileDay === index;
                  const isTodayIndex = selectedWeekIndex === 4 && index === 4;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveMobileDay(index)}
                      className={`flex-1 min-w-[48px] py-2 px-1 rounded-lg flex flex-col items-center justify-between text-center border transition relative cursor-pointer ${
                        isSelected
                          ? 'bg-[#e37d22] text-white border-[#c96a18] shadow-xs scale-102 font-bold'
                          : isTodayIndex
                          ? 'bg-orange-50 text-[#e37d22] border-[#f37021]/30 font-bold'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-[9px] font-extrabold uppercase ${isSelected ? 'text-orange-100' : 'text-gray-400'}`}>
                        {dayName}
                      </span>
                      <span className="text-xs font-extrabold font-mono mt-1">
                        {dayDate}
                      </span>
                      {isTodayIndex && !isSelected && (
                        <span className="absolute -top-1 -right-0.5 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-duration-1000"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f37021]"></span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Day info feedback label */}
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 text-center flex items-center justify-between shadow-xs">
                <span className="text-xs font-extrabold text-orange-950 flex items-center gap-1.5">
                  📅 {dayHeaders[activeMobileDay].replace('\n', ' - ')}
                </span>
                {selectedWeekIndex === 4 && activeMobileDay === 4 && (
                  <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2.5 py-0.5 rounded shadow-3xs animate-pulse">
                    HÔM NAY - ĐÃ HOÀN THÀNH HỌC SÁNG (7h30 TO 10h40)
                  </span>
                )}
              </div>

              {/* Vertical feed of classes */}
              <div className="space-y-3">
                {(() => {
                  const dayClasses = slotsList.map(slot => {
                    const cItem = getScheduleCell(slot.id, activeMobileDay);
                    return { slot, item: cItem };
                  });

                  const hasClasses = dayClasses.some(dc => dc.item !== undefined);

                  if (!hasClasses) {
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-3xs">
                        <div className="text-4xl text-center">🎉</div>
                        <h4 className="text-sm font-extrabold text-[#333333] mt-2">Hôm nay bạn được nghỉ!</h4>
                        <p className="text-xs text-gray-550 mt-1">Không có ca học nào được xếp lịch cho ngày này.</p>
                      </div>
                    );
                  }

                  return dayClasses.map(({ slot, item }) => {
                    if (!item) return null;

                    return (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlotDetails(item)}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-3xs hover:border-orange-500 transition active:scale-[0.99] cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden"
                      >
                        {/* Status overlays */}
                        {item.status === 'attended' && (
                          <div className="absolute top-0 right-0 bg-[#5cb85c] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-bl">
                            attended
                          </div>
                        )}
                        {item.status === 'absent' && (
                          <div className="absolute top-0 right-0 bg-[#d9534f] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-bl animate-pulse">
                            absent
                          </div>
                        )}
                        {item.status === 'future' && (
                          <div className="absolute top-0 right-0 bg-gray-400 text-white text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-bl">
                            future
                          </div>
                        )}

                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-red-650 bg-red-50 border border-red-200/50 px-1.5 py-0.5 rounded">
                              {slot.name}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500 font-semibold">
                              ({slot.time})
                            </span>
                          </div>
                          <h4 className="text-sm font-extrabold text-blue-700 mt-2">
                            {item.subjectCode}
                          </h4>
                          <h5 className="text-xs font-bold text-slate-700 leading-tight">
                            {item.subjectName}
                          </h5>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2.5 rounded border border-gray-150 text-slate-600 mt-0.5">
                          <div>
                            <span className="text-slate-400 block font-bold text-[8px] uppercase">Phòng học</span>
                            <strong className="text-orange-950 font-extrabold font-mono text-xs">{item.room}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold text-[8px] uppercase">Giảng viên</span>
                            <strong className="text-slate-800 font-sans font-bold">{item.teacher}</strong>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-1 border-t border-gray-100 pt-2 text-[10px]">
                          <span className="text-orange-650 font-bold">
                            👁 Chi tiết & Google Meet Link
                          </span>
                          <span className="text-slate-400 font-mono font-bold">
                            Lớp: {item.classCode}
                          </span>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Note legend under schedule */}
            <div className="bg-white p-4 border border-gray-200 rounded text-xs text-gray-600 shadow-3xs">
              <strong className="block text-gray-850 border-b border-gray-100 pb-1 mb-2">More Note / Chú thích thêm:</strong>
              <div className="space-y-1">
                <p>💡 Click vào bất kỳ ca học nào trên lịch để xem chi tiết buổi học, giảng viên và tiến độ chuyên cần.</p>
                <p>🔴 <span className="text-red-700 font-bold">(absent)</span>: Sinh viên vắng mặt không phép ca học này.</p>
                <p>🟢 <span className="text-green-700 font-bold">(attended)</span>: Sinh viên đã tham gia chuyên cần đầy đủ ca học này.</p>
                <p>⚫ <span className="text-gray-500 font-bold">(-)</span>: Chưa đến ca học hoặc chưa cập nhật dữ liệu điểm danh.</p>
              </div>
            </div>
          </div>
        )}



        {/* TAB 4: ATTENDANCE MONITOR */}
        {activeTab === 'attendance' && (
          <div className="space-y-6 animate-fade-in" id="attendance-report">
            <div className="bg-white border-l-4 border-emerald-500 p-4 rounded shadow-3xs">
              <h2 className="text-xl font-bold text-gray-800">
                Attendance Report (Báo cáo điểm danh chuyên cần)
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Kiểm tra chi tiết số buổi học đã tham gia và tiến độ vắng mặt.
              </p>
            </div>

            {/* Subject tab navigator */}
            <div className="flex flex-wrap gap-2">
              {activeFees.map((fee) => (
                <button
                  key={fee.subjectCode}
                  onClick={() => setSelectedSubjectCode(fee.subjectCode)}
                  className={`px-4 py-2 font-bold text-xs rounded border cursor-pointer transition ${
                    selectedSubjectCode === fee.subjectCode
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-slate-50'
                  }`}
                >
                  {fee.subjectCode}
                </button>
              ))}
            </div>

            {(() => {
              // Get details for currently selected subject
              const subjectSessions = timetable.filter(item => item.subjectCode === selectedSubjectCode);
              const totalSessions = subjectSessions.length;
              const attendedSessions = subjectSessions.filter(item => item.status === 'attended').length;
              const absentSessions = subjectSessions.filter(item => item.status === 'absent').length;
              const completedSessions = attendedSessions + absentSessions;
              const futureSessions = totalSessions - completedSessions;

              // Absolute FPT limit: 20%
              const maxAbsencesAllowed = Math.floor(totalSessions * 0.2);
              const absencePercentage = completedSessions > 0 ? (absentSessions / totalSessions) * 100 : 0;
              const isBannedWarning = absentSessions > maxAbsencesAllowed;

              return (
                <div className="space-y-6">
                  {/* Numerical Summary Indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 border border-gray-200 shadow-3xs rounded text-center">
                      <span className="text-slate-500 text-[11px] uppercase font-bold tracking-wide">Tổng số ca học</span>
                      <div className="text-2xl font-black text-gray-800 mt-1 font-mono">{totalSessions} ca</div>
                    </div>
                    <div className="bg-white p-4 border border-gray-200 shadow-3xs rounded text-center">
                      <span className="text-emerald-600 text-[11px] uppercase font-bold tracking-wide">Đã tham gia (attended)</span>
                      <div className="text-2xl font-black text-emerald-600 mt-1 font-mono">{attendedSessions} ca</div>
                    </div>
                    <div className="bg-white p-4 border border-gray-200 shadow-3xs rounded text-center">
                      <span className="text-red-600 text-[11px] uppercase font-bold tracking-wide">Vắng học (absent)</span>
                      <div className="text-2xl font-black text-red-600 mt-1 font-mono">{absentSessions} ca</div>
                    </div>
                    <div className="bg-white p-4 border border-gray-200 shadow-3xs rounded text-center">
                      <span className="text-blue-600 text-[11px] uppercase font-bold tracking-wide">Tỷ lệ vắng mặt / Limit (20%)</span>
                      <div className={`text-2xl font-black mt-1 font-mono ${isBannedWarning ? 'text-red-700' : 'text-blue-700'}`}>
                        {absencePercentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Attendance Risk Alert */}
                  {absentSessions > 0 && (
                    <div className={`p-4 border rounded text-xs leading-relaxed flex items-center gap-3 shadow-3xs ${
                      isBannedWarning 
                        ? 'bg-red-50 border-red-300 text-red-950' 
                        : 'bg-amber-50 border-amber-300 text-amber-950'
                    }`}>
                      <AlertCircle className={`w-5 h-5 flex-shrink-0 ${isBannedWarning ? 'text-red-700' : 'text-amber-700'}`} />
                      <div>
                        {isBannedWarning ? (
                          <p>
                            ⚠️ <strong>CẢNH BÁO CẤM THI:</strong> Bạn đã vắng <strong>{absentSessions}/{totalSessions} ca học</strong> vượt mức quy định 20% ({maxAbsencesAllowed} ca). Bạn sẽ bị <strong>Cấm thi (Banned)</strong> môn <strong>{selectedSubjectCode}</strong> trừ khi có minh chứng y tế được phê duyệt bởi Phòng dịch vụ sinh viên!
                          </p>
                        ) : (
                          <p>
                            ℹ️ Bạn đã vắng <strong>{absentSessions}/{totalSessions} ca học</strong>. Bạn còn có thể vắng tối đa <strong>{maxAbsencesAllowed - absentSessions} ca học nữa</strong> trước khi đạt ngưỡng cấm thi 20%. Hãy tham gia đầy đủ!
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Table lists of all sessions */}
                  <div className="bg-white border border-gray-300 rounded shadow-2xs overflow-hidden">
                    <div className="bg-slate-800 text-white font-bold p-3 text-xs uppercase">
                      Lịch sử điểm danh chi tiết từng buổi học - {selectedSubjectCode}
                    </div>
                    
                    <div className="max-h-[500px] overflow-y-auto overflow-x-auto">
                      <table className="w-full min-w-[650px] text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#4f81bd] text-white sticky top-0">
                            <th className="p-3 border border-gray-300 font-extrabold text-center w-12">No.</th>
                            <th className="p-3 border border-gray-300 font-extrabold text-center w-24">Date</th>
                            <th className="p-3 border border-gray-300 font-extrabold text-center w-20">Slot</th>
                            <th className="p-3 border border-gray-300 font-extrabold">Room (Phòng)</th>
                            <th className="p-3 border border-gray-300 font-extrabold font-mono text-center">Teacher</th>
                            <th className="p-3 border border-gray-300 font-extrabold text-center w-40">Status (Cổ sinh viên)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {subjectSessions.map((sess, idx) => {
                            // Calculate specific date based on week index and dayOfWeek
                            const mondayOfSemester = new Date(2026, 4, 11); // May 11, 2026
                            const itemDate = new Date(mondayOfSemester);
                            itemDate.setDate(mondayOfSemester.getDate() + (sess.weekIndex * 7) + sess.dayOfWeek);
                            const dateLabel = ('0' + itemDate.getDate()).slice(-2) + '/' + ('0' + (itemDate.getMonth() + 1)).slice(-2) + '/2026';

                            return (
                              <tr 
                                key={sess.id} 
                                className={`hover:bg-slate-50 ${
                                  sess.status === 'absent' ? 'bg-red-50/10' : sess.status === 'attended' ? 'bg-green-50/5' : ''
                                }`}
                              >
                                <td className="p-3 border border-gray-200 text-center font-mono text-gray-500 font-semibold">{idx + 1}</td>
                                <td className="p-3 border border-gray-200 text-center font-mono font-bold text-gray-700">{dateLabel}</td>
                                <td className="p-3 border border-gray-200 text-center font-bold text-[#d9534f]">Slot {sess.slot}</td>
                                <td className="p-3 border border-gray-200 font-semibold">{sess.room}</td>
                                <td className="p-3 border border-gray-200 font-mono text-center text-slate-500">{sess.teacher}</td>
                                <td className="p-3 border border-gray-200 text-center">
                                  {sess.status === 'attended' && (
                                    <span className="inline-block bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded text-[10px]">
                                      ✔ attended
                                    </span>
                                  )}
                                  {sess.status === 'absent' && (
                                    <span className="inline-block bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse">
                                      ❌ absent
                                    </span>
                                  )}
                                  {sess.status === 'future' && (
                                    <span className="text-gray-400 font-mono text-[10px] italic">
                                      -- Future --
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 5: STUDENT MARKS REPORT */}
        {activeTab === 'marks' && (
          <div className="space-y-6 animate-fade-in" id="mark-records-report">
            <div className="bg-white border-l-4 border-yellow-500 p-4 rounded shadow-3xs">
              <h2 className="text-xl font-bold text-gray-800">
                Course Mark Report (Bảng điểm tổng hợp học kỳ)
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Tra cứu kết quả học tập lý thuyết, bài thực hành Lab, điểm thi thực hành và thi viết cuối khóa.
              </p>
            </div>

            {/* Term and Course filter selector */}
            <div className="bg-white p-4 border border-gray-200 rounded shadow-3xs flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-gray-600 uppercase">Select Term:</span>
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="text-xs font-bold border border-gray-300 rounded px-2.5 py-1.5 focus:outline-hidden cursor-pointer"
                >
                  <option value="Summer2026">Summer2026 (Active/Đang học)</option>
                  <option value="Spring2026">Spring2026 (Completed)</option>
                  <option value="Fall2025">Fall2025 (Completed)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-gray-600 uppercase">Registered Course:</span>
                <select
                  value={selectedMarkSubject}
                  onChange={(e) => setSelectedMarkSubject(e.target.value)}
                  className="text-xs font-bold border border-gray-300 rounded px-2.5 py-1.5 focus:outline-hidden cursor-pointer"
                >
                  {activeFees.map(f => (
                    <option key={f.subjectCode} value={f.subjectCode}>{f.subjectCode} - {f.subjectName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grade Sheet rendering */}
            {(() => {
              const currentSubjectGrade = activeGrades.find(g => g.subjectCode === selectedMarkSubject);
              if (!currentSubjectGrade) return <p className="text-xs text-gray-500">No grade report found for this subject.</p>;

              // Calculate active average dynamically (excluding final exams which are null)
              let totalEvaluatedWeight = 0;
              let accumulatedGradeValue = 0;
              currentSubjectGrade.items.forEach(it => {
                if (it.grade !== null) {
                  totalEvaluatedWeight += it.weight;
                  accumulatedGradeValue += it.grade * it.weight;
                }
              });

              const currentAverage = totalEvaluatedWeight > 0 ? (accumulatedGradeValue / totalEvaluatedWeight) : 0;
              const hasFinalExam = currentSubjectGrade.items.some(it => it.name.toLowerCase().includes('final') && it.grade !== null);

              return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left scale: Mark Sheet details - Span 8 */}
                  <div className="md:col-span-8 bg-white border border-gray-300 rounded shadow-2xs overflow-hidden">
                    <div className="bg-[#4f81bd] text-white p-3 font-bold text-xs uppercase flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span>BẢNG ĐIỂM CHI TIẾT MÔN - {selectedMarkSubject} ({currentSubjectGrade.subjectName})</span>
                      <span className="text-[10px] bg-sky-900 border border-sky-400 text-white px-2 py-0.5 rounded">Summer 2026</span>
                    </div>

                    <div className="overflow-x-auto w-full">
                      <table className="w-full min-w-[550px] text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-gray-300 text-gray-700 font-bold">
                          <th className="p-3 border border-gray-200">Assessment Item (Hạng mục thành phần)</th>
                          <th className="p-3 border border-gray-200 text-center w-24">Weight (Trọng số)</th>
                          <th className="p-3 border border-gray-200 text-center w-24">Mark (Điểm số /10)</th>
                          <th className="p-3 border border-gray-200 text-center w-28">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-700 font-medium">
                        {currentSubjectGrade.items.map((item, idx) => (
                          <tr key={idx} className={item.grade === null ? 'bg-amber-50/20 italic' : ''}>
                            <td className="p-3 border border-gray-200 font-semibold">{item.name}</td>
                            <td className="p-3 border border-gray-200 text-center font-mono font-bold">{(item.weight * 100).toFixed(0)}%</td>
                            <td className={`p-3 border border-gray-200 text-center font-mono text-sm font-black`}>
                              {item.grade !== null ? (
                                <span className={item.grade >= 5 ? 'text-gray-900' : 'text-red-600'}>
                                  {item.grade.toFixed(1)}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs italic font-normal">-- pending --</span>
                              )}
                            </td>
                            <td className="p-3 border border-gray-200 text-center">
                              {item.grade !== null ? (
                                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                                  item.grade >= 5.0 ? 'bg-green-150 text-green-800' : 'bg-red-150 text-red-800'
                                }`}>
                                  {item.grade >= 5.0 ? 'Passed' : 'At Risk'}
                                </span>
                              ) : (
                                <span className="text-amber-700 text-[10px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">Ca thi dự kiến cuối khóa</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>

                  {/* Right scale: Overview Status - Span 4 */}
                  <div className="md:col-span-4 space-y-6">
                    {/* Status metrics card */}
                    <div className="bg-white border border-gray-200 rounded shadow-2xs p-5 space-y-4">
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-100 pb-2">
                        Đánh giá sơ bộ / Current Summary
                      </h4>
                      
                      <div className="text-center py-4 bg-slate-50 border border-gray-150 rounded">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Điểm trung bình hiện tại</span>
                        <div className="text-4xl font-extrabold text-blue-700 font-mono mt-1">
                          {currentAverage.toFixed(2)}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">
                          (Tính theo các đầu điểm có sẵn tỉ lệ { (totalEvaluatedWeight * 100).toFixed(0) }%)
                        </p>
                      </div>

                      <div className="text-xs space-y-2.5">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Tiến trình đạt được:</span>
                          <span className="font-bold font-mono text-gray-800">{(totalEvaluatedWeight * 100).toFixed(0)}% học phần</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Điều kiện đỗ (Passing Criteria):</span>
                          <span className="font-bold text-orange-650">Phải đạt ≥ 5.0 trung bình & không có đầu điểm nào bằng 0!</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-2.5">
                          <span className="text-slate-500 font-bold">Trạng thái môn học:</span>
                          {hasFinalExam ? (
                            <span className="bg-green-100 text-green-800 font-extrabold text-[10px] px-2 py-1 rounded">
                              COMPLETED
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-800 font-extrabold text-[10px] px-2 py-1 rounded tracking-wide">
                              IN CLASS STUDYING
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Standard FPT passing guidelines */}
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded text-xs text-amber-950 leading-relaxed">
                      <strong>⚠️ Lưu ý quy chế học vụ FPT Academic:</strong>
                      <p className="mt-1">
                        Sinh viên chỉ được phép tham dự kỳ thi cuối khóa (Final written / oral exam) của môn học nếu tổng số ca nghỉ vắng không quá 20% tổng số ca học của môn đó.
                      </p>
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 6: STUDENT INFORMATION PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fade-in" id="student-profile-page">
            <div className="bg-white border-l-4 border-slate-700 p-4 rounded shadow-3xs">
              <h2 className="text-xl font-bold text-gray-800">
                Student Profile (Hồ sơ cá nhân sinh viên)
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Thông tin lý lịch, địa chỉ liên lạc và phụ huynh đã đăng ký trên hệ thống của trường.
              </p>
            </div>

            {/* Profile design */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-12">
              
              {/* Profile Sidebar (Interactive student card) - Span 4 */}
              <div className="md:col-span-4 bg-slate-900 text-white p-6 flex flex-col justify-between items-center text-center relative border-r border-gray-200">
                <div className="absolute top-3 right-3 bg-orange-500 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {activeStudent.cohort} STUDENT
                </div>

                {/* Avatar Placeholder */}
                <div className="w-28 h-36 bg-gray-700 border-2 border-white rounded mt-4 flex items-center justify-center text-gray-400 font-mono overflow-hidden shadow-md">
                  <div className="flex flex-col items-center">
                    <User className="w-10 h-10 stroke-1 mb-1" />
                    <span className="text-[10px] font-bold font-mono bg-amber-500 text-slate-950 px-1.5 rounded">{activeStudent.id}</span>
                  </div>
                </div>

                {/* Name */}
                <div className="mt-4">
                  <h3 className="text-lg font-black tracking-wide bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">{activeStudent.name}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{activeStudent.email}</p>
                </div>

                {/* Brand */}
                <div className="mt-8 border-t border-slate-800 pt-4 w-full">
                  <span className="text-[10px] tracking-widest text-[#f37021] font-extrabold uppercase block font-sans">ĐẠI HỌC FPT CO-OP</span>
                  <span className="text-[9px] text-gray-500 font-mono block mt-0.5">TRƯỜNG ĐẠI HỌC FPT TUYÊN DỤNG</span>
                </div>
              </div>

              {/* Profile Details Content area - Span 8 */}
              <div className="md:col-span-8 p-6 text-xs text-gray-700 space-y-6">
                
                {/* Academic Fields */}
                <div>
                  <h4 className="text-xs font-bold text-gray-800 border-b border-gray-100 pb-2 uppercase tracking-wider mb-3">
                    🏢 Thông tin học vụ / Academic records
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p><strong>Student ID (Mã sinh viên):</strong> <span className="font-mono text-gray-900 font-bold">{activeStudent.id}</span></p>
                    <p><strong>Specialization (Chuyên ngành):</strong> <span className="text-gray-900 font-medium">{activeStudent.major}</span></p>
                    <p><strong>Curriculum version (Bộ khung chương trình):</strong> <span className="text-gray-900 font-medium">{activeStudent.curriculum}</span></p>
                    <p><strong>Campus enrolled (Địa chỉ học sở):</strong> <span className="text-gray-900 font-medium">{campus} (FPT University Hà Nội)</span></p>
                    <p><strong>Academic Status (Tình trạng học tập):</strong> <span className="bg-green-150 text-green-900 px-2 py-0.5 rounded font-bold">STUDYING (Đang học chính thức)</span></p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="border-t border-gray-150 pt-4">
                  <h4 className="text-xs font-bold text-gray-800 border-b border-gray-100 pb-2 uppercase tracking-wider mb-3">
                    👤 Thông tin cá nhân / Personal Profile
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p><strong>Full Name (Họ và tên):</strong> <span className="text-gray-900 font-medium">{activeStudent.name}</span></p>
                    <p><strong>Gender (Giới tính):</strong> <span className="text-gray-900 font-medium">Nam</span></p>
                    <p><strong>Date of Birth (Ngày sinh):</strong> <span className="text-gray-900 font-medium">15/09/2006</span></p>
                    <p><strong>Citizen Identity (Số CCCD):</strong> <span className="text-gray-900 font-mono">038206012485</span></p>
                    <p><strong>Address (Nơi cư trú):</strong> <span className="text-gray-900 font-medium">Khu đô thị FPT City, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng / Hà Nội</span></p>
                    <p><strong>Mobile phone (Số điện thoại):</strong> <span className="text-gray-900 font-mono">0984 513 252</span></p>
                  </div>
                </div>

                {/* Parent Information */}
                <div className="border-t border-gray-150 pt-4">
                  <h4 className="text-xs font-bold text-gray-800 border-b border-gray-100 pb-2 uppercase tracking-wider mb-3">
                    👨‍👩‍👦 Thông tin phụ huynh liên hệ / Parent details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p><strong>Primary Contact (Họ tên cha/mẹ):</strong> <span className="text-gray-900 font-medium">Phùng Văn Sơn</span></p>
                    <p><strong>Parent Mobile (SĐT phụ huynh):</strong> <span className="text-gray-900 font-mono">0912 308 131</span></p>
                    <p><strong>Contact Email (Hòm thư phụ huynh):</strong> <span className="text-gray-900 font-mono">phungvanson.ph@fe.edu.vn</span></p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Dynamic Popover Modal for viewing specific slot activity detail in Weekly timetable */}
      {selectedSlotDetails && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="slot-details-modal">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-[#4f81bd] text-white p-4 font-bold flex justify-between items-center bg-slate-850">
              <h4 className="text-sm font-bold uppercase tracking-wide">Chi tiết ca học / Session info</h4>
              <button 
                onClick={() => setSelectedSlotDetails(null)}
                className="text-white hover:text-orange-200 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-5 text-xs text-gray-700 space-y-4">
              <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                <div>
                  <span className="bg-blue-100 text-blue-800 text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded">
                    {selectedSlotDetails.subjectCode}
                  </span>
                  <h5 className="font-extrabold text-sm text-gray-800 mt-1">{selectedSlotDetails.subjectName}</h5>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-600">
                <p><strong>Lớp học / Class Code:</strong> <span className="text-gray-900 font-bold">{selectedSlotDetails.classCode}</span></p>
                <p><strong>Phòng học / Room:</strong> <span className="text-gray-900 font-semibold">{selectedSlotDetails.room}</span></p>
                <p><strong>Giảng viên / Lecturer:</strong> <span className="text-gray-900 font-mono font-bold">{selectedSlotDetails.teacher}</span></p>
                <p><strong>Ca học / Slot:</strong> <span className="text-red-700 font-bold">{selectedSlotDetails.slot} (09:15 - 10:45)</span></p>
              </div>

              {/* Attendance and study progression */}
              <div className="p-3.5 bg-slate-50 border border-gray-200 rounded-lg">
                <span className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">Học tập & Điểm danh / Study Status</span>
                <div className="flex items-center justify-between">
                  <span>Trạng thái chuyên cần:</span>
                  {selectedSlotDetails.status === 'attended' && (
                    <span className="bg-green-100 text-green-800 font-extrabold px-3 py-1 rounded text-[11px]">
                      ✔ Attended (Đã tham gia)
                    </span>
                  )}
                  {selectedSlotDetails.status === 'absent' && (
                    <span className="bg-red-150 text-red-900 font-extrabold px-3 py-1 rounded text-[11px]">
                      ❌ Absent (Vắng mặt)
                    </span>
                  )}
                  {selectedSlotDetails.status === 'future' && (
                    <span className="bg-slate-100 text-slate-600 font-medium px-3 py-1 rounded text-[11px]">
                      Học phần chưa xảy ra
                    </span>
                  )}
                </div>
              </div>

              {/* Hybrid learning meet link */}
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-lg space-y-1">
                <span className="text-blue-800 font-bold font-mono text-[10px] uppercase">Google Meet Hybrid backup link:</span>
                <p className="font-mono text-blue-600 font-semibold truncate text-[10px]">
                  meet.google.com/fpt-{selectedSlotDetails.subjectCode.toLowerCase()}-coop
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-3 border-t border-gray-150 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSlotDetails(null)}
                className="bg-[#4f81bd] hover:bg-[#3b629c] text-white font-bold px-4 py-1.5 rounded text-xs transition cursor-pointer"
              >
                Đóng / OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAP Site footer bar replica */}
      <footer className="bg-[#f1f1f1] border-t border-gray-300 py-6 text-center text-xs text-gray-500 mt-auto leading-relaxed">
        <div className="max-w-7xl mx-auto px-4">
          <p>Mọi góp ý, thắc mắc xin liên hệ: <strong>Phòng dịch vụ sinh viên</strong>: Email: <a href="mailto:dichvusinhvien@fe.edu.vn" className="text-blue-600 hover:underline font-bold">dichvusinhvien@fe.edu.vn</a>. Điện thoại: <strong>(024)7308.13.13</strong></p>
          <p className="mt-1">© Powered by <strong>FPT University</strong> | <a href="#" className="hover:underline text-blue-600">CMS</a> | <a href="#" className="hover:underline text-blue-600">library</a> | <a href="#" className="hover:underline text-blue-600">books24x7</a> | <a href="#" className="hover:underline text-blue-600">LMS</a></p>
          <p className="mt-1.5 text-[10px] text-gray-400 font-medium">Bảo mật thông tin là quyền lợi cá nhân và trách nhiệm tập thể sinh viên trường Đại học FPT.</p>
        </div>
      </footer>
    </div>
  );
}
