import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider }    from './context/AuthContext'
import { CampusProvider }  from './context/CampusContext'
// import { ThemeProvider }   from './context/ThemeContext'   // dark theme switched off for now
import Navbar              from './components/Navbar'
import Footer              from './components/Footer'
import CustomCursor        from './components/CustomCursor'
import CampusTransition    from './components/CampusTransition'
import CampusPicker        from './components/CampusPicker'
import ScrollToTop         from './components/ScrollToTop'
import ScrollRestoration   from './components/ScrollRestoration'
import RouteAnalytics      from './components/RouteAnalytics'
import WhatsAppButton      from './components/WhatsAppButton'

// Public pages
import Home         from './pages/Home'
import About        from './pages/About'
import Programs     from './pages/Programs'
import Admissions   from './pages/Admissions'
import Scholarships from './pages/Scholarships'
import Donate       from './pages/Donate'
import News         from './pages/News'
import Calendar     from './pages/Calendar'
import Downloads    from './pages/Downloads'
import Gallery      from './pages/Gallery'
import Contact      from './pages/Contact'
import Privacy      from './pages/Privacy'
import Terms        from './pages/Terms'
import NotFound     from './pages/NotFound'

/* Staff content checker at /admin. Unlisted, disallowed in robots.txt, and
 * split into its own chunk (along with the Excel parser it pulls in) so that
 * parents on a metered connection never download any of it. */
const Admin = lazy(() => import('./pages/Admin'))

/* ───────────────────────────────────────────────────────────────────────────
 * PORTAL — DISABLED (requires a backend)
 * The login + admin/teacher/parent dashboards rely on real authentication and a
 * database. They currently run on mock/localStorage data only, so they are
 * commented out until a backend is in place. To re-enable: restore the imports
 * and the <Route> blocks below, and re-enable the "Portal Login" UI in Navbar.jsx.
 *
 * import ProtectedRoute      from './components/ProtectedRoute'
 * import Login               from './pages/Login'
 *
 * // Admin dashboard
 * import AdminLayout         from './dashboards/admin/AdminLayout'
 * import AdminDashboard      from './dashboards/admin/AdminDashboard'
 * import ManageStudents      from './dashboards/admin/ManageStudents'
 * import ManageTeachers      from './dashboards/admin/ManageTeachers'
 * import ManageAdmissions    from './dashboards/admin/ManageAdmissions'
 * import PaymentsOverview    from './dashboards/admin/PaymentsOverview'
 * import AdminReports        from './dashboards/admin/Reports'
 * import AdminAnnouncements  from './dashboards/admin/Announcements'
 * import AdminSettings       from './dashboards/admin/Settings'
 *
 * // Teacher dashboard
 * import TeacherLayout       from './dashboards/teacher/TeacherLayout'
 * import TeacherDashboard    from './dashboards/teacher/TeacherDashboard'
 * import MyStudents          from './dashboards/teacher/MyStudents'
 * import MarkAttendance      from './dashboards/teacher/MarkAttendance'
 * import UploadResults       from './dashboards/teacher/UploadResults'
 * import TeacherMessages     from './dashboards/teacher/TeacherMessages'
 * import PostAnnouncement    from './dashboards/teacher/PostAnnouncement'
 *
 * // Parent dashboard
 * import ParentLayout        from './dashboards/parent/ParentLayout'
 * import ParentDashboard     from './dashboards/parent/ParentDashboard'
 * import ChildProfile        from './dashboards/parent/ChildProfile'
 * import Attendance          from './dashboards/parent/Attendance'
 * import Reports             from './dashboards/parent/Reports'
 * import Messages            from './dashboards/parent/Messages'
 * import Payments            from './dashboards/parent/Payments'
 * import Announcements       from './dashboards/parent/Announcements'
 * ─────────────────────────────────────────────────────────────────────────── */

/* Decoration meant for visiting families: the custom cursor, the campus switch
 * curtain, and the popup asking which campus their child attends. None of it
 * belongs on the staff tool at /admin, where it had been appearing over the top
 * of the page and asking office staff to choose a campus. */
function VisitorChrome() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return null
  return (
    <>
      <CustomCursor />
      <CampusTransition />
      <CampusPicker />
    </>
  )
}

function App() {
  return (
    // <ThemeProvider>  (dark theme switched off for now)
    <AuthProvider>
      <CampusProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <ScrollRestoration />
        <RouteAnalytics />
        <VisitorChrome />
        <Routes>

          {/* ───── PORTAL — DISABLED (requires a backend) ─────────────────────
            Restore these routes once real authentication + a database exist.

            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index                   element={<AdminDashboard />}    />
              <Route path="students"         element={<ManageStudents />}    />
              <Route path="teachers"         element={<ManageTeachers />}    />
              <Route path="admissions"       element={<ManageAdmissions />}  />
              <Route path="payments"         element={<PaymentsOverview />}  />
              <Route path="reports"          element={<AdminReports />}      />
              <Route path="announcements"    element={<AdminAnnouncements />}/>
              <Route path="settings"         element={<AdminSettings />}     />
            </Route>

            <Route path="/teacher" element={
              <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                <TeacherLayout />
              </ProtectedRoute>
            }>
              <Route index               element={<TeacherDashboard />}  />
              <Route path="students"     element={<MyStudents />}         />
              <Route path="attendance"   element={<MarkAttendance />}     />
              <Route path="results"      element={<UploadResults />}      />
              <Route path="messages"     element={<TeacherMessages />}    />
              <Route path="announce"     element={<PostAnnouncement />}   />
            </Route>

            <Route path="/parent" element={
              <ProtectedRoute allowedRoles={['parent', 'admin']}>
                <ParentLayout />
              </ProtectedRoute>
            }>
              <Route index                  element={<ParentDashboard />} />
              <Route path="child"           element={<ChildProfile />}    />
              <Route path="attendance"      element={<Attendance />}      />
              <Route path="reports"         element={<Reports />}         />
              <Route path="messages"        element={<Messages />}        />
              <Route path="payments"        element={<Payments />}        />
              <Route path="announcements"   element={<Announcements />}   />
            </Route>
          ──────────────────────────────────────────────────────────────────── */}

          {/* Staff content checker. Deliberately outside the public layout: no
              navbar, no footer, no Donate button, no WhatsApp bubble. */}
          <Route path="/admin" element={
            <Suspense fallback={
              <div className="min-h-screen bg-slate-100 pt-32 text-center font-body text-sm text-slate-400">
                Loading…
              </div>
            }>
              <Admin />
            </Suspense>
          } />

          {/* Main public site — with Navbar + Footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <ScrollToTop />
              <Routes>
                <Route path="/"             element={<Home />}         />
                <Route path="/about"        element={<About />}        />
                <Route path="/programs"     element={<Programs />}     />
                <Route path="/admissions"   element={<Admissions />}   />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/donate"       element={<Donate />}       />
                <Route path="/news"         element={<News />}         />
                <Route path="/calendar"     element={<Calendar />}     />
                <Route path="/downloads"    element={<Downloads />}    />
                <Route path="/gallery"      element={<Gallery />}      />
                <Route path="/contact"      element={<Contact />}      />
                <Route path="/privacy"      element={<Privacy />}      />
                <Route path="/terms"        element={<Terms />}        />
                <Route path="*"             element={<NotFound />}     />
              </Routes>
              <WhatsAppButton />
              <Footer />
            </>
          } />

        </Routes>
      </BrowserRouter>
      </CampusProvider>
    </AuthProvider>
    // </ThemeProvider>
  )
}

export default App
