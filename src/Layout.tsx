import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';

export default function Layout() {

  return (
    <div className='flex h-screen w-full text-base-text bg-base-bg border-x border-base-border/30 shadow-sm'>
      <SideBar />
      <main className='max-w-7xl mx-auto flex-1 overflow-y-auto no-scrollbar bg-slate-50/20 dark:bg-zinc-900/10'>
        <Outlet />
      </main>
    </div>
  );
}
