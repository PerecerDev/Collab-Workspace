import { Outlet } from 'react-router-dom';

import { WorkspaceSidebar } from '@/features/workspace/components/WorkspaceSidebar';

export function WorkspaceLayout() {
  return (
    <div className="flex flex-1">
      <WorkspaceSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
