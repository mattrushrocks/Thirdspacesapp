import { Outlet } from 'react-router';

export function Root() {
  return (
    <div className="notebook-texture min-h-screen">
      <Outlet />
    </div>
  );
}
