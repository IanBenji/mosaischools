import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider }    from './context/AuthContext'
import Navbar              from './components/Navbar'
import Footer              from './components/Footer'
import CustomCursor        from './components/CustomCursor'
import ScrollToTop         from './components/ScrollToTop'
import ScrollRestoration   from './components/ScrollRestoration'

// Public pages
import Home       from './pages/Home'
import About      from './pages/About'
import Programs   from './pages/Programs'
import Admissions from './pages/Admissions'
import Gallery    from './pages/Gallery'
import Contact    from './pages/Contact'
import Privacy    from './pages/Privacy'
import Terms      from './pages/Terms'
import NotFound   from './pages/NotFound'

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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollRestoration />
        <CustomCursor />
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

          {/* Main public site — with Navbar + Footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <ScrollToTop />
              <Routes>
                <Route path="/"           element={<Home />}       />
                <Route path="/about"      element={<About />}      />
                <Route path="/programs"   element={<Programs />}   />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/gallery"    element={<Gallery />}    />
                <Route path="/contact"    element={<Contact />}    />
                <Route path="/privacy"    element={<Privacy />}    />
                <Route path="/terms"      element={<Terms />}      />
                <Route path="*"           element={<NotFound />}   />
              </Routes>
              <Footer />
            </>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
