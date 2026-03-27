import { useState, useEffect } from 'react';

export type UserRole = 'student' | 'teacher' | 'management';

export function useAuth() {
  const [role, setRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem('educore_role');
    return (saved as UserRole) || null;
  });

  const login = (r: UserRole) => {
    localStorage.setItem('educore_role', r);
    setRole(r);
  };

  const logout = () => {
    localStorage.removeItem('educore_role');
    setRole(null);
  };

  return { role, login, logout, isLoggedIn: role !== null };
}
