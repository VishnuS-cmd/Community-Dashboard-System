import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { getToken } from './lib/api';
import { isAdmin } from './lib/auth';
import { AccessDeniedPage } from './pages/AccessDeniedPage';
import { AuditPage } from './pages/AuditPage';
import { DashboardPage } from './pages/DashboardPage';
import { DomainEntityPage } from './pages/DomainEntityPage';
import { EntityPage } from './pages/EntityPage';
import { LoginPage } from './pages/LoginPage';
import { RecordsPage } from './pages/RecordsPage';
import { ReportsPage } from './pages/ReportsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { projectConfig } from './project.config';

/**
 * AdminRoute — renders children for ADMIN, AccessDeniedPage for OPERATOR.
 * Unauthenticated users are redirected to /login (handled by ProtectedRoutes).
 */
function AdminRoute({ children }: { children: React.ReactNode }) {
  if (!isAdmin()) {
    return <AccessDeniedPage />;
  }
  return <>{children}</>;
}

function ProtectedRoutes() {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/categories" element={<EntityPage endpoint="categories" title="Categories" />} />
        <Route path="/departments" element={<EntityPage endpoint="departments" title="Departments" />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />

        {/* Admin-only routes — authenticated operators see the AccessDenied page */}
        <Route
          path="/reports"
          element={
            <AdminRoute>
              <ReportsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/audit-logs"
          element={
            <AdminRoute>
              <AuditPage />
            </AdminRoute>
          }
        />

        {/* Five community domain entity modules — accessible to ADMIN and OPERATOR */}
        {projectConfig.entities?.map((entity: any) => (
          <Route key={entity.route} path={entity.route} element={<DomainEntityPage entity={entity} />} />
        ))}

        {/* Workflow pages — accessible to ADMIN and OPERATOR */}
        {projectConfig.workflows?.map((workflow: any) => (
          <Route key={workflow.route} path={workflow.route} element={<WorkflowPage workflow={workflow} />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}
