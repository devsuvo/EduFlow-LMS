'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  BookOpen,
  DollarSign,
  Check,
  X,
  Sparkles,
  AlertCircle,
  Activity,
  Server,
  Key,
} from 'lucide-react';
import { COURSES } from '@/lib/lms-data';

export function AdminDashboard() {
  const [coursesToApprove, setCoursesToApprove] = useState(COURSES.slice(0, 2));
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Dr. Sarah Chen', role: 'Instructor', status: 'Verified', date: 'Jan 12, 2026' },
    { id: 'u2', name: 'Alex Student', role: 'Student', status: 'Active', date: 'Feb 01, 2026' },
    { id: 'u3', name: 'Marcus Vance', role: 'Instructor', status: 'Pending Review', date: 'Feb 15, 2026' },
  ]);

  const handleApprove = (courseId: string) => {
    setCoursesToApprove(coursesToApprove.filter((c) => c.id !== courseId));
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">EduFlow Admin Control Center</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> SuperAdmin
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time platform telemetry, user verification, course approval queue, and server health.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
            <Activity className="w-4 h-4" /> Systems Operational
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Platform Users</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">24,800</div>
          <div className="text-[11px] text-blue-600 font-medium">+1,200 this week</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Active Courses</span>
            <BookOpen className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">1,250</div>
          <div className="text-[11px] text-purple-600 font-medium">98.2% completion rate</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Gross Platform GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">$340,000</div>
          <div className="text-[11px] text-emerald-600 font-medium">+22% YoY growth</div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Pending Approvals</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{coursesToApprove.length}</div>
          <div className="text-[11px] text-amber-600 font-medium">Requires audit</div>
        </div>
      </div>

      {/* Course Approval Pipeline */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" /> Course Quality Approval Queue
        </h3>

        {coursesToApprove.length === 0 ? (
          <div className="text-xs text-slate-400 py-6 text-center">
            Queue clean! All submitted courses have been reviewed and published.
          </div>
        ) : (
          <div className="space-y-3">
            {coursesToApprove.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-12 object-cover rounded-xl"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{course.title}</h4>
                    <p className="text-slate-500">By {course.instructor.name} • {course.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(course.id)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-1 hover:bg-emerald-500"
                  >
                    <Check className="w-4 h-4" /> Approve & Publish
                  </button>
                  <button
                    onClick={() => handleApprove(course.id)}
                    className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-red-600 hover:text-white"
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Management Table */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">User Accounts & Permissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Verification</th>
                <th className="p-3">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">{u.name}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{u.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
