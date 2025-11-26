import "./index.scss";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import AdminSettings from "./pages/AdminSettings";
import Admissions from "./pages/Admissions";
import AdmissionsDashboard from "./pages/Admissions/AdmissionsDashboard";
import AdmissionsPacketDetails from "./pages/Admissions/AdmissionsPacketDetails";
import AdmissionsPackets from "./pages/Admissions/AdmissionsPackets";
import AdmissionsPrograms from "./pages/Admissions/AdmissionsPrograms";
import AdmissionsWaitlists from "./pages/Admissions/AdmissionsWaitlists";
import Billing from "./pages/Billing";
import BillingDashboard from "./pages/Billing/BillingDashboard";
import BillingLibrary from "./pages/Billing/BillingLibrary";
import BillingReports from "./pages/Billing/BillingReports";
import BillingSettings from "./pages/Billing/BillingSettings";
import BillingStudentDetails from "./pages/Billing/BillingStudentDetails";
import AllTransactions from "./pages/Billing/BillingStudentDetails/AllTransactions";
import CurrentActivity from "./pages/Billing/BillingStudentDetails/CurrentActivity";
import UpcommingInvoices from "./pages/Billing/BillingStudentDetails/UpcommingInvoices";
import BillingStudents from "./pages/Billing/BillingStudents";
import BillingSubsidies from "./pages/Billing/BillingSubsidies";
import Documents from "./pages/Documents";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/Expenses/AddExpense";
import Categories from "./pages/Expenses/Categories";
import ExpensesDashboard from "./pages/Expenses/ExpensesDashboard";
import ExpensesList from "./pages/Expenses/ExpensesList";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import Messages from "./pages/Messaging";
import Announcements from "./pages/Messaging/Announcements";
import Messaging from "./pages/Messaging/Messaging";
import Newsletters from "./pages/Messaging/Newsletters";
import MySchoolParents from "./pages/MySchool/MySchoolParents";
import ApprovedPickups from "./pages/MySchool/MySchoolParents/ApprovedPickups";
import Family from "./pages/MySchool/MySchoolParents/Family";
import Parents from "./pages/MySchool/MySchoolParents/Parents";
import MySchoolRooms from "./pages/MySchool/MySchoolRooms";
import MySchoolSchedule from "./pages/MySchool/MySchoolSchedule";
import MySchoolStudentDetails from "./pages/MySchool/MySchoolStudentDetails";
import StudentAttachments from "./pages/MySchool/MySchoolStudentDetails/StudentAttachments";
import StudentDailyReports from "./pages/MySchool/MySchoolStudentDetails/StudentDailyReports";
import StudentFeed from "./pages/MySchool/MySchoolStudentDetails/StudentFeed";
import StudentFormAndRequests from "./pages/MySchool/MySchoolStudentDetails/StudentFormAndRequests";
import StudentLearning from "./pages/MySchool/MySchoolStudentDetails/StudentLearning";
import StudentProfile from "./pages/MySchool/MySchoolStudentDetails/StudentProfile";
import MySchoolStudents from "./pages/MySchool/MySchoolStudents";
import NotFound from "./pages/NotFound";
import Paperwork from "./pages/Paperwork";
import FormsRequests from "./pages/Paperwork/FormsRequests";
import SharedFiles from "./pages/Paperwork/SharedFiles";
import Signups from "./pages/Paperwork/Signups";
import Reporting from "./pages/Reporting";
import Staff from "./pages/Staff";
import StaffDetails from "./pages/Staff/StaffDetails";
import StaffMain from "./pages/Staff/StaffMain";
import StaffPayroll from "./pages/Staff/StaffPayroll";
import StaffTimecards from "./pages/Staff/StaffTimecards";

// Home

// My School

// Messaging

// Billing

// Expenses

// Staff & Payroll

// Learning (NEW)

// Admissions

// Paperwork (NEW)

// Reporting

// Other

