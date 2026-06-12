/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Student } from '../types';
import { Eye, EyeOff, ChevronDown, Mail, Globe, ArrowLeft, AlertTriangle } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (student: Student, campus: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [selectedCampus, setSelectedCampus] = useState('FPTU-Hòa Lạc');
  const [activeView, setActiveView] = useState<'fap' | 'feid' | 'parent'>('fap');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // FEID Form Fields
  const [feidUsername, setFeidUsername] = useState('');
  const [feidPassword, setFeidPassword] = useState('');
  const [feidError, setFeidError] = useState('');

  // Parent Form Fields
  const [parentPhone, setParentPhone] = useState('');
  const [parentOTP, setParentOTP] = useState('');
  const [parentError, setParentError] = useState('');

  // Registered authentic test accounts for simulation
  const googleAccounts = [
    { email: 'nhultqhe204435@gmail.com', name: 'Lê Thị Quỳnh Như', id: 'HE204435', major: 'Digital Arts & Design', cohort: 'K20' },
  ];

  const handleSelectAccount = (account: typeof googleAccounts[0]) => {
    const student: Student = {
      id: account.id,
      name: account.name,
      email: account.email,
      campus: selectedCampus,
      major: account.major,
      curriculum: `${account.major} Curriculum 2026`,
      cohort: account.cohort,
    };
    setShowGoogleModal(false);
    onLoginSuccess(student, selectedCampus);
  };

  const handleFeidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feidUsername || !feidPassword) {
      setFeidError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
      return;
    }

    // Default to Lê Thị Quỳnh Như (HE204435) for easiest demonstration
    const selectedStudent = googleAccounts[0]; 

    const student: Student = {
      id: selectedStudent.id,
      name: selectedStudent.name,
      email: selectedStudent.email,
      campus: selectedCampus,
      major: selectedStudent.major,
      curriculum: `${selectedStudent.major} Curriculum 2026`,
      cohort: selectedStudent.cohort,
    };
    onLoginSuccess(student, selectedCampus);
  };

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentPhone || !parentOTP) {
      setParentError('Vui lòng nhập số điện thoại và mã OTP gửi tới phụ huynh');
      return;
    }
    const selectedStudent = googleAccounts[0]; // Auto-authenticate to Lê Thị Quỳnh Như
    const student: Student = {
      id: selectedStudent.id,
      name: selectedStudent.name,
      email: selectedStudent.email,
      campus: selectedCampus,
      major: selectedStudent.major,
      curriculum: `${selectedStudent.major} Curriculum 2026`,
      cohort: selectedStudent.cohort,
    };
    onLoginSuccess(student, selectedCampus);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col justify-between" id="fap-app-login-container">
      
      {/* =========================================================================
                                     FAP VIEW
          ========================================================================= */}
      {activeView === 'fap' && (
        <div className="flex-1 flex flex-col">
          {/* Authentic FAP Corporate Header */}
          <header className="w-full bg-white border-b border-gray-200 py-3 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                {/* SVG FPT Logo curves with high accuracy */}
                <div className="flex items-center pr-4 border-r border-gray-200">
                  <svg className="w-14 h-12" viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2050/svg">
                    <path d="M5 45 C20 12, 58 12, 92 18 C80 30, 52 28, 30 50 Z" fill="#F37021" />
                    <path d="M5 58 C25 46, 68 46, 85 75 C60 68, 38 68, 15 75 Z" fill="#1C3F94" />
                    <path d="M10 10 C42 5, 75 20, 92 55 C76 35, 48 24, 20 30 Z" fill="#009530" />
                  </svg>
                  <div className="ml-2.5 flex flex-col leading-none">
                    <span className="text-2xl font-mono font-black italic tracking-tighter text-[#F37021]">FPT</span>
                    <span className="text-[10px] font-sans font-bold tracking-widest text-[#1C3F94] uppercase">University</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-[#1C3F94] tracking-tight">FPT University Academic Portal</h1>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">fap.fpt.edu.vn • Academic Administration and Student Services</p>
                </div>
              </div>

              {/* Language selections and Contact links */}
              <div className="flex items-center gap-4 text-xs">
                <span className="text-gray-500 font-medium">Language:</span>
                <button type="button" className="px-2 py-0.5 border border-orange-500 text-orange-600 font-bold rounded bg-orange-50">VI</button>
                <button type="button" className="px-2 py-0.5 border border-gray-300 text-gray-500 rounded">EN</button>
                <span className="text-gray-300">|</span>
                <a href="#hotline" className="text-red-600 font-bold hover:underline">Hotline: 028.73005588</a>
              </div>
            </div>
          </header>

          {/* Banner layout matching Image 1 */}
          <div className="bg-orange-50/70 border-b border-orange-100 py-3.5 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-600 text-white rounded-full p-1.5 flex items-center justify-center animate-bounce">
                  <span className="text-[10px] font-bold">New</span>
                </div>
                <div className="text-sm text-gray-700 leading-tight">
                  <span className="font-bold text-orange-700">FAP Mobile App (myFAP) is ready for your mobile device!</span> Download the authentic app for direct notifications.
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {/* Apple App Store Badge */}
                  <a href="#appstore" className="bg-black text-white hover:bg-neutral-900 px-3 py-1.5 rounded flex items-center gap-2 transition text-left">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.61.7-1.14 1.83-1 2.95 1.1.09 2.25-.59 2.95-1.4" />
                    </svg>
                    <div className="leading-tight">
                      <span className="text-[8px] block opacity-75">Download on the</span>
                      <span className="text-xs font-bold block -mt-1">App Store</span>
                    </div>
                  </a>

                  {/* Google Play Store Badge */}
                  <a href="#playstore" className="bg-black text-white hover:bg-neutral-900 px-3 py-1.5 rounded flex items-center gap-2 transition text-left">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M3.609 1.814l11.454 11.455-1.562 1.563-12.723-12.723c.319-.241.7-.358 1.077-.358.261 0 .521.058.754.163zm18.3 9.431l-3.328-1.921-2.964 2.964 2.964 2.964 3.328-1.921c.883-.51 1.256-1.353 1.256-2.086 0-.733-.373-1.576-1.256-2.086zm-18.067 11.13c-.232.105-.493.163-.754.163-.377 0-.758-.117-1.077-.358l12.723-12.724 1.562 1.562-11.454 11.357zm-.607-20.082l10.9 10.9-10.9 10.9c-.279.117-.584.181-.894.181-.466 0-.919-.136-1.314-.403l.006-.006c-.846-.531-1.378-1.488-1.378-2.584v-15.981c0-1.095.532-2.052 1.378-2.584l-.006-.006c.395-.267.848-.403 1.314-.403.31 0 .615.064.894.181z" />
                    </svg>
                    <div className="leading-tight">
                      <span className="text-[8px] block opacity-75">GET IT ON</span>
                      <span className="text-xs font-bold block -mt-1">Google Play</span>
                    </div>
                  </a>
                </div>

                <div className="hidden lg:flex items-center gap-2 text-xs border-l border-orange-200 pl-4 text-gray-500">
                  <span>Hỗ trợ kỹ thuật:</span>
                  <a href="mailto:fap@fpt.edu.vn" className="text-blue-600 hover:underline font-semibold leading-none">fap@fpt.edu.vn</a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Layout containing dual columns matching precisely */}
          <main className="max-w-6xl w-full mx-auto my-8 px-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Guidelines / Welcome message */}
            <section className="lg:col-span-7 bg-white p-6 border border-gray-200 rounded-sm">
              <h2 className="text-md font-bold text-orange-600 border-b border-orange-200 pb-2 mb-4 uppercase flex items-center gap-2">
                📌 Thư ngỏ / Welcome message
              </h2>
              
              <div className="text-xs space-y-4.5 leading-relaxed text-gray-700">
                <p>
                  Hệ thống <strong>FPT University Academic Portal (FAP)</strong> là kênh thông tin đào tạo chính thức quản lý các hoạt động khảo thí, thời khóa biểu, tài chính học phí, bảng điểm trực tuyến cho sinh viên các cơ sở đào tạo của Trường Đại học FPT.
                </p>
                
                <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-sm">
                  <span className="font-bold text-[#1C3F94] block mb-1">📢 THỜI KHÓA BIỂU HỌC KỲ SUMMER 2026</span>
                  <p className="font-medium text-gray-700">Học kỳ Summer 2026 chính thức bắt đầu từ ngày <strong>11/05/2026</strong> và kéo dài đến hết ngày <strong>30/08/2026</strong>.</p>
                  <p className="mt-1 text-slate-500">Hãy cập nhật thời khóa biểu thường xuyên để hạn chế bỏ tiết điểm danh.</p>
                </div>

                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-sm text-rose-950">
                  <strong className="text-rose-900 block mb-1">⚠️ Lưu ý bảo mật tài khoản:</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Sinh viên tuyệt đối không cung cấp thông tin tài khoản cho bất kỳ ai.</li>
                    <li>Sử dụng chức năng Single Sign-On (SSO) để đăng nhập an toàn bằng hòm thư trường cấp.</li>
                    <li>Đăng xuất khỏi thiết bị công cộng ngay sau khi sử dụng để tránh rủi ro mất mát dữ liệu học tập.</li>
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <p className="font-bold text-gray-800">Các liên kết hữu ích khác / Useful Links:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-blue-600 font-medium">
                    <a href="#cms" className="hover:underline flex items-center gap-1">▪ CMS (Course Management System) ↗</a>
                    <a href="#edunext" className="hover:underline flex items-center gap-1">▪ EduNext Collaborative Platform ↗</a>
                    <a href="#flm" className="hover:underline flex items-center gap-1">▪ FLM Curriculum Matrix ↗</a>
                    <a href="#library" className="hover:underline flex items-center gap-1">▪ FPTU Digital Library Database ↗</a>
                    <a href="#dng" className="hover:underline flex items-center gap-1">▪ Cơ sở Đà Nẵng Portal ↗</a>
                    <a href="#hcm" className="hover:underline flex items-center gap-1">▪ Cơ sở TP. Hồ Chí Minh Portal ↗</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column: Portal Boxes structured matching FAP legacy fieldset with absolute badge titles */}
            <section className="lg:col-span-5 space-y-8">
              
              {/* Box 1: Parents (Phụ huynh) */}
              <div className="relative border border-gray-300 bg-white rounded p-6 pt-7 shadow-xs">
                {/* Fieldset-like Legend Tab */}
                <div className="absolute -top-3.5 left-4 bg-[#f37021] text-white font-bold text-xs uppercase px-3 py-1 rounded-sm shadow-xs border border-orange-600">
                  Phụ huynh / Parents
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-4 font-sans leading-relaxed">
                    Dành cho Phụ huynh sinh viên theo dõi chuyên cần, tiến độ đóng học phí, kết quả học tập qua từng kỳ học tiện lợi.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setParentError('');
                      setActiveView('parent');
                    }}
                    className="bg-[#337ab7] hover:bg-[#286090] border border-[#2e6da4] text-white font-medium text-xs px-6 py-2.5 rounded shadow-2xs transition active:scale-95 cursor-pointer uppercase tracking-wider"
                  >
                    Đăng nhập / Log in
                  </button>
                </div>
              </div>

              {/* Box 2: Students, Lecturers, Staff (Sinh viên, Giảng viên, Cán bộ) */}
              <div className="relative border border-gray-300 bg-white rounded p-6 pt-7 shadow-xs">
                {/* Fieldset-like Legend Tab */}
                <div className="absolute -top-3.5 left-4 bg-[#f37021] text-white font-bold text-xs uppercase px-3 py-1 rounded-sm shadow-xs border border-orange-600">
                  Sinh viên, Giảng viên, Cán bộ ĐH-FPT
                </div>
                
                <div className="space-y-5">
                  {/* Select Campus Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Chọn cơ sở đào tạo / Academic Campus:
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCampus}
                        disabled
                        className="w-full text-xs font-semibold border border-gray-300 rounded py-2 px-3 bg-gray-100 text-gray-600 appearance-none cursor-not-allowed"
                      >
                        <option value="FPTU-Hòa Lạc">FPTU Hòa Lạc (Hà Nội)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* SSO Buttons */}
                  <div className="space-y-3">
                    
                    {/* Authentic Red Google SSO Button using classic red style */}
                    <button
                      type="button"
                      onClick={() => setShowGoogleModal(true)}
                      className="w-full h-10 flex items-center justify-center gap-3 bg-[#c9302c] hover:bg-[#ac2925] border border-[#ac2925] text-white font-bold text-xs px-4 rounded shadow-2xs transition duration-150 cursor-pointer text-center"
                    >
                      {/* Classic white G+ box */}
                      <span className="bg-white text-[#c9302c] font-black text-[10px] px-1.5 py-0.5 rounded tracking-tighter shadow-sm">G+</span>
                      <span>Login with Google @fpt.edu.vn</span>
                    </button>

                    {/* Styled informational guideline exactly as asked in image */}
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFeidError('');
                          setActiveView('feid');
                        }}
                        className="text-xs text-gray-800 hover:text-orange-600 underline font-semibold transition cursor-pointer"
                      >
                        Với sinh viên từ K19 đăng nhập với FEID
                      </button>
                    </div>

                    {/* FEID Mail Sign-in Action Button (Solid clean blue layout) */}
                    <button
                      type="button"
                      onClick={() => {
                        setFeidError('');
                        setActiveView('feid');
                      }}
                      className="w-full h-10 flex items-center justify-center gap-2.5 bg-[#337ab7] hover:bg-[#286090] border border-[#2e6da4] text-white font-bold text-xs px-4 rounded shadow-2xs transition duration-150 cursor-pointer text-center"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Login with FEID (Accounts / Password)</span>
                    </button>

                  </div>

                  {/* Keyboard help guidelines representation */}
                  <div className="p-3 bg-neutral-50 rounded border border-gray-100 text-[10.5px] text-gray-500 leading-normal">
                    Hệ thống vận hành tốt nhất trên trình duyệt <strong className="text-gray-700">Google Chrome</strong>.<br />
                    Mẹo: Nhấn tổ hợp phím <kbd className="bg-white px-1 py-0.5 border border-gray-200 rounded font-mono text-[9px] font-bold text-gray-650 shadow-3xs">Ctrl + F5</kbd> khi có sự cố hiển thị để làm sạch Cache.
                  </div>

                </div>
              </div>

              {/* QR and App Store Badge box */}
              <div className="bg-neutral-50 p-4 border border-dashed border-gray-300 rounded flex items-center gap-4">
                <div className="flex-shrink-0 bg-white p-1 border border-gray-200 rounded shadow-3xs">
                  {/* Generated QR representation */}
                  <svg className="w-16 h-16 text-neutral-800" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    <rect x="5" y="5" width="20" height="20" fill="currentColor" />
                    <rect x="9" y="9" width="12" height="12" fill="white" />
                    <rect x="75" y="5" width="20" height="20" fill="currentColor" />
                    <rect x="79" y="9" width="12" height="12" fill="white" />
                    <rect x="5" y="75" width="20" height="20" fill="currentColor" />
                    <rect x="9" y="79" width="12" height="12" fill="white" />
                    <rect x="35" y="10" width="8" height="8" fill="currentColor" />
                    <rect x="45" y="25" width="12" height="6" fill="currentColor" />
                    <rect x="15" y="45" width="10" height="8" fill="currentColor" />
                    <rect x="60" y="40" width="8" height="20" fill="currentColor" />
                    <rect x="50" y="60" width="15" height="15" fill="currentColor" />
                    <rect x="30" y="75" width="12" height="12" fill="currentColor" />
                    <rect x="75" y="75" width="10" height="10" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-650 uppercase block tracking-wider leading-tight">myFAP App QR Code</span>
                  <p className="text-[10px] text-gray-500 leading-normal mt-1">Dùng camera quét mã QR để nhanh chóng tải ứng dụng, đăng nhập tức thì.</p>
                </div>
              </div>

            </section>
          </main>
        </div>
      )}

      {/* =========================================================================
                                     FEID VIEW (Image 2 representation)
          ========================================================================= */}
      {activeView === 'feid' && (
        <div className="flex-1 flex flex-col justify-start bg-[#f2f4f8] min-h-screen">
          {/* Header of feid.fpt.edu.vn like Image 2 */}
          <header className="w-full bg-[#34495e] text-white py-3.5 px-6 shadow-md">
            <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="font-extrabold italic tracking-tighter text-lg text-white">
                  FPT <span className="text-[#f37021]">Education</span>
                </div>
                <span className="text-[#516a81]">|</span>
                <span className="text-xs font-semibold tracking-wide uppercase text-gray-200 hidden sm:inline">Tổ chức Giáo dục FPT</span>
              </div>
              <div className="text-xs flex items-center gap-1.5 text-gray-300">
                <Globe className="w-3.5 h-3.5" />
                <span className="font-mono">feid.fpt.edu.vn</span>
              </div>
            </div>
          </header>

          <main className="max-w-md w-full mx-auto my-12 px-4 flex-1">
            {/* Quick exit line to return to FAP portal */}
            <button
              onClick={() => setActiveView('fap')}
              className="mb-4 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition py-1 cursor-pointer font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại FAP Student Portal
            </button>

            {/* Authentic FEID Login Card matching Image 2 perfectly */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
              <div className="p-7">
                
                {/* FeID Centered Title block */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1 text-[#f37021] font-black text-2xl tracking-tighter font-mono">
                    FE<span className="bg-[#f37021] text-white px-2 py-0.5 rounded-sm">ID</span>
                  </div>
                  <h2 className="text-sm font-bold text-gray-700 mt-2 uppercase tracking-wide">Đăng nhập bằng tài khoản và mật khẩu</h2>
                  <p className="text-[11px] text-gray-400 mt-1">Dành cho sinh viên từ khóa K19 trở lên của hệ thống F&E</p>
                </div>

                {feidError && (
                  <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{feidError}</span>
                  </div>
                )}

                {/* Log-In Fields */}
                <form onSubmit={handleFeidSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Tài khoản</label>
                    <input
                      type="text"
                      required
                      placeholder="Tài khoản (Username) ví dụ: nhultqhe204435"
                      value={feidUsername}
                      onChange={(e) => {
                        setFeidUsername(e.target.value);
                        setFeidError('');
                      }}
                      className="w-full text-xs border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-[#fbfcfd]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Mật khẩu</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Mật khẩu được nhà trường cấp"
                        value={feidPassword}
                        onChange={(e) => {
                          setFeidPassword(e.target.value);
                          setFeidError('');
                        }}
                        className="w-full text-xs border border-gray-300 rounded py-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-[#fbfcfd]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Standard Bootstrap Blue Login button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#337ab7] hover:bg-[#286090] border border-[#2e6da4] text-white font-bold text-xs rounded transition duration-150 cursor-pointer text-center uppercase tracking-wider"
                  >
                    Login
                  </button>
                </form>

                {/* Direct support action links shown in Image 2 */}
                <div className="mt-4 text-center">
                  <a href="#reset-pass" className="text-xs text-blue-600 hover:underline font-bold">
                    Quên mật khẩu, lấy lại mật khẩu hoặc đăng nhập lần đầu
                  </a>
                </div>

                {/* SSO options matching Image 2 layout */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center text-xs font-bold text-gray-450 uppercase tracking-wider mb-4">
                    Hoặc đăng nhập SSO với
                  </div>

                  <div className="space-y-3">
                    {/* Google @fpt.edu.vn button styled precisely with white bg and blue/gray border as in screenshot */}
                    <button
                      type="button"
                      onClick={() => setShowGoogleModal(true)}
                      className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 border border-blue-400 py-2.5 px-4 rounded transition cursor-pointer text-center"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.37-.58-.69-1.25-.95-1.74z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span className="text-xs font-bold text-blue-800">Email fpt.edu.vn hoặc Gmail</span>
                    </button>

                    {/* Microsoft SSO button matching image spacing */}
                    <button
                      type="button"
                      onClick={() => setShowGoogleModal(true)}
                      className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 border border-blue-450 py-2.5 px-4 rounded transition cursor-pointer text-center"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 23 23">
                        <path fill="#f35325" d="M0 0h11v11H0z" />
                        <path fill="#81bc06" d="M12 0h11v11H12z" />
                        <path fill="#05a6f0" d="M0 12h11v11H0z" />
                        <path fill="#ffba08" d="M12 12h11v11H12z" />
                      </svg>
                      <span className="text-xs font-bold text-blue-800">Microsoft Email</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </main>
        </div>
      )}

      {/* =========================================================================
                                     PARENT VIEW
          ========================================================================= */}
      {activeView === 'parent' && (
        <div className="flex-1 flex flex-col justify-start bg-[#f2f4f8] min-h-screen">
          <header className="w-full bg-[#f37021] text-white py-4 px-6 shadow-md flex items-center justify-between">
            <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
              <span className="font-extrabold italic text-xl">FPTU Parent Portal</span>
              <span className="text-xs font-mono">cochephuhuynh.fpt.edu.vn</span>
            </div>
          </header>

          <main className="max-w-md w-full mx-auto my-12 px-4 flex-1">
            <button
              onClick={() => setActiveView('fap')}
              className="mb-4 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition py-1 cursor-pointer font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại FAP Student Portal
            </button>

            <div className="bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-md font-bold text-gray-800">Cổng đăng nhập bảo mật dành cho Phụ huynh</h2>
                  <p className="text-xs text-gray-400 mt-1">Xác thực OTP bằng Số điện thoại đã được đăng ký trong học vụ</p>
                </div>

                {parentError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                    {parentError}
                  </div>
                )}

                <form onSubmit={handleParentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Số điện thoại Phụ huynh</label>
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại đã đăng ký (ví dụ: 091xxxxx)"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-gray-600">Mã xác thực OTP</label>
                      <button
                        type="button"
                        onClick={() => alert('Mã OTP minh họa gửi về máy phụ huynh: 2026')}
                        className="text-[11px] text-orange-600 hover:underline bg-orange-50 px-2 py-0.5 border border-orange-200 rounded font-medium"
                      >
                        Gửi OTP qua SMS
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Mã xác thực 4 số (demo nhập: 2026)"
                      value={parentOTP}
                      onChange={(e) => setParentOTP(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded py-2 px-3 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#f37021] hover:bg-orange-700 text-white font-bold text-xs rounded uppercase tracking-wider transition"
                  >
                    Xác thực và Tra cứu
                  </button>
                </form>

                <div className="mt-8 text-center text-xs text-gray-400 leading-normal">
                  Vui lòng liên kết SĐT phụ huynh với phòng học vụ của cơ sở đào tạo để lấy quyền truy cập dữ liệu. Hotline tư vấn: 028.73005588.
                </div>
              </div>
            </div>
          </main>
        </div>
      )}


      {/* =========================================================================
                             GOOGLE SSO LOGIN ACCOUNT CHOOSER DIALOG
          ========================================================================= */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" id="google-sso-modal">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 flex flex-col relative">
            
            {/* Google Logo Brand Header */}
            <div className="p-6 text-center border-b border-gray-100 bg-neutral-50">
              <div className="flex justify-center mb-3">
                <svg className="h-6" viewBox="0 0 74 24" fill="currentColor">
                  <path fill="#ea4335" d="M68.04 11.23c-1.39 0-2.52 1.17-2.52 2.62s1.13 2.62 2.52 2.62c1.37 0 2.5-1.17 2.5-2.62s-1.13-2.62-2.5-2.62M68.04 18c-2.48 0-4.48-2.03-4.48-4.15 0-2.14 2-4.15 4.48-4.15 2.44 0 4.45 2.01 4.45 4.15C72.49 15.97 70.48 18 68.04 18M57.65 11.23c-1.39 0-2.52 1.17-2.52 2.62s1.13 2.62 2.52 2.62c1.37 0 2.5-1.17 2.5-2.62s-1.13-2.62-2.5-2.62M57.65 18c-2.48 0-4.48-2.03-4.48-4.15 0-2.14 2-4.15 4.48-4.15 2.44 0 4.45 2.01 4.45 4.15C62.1 15.97 60.09 18 57.65 18" />
                  <path fill="#fbbc05" d="M47.74 13.91v-4.11h3.9c-.11.64-.47 1.88-1.88 2.85l2.96 2.3c1.72-1.59 2.71-3.94 2.71-6.73 0-.6-.06-1.11-.13-1.62H47.74v12.02h3.95V13.91zM41.51 17.65c-1.2 0-2.01-.81-2.01-1.92V9.8h-3.95v6.4c0 2.14 1.71 3.8 3.95 3.8h2.01V17.65z" />
                  <path fill="#34a853" d="M30.68.74v19.26h3.95V.74zM16.51 11.23c-1.39 0-2.52 1.17-2.52 2.62s1.13 2.62 2.52 2.62c1.37 0 2.5-1.17 2.5-2.62s-1.13-2.62-2.5-2.62M16.51 18c-2.48 0-4.48-2.03-4.48-4.15 0-2.14 2-4.15 4.48-4.15 2.44 0 4.45 2.01 4.45 4.15C20.96 15.97 18.95 18 16.51 18M6.28 11.23c-1.39 0-2.52 1.17-2.52 2.62s1.13 2.62 2.52 2.62c1.37 0 2.5-1.17 2.5-2.62s-1.13-2.62-2.5-2.62M6.28 18C3.8 18 1.8 15.97 1.8 13.85c0-2.14 2-4.15 4.48-4.15 2.44 0 4.45 2.01 4.45 4.15C10.73 15.97 8.72 18 6.28 18m0-12.22c1.45 0 2.5-.58 3.03-1.11L7.26 2.6C6.81 3.05 5.91 3.63 4.28 3.63 2.5 3.63 1.8 1.82 1.8.72h12.5c.08.41.13.91.13 1.48 0 3.79-2.54 6.57-6.15 6.57" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-[#202124] tracking-tight">Đăng nhập tài khoản trường cấp</h3>
              <p className="text-xs text-gray-500 mt-1">Đăng nhập để vào hệ thống đào tạo <strong className="text-[#F37021]">fpt.edu.vn</strong></p>
            </div>

            {/* Account List representation */}
            <div className="p-5 flex-1 max-h-[320px] overflow-y-auto space-y-2.5">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2">Chọn một tài khoản fpt:</span>

              {googleAccounts.map((account) => {
                const initLetters = account.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                const isNhu = account.name.includes('Quỳnh Như');
                
                return (
                  <button
                    key={account.email}
                    onClick={() => handleSelectAccount(account)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50/50 text-left transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xs ${isNhu ? 'bg-orange-500 animate-pulse' : 'bg-blue-600'}`}>
                        {initLetters}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-700 group-hover:text-amber-950 flex items-center gap-1.5">
                          {account.name}
                          {isNhu && <span className="bg-orange-100 text-orange-700 text-[8px] px-1.5 py-0.5 rounded font-sans uppercase font-black">5 Môn Học</span>}
                        </span>
                        <span className="block text-[10px] text-gray-400 font-mono leading-none mt-0.5">{account.email}</span>
                      </div>
                    </div>
                    
                    <div className="text-[9px] font-bold text-gray-400 font-mono bg-neutral-100 group-hover:bg-orange-100 group-hover:text-orange-850 rounded px-1.5 py-0.5">
                      {account.id}
                    </div>
                  </button>
                );
              })}

              {/* simulated options */}
              <button
                type="button"
                onClick={() => alert('Vui lòng chọn tài khoản "Lê Thị Quỳnh Như" ở trên để xem chi tiết 5 môn học Summer 2026.')}
                className="w-full p-2.5 mt-2 rounded-lg border border-dashed border-gray-200 hover:border-gray-400 text-left text-xs text-gray-500 font-medium transition cursor-pointer flex items-center justify-center gap-1.5 hover:bg-gray-50"
              >
                <span>➕ Sử dụng một tài khoản khác</span>
              </button>
            </div>

            {/* Google Footer */}
            <div className="p-4 bg-neutral-50 border-t border-gray-150 flex items-center justify-between text-[11px] text-gray-500">
              <span>English (United States)</span>
              <div className="flex gap-2">
                <a href="#help" className="hover:underline">Trợ giúp</a>
                <a href="#privacy" className="hover:underline">Bảo mật</a>
              </div>
            </div>

            {/* Close modal option */}
            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold w-6 h-6 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
                                     FOOTER
          ========================================================================= */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-450 mt-auto leading-relaxed">
        <div className="max-w-6xl mx-auto px-6">
          <p>© Powered by <strong className="text-[#1C3F94]">FPT University</strong> | <a href="#cms" className="hover:underline text-blue-600 font-medium">CMS</a> | <a href="#library" className="hover:underline text-blue-600 font-medium font-mono">library</a> | <a href="#books24x7" className="hover:underline text-blue-600 font-medium">books24x7</a> | <a href="#lms" className="hover:underline text-blue-600 font-medium font-mono">LMS</a></p>
          <p className="mt-1.5 text-[10px] text-gray-400">Copyright © 2026 FPT University. All rights reserved. Version 4.8.2-PROD_SSO_REWRITE</p>
        </div>
      </footer>

    </div>
  );
}
