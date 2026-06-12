/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Login from './components/Login';
import Portal from './components/Portal';
import { Student } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [campus, setCampus] = useState('FPTU-Hòa Lạc');

  const handleLoginSuccess = (loggedInStudent: Student, selectedCampus: string) => {
    setStudent(loggedInStudent);
    setCampus(selectedCampus);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudent(null);
  };

  return (
    <div className="min-h-screen bg-slate-50" id="portal-root">
      {!isLoggedIn || !student ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Portal student={student} campus={campus} onLogout={handleLogout} />
      )}
    </div>
  );
}