export default function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle ?lang=ar/en
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let lang = searchParams.get("lang");

    if (!lang) {
      lang = i18n.language || "ar";
      searchParams.set("lang", lang);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }

    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [location.search, i18n, navigate, location.pathname]);

  return (
    <AppLayout>
      <Routes>
        {/* -------------------- HOME -------------------- */}
        <Route path="/" element={<Home />} />

        {/* -------------------- MY SCHOOL -------------------- */}
        <Route path="/students" element={<MySchoolStudents />} />
        <Route path="/rooms" element={<MySchoolRooms />} />
        <Route path="/schedules" element={<MySchoolSchedule />} />
        <Route path="/settings" element={<AdminSettings />} />

        {/* Student Details */}
        <Route path="/student" element={<MySchoolStudentDetails />}>
          <Route path="feed" element={<StudentFeed />} />
          <Route path="learning" element={<StudentLearning />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="attachments" element={<StudentAttachments />} />
          <Route path="daily-reports" element={<StudentDailyReports />} />
          <Route path="forms-and-requests" element={<StudentFormAndRequests />} />
          <Route index element={<Navigate to="feed" replace />} />
        </Route>

        {/* -------------------- MY SCHOOL PARENTS -------------------- */}
        <Route path="/parents" element={<MySchoolParents />}>
          <Route path="parents" element={<Parents />} />
          <Route path="family" element={<Family />} />
          <Route path="approved-pickups" element={<ApprovedPickups />} />
          <Route index element={<Navigate to="parents" replace />} />
        </Route>

        {/* -------------------- MESSAGING -------------------- */}
        <Route path="/messaging" element={<Messages />}>
          <Route path="messaging" element={<Messaging />} />
          <Route path="Announcements" element={<Announcements />} />
          <Route path="newsletter" element={<Newsletters />} />
          <Route path="programs" element={<AdmissionsPrograms />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* -------------------- BILLING -------------------- */}
        <Route path="/billing" element={<Billing />}>
          <Route path="dashboard" element={<BillingDashboard />} />
          <Route path="students" element={<BillingStudents />} />
          <Route path="subsidies" element={<BillingSubsidies />} />
          <Route path="library" element={<BillingLibrary />} />
          <Route path="reports" element={<BillingReports />} />
          <Route path="settings" element={<BillingSettings />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="/billing/student/:id" element={<BillingStudentDetails />}>
          <Route path="current-activity" element={<CurrentActivity />} />
          <Route path="upcoming-invoices" element={<UpcommingInvoices />} />
          <Route path="all-transactions" element={<AllTransactions />} />
          <Route index element={<Navigate to="current-activity" replace />} />
        </Route>

        <Route path="/paperwork" element={<Paperwork />}>
          <Route path="forms-requests" element={<FormsRequests />} />
          <Route path="shared-files" element={<SharedFiles />} />
          <Route path="signups" element={<Signups />} />
          <Route index element={<Navigate to="forms-requests" replace />} />
        </Route>

        {/* -------------------- EXPENSES -------------------- */}
        <Route path="/expenses" element={<Expenses />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Nested routes */}
          <Route path="dashboard" element={<ExpensesDashboard />} />
          <Route path="list" element={<ExpensesList />} />
          <Route path="add" element={<AddExpense />} />
          <Route path="categories" element={<Categories />} />
        </Route>
        {/* -------------------- STAFF & PAYROLL -------------------- */}
        <Route path="/staff" element={<Staff />}>
          <Route path="staff" element={<StaffMain />} />
          <Route path="timecards" element={<StaffTimecards />} />
          <Route path="payroll" element={<StaffPayroll />} />
          <Route path=":id" element={<StaffDetails />} />
          <Route index element={<Navigate to="staff" replace />} />
        </Route>

        {/* -------------------- LEARNING (NEW) -------------------- */}
        <Route path="/learning" element={<Learning />} />

        {/* -------------------- ADMISSIONS -------------------- */}
        <Route path="/admissions" element={<Admissions />}>
          <Route path="dashboard" element={<AdmissionsDashboard />} />
          <Route path="packets" element={<AdmissionsPackets />} />
          <Route path="packets/:id" element={<AdmissionsPacketDetails />} />
          <Route path="waitlists" element={<AdmissionsWaitlists />} />
          <Route path="programs" element={<AdmissionsPrograms />} />

          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* -------------------- PAPERWORK (NEW) -------------------- */}
        <Route path="/paperwork" element={<Paperwork />} />

        {/* -------------------- REPORTING -------------------- */}
        <Route path="/reporting" element={<Reporting />} />

        {/* -------------------- OTHER -------------------- */}
        <Route path="/documents" element={<Documents />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}
