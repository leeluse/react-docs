import { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import SideBar from './components/SideBar'
import { NAV } from './constants/nav'

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { id } = useParams()
  const [isSub, setIsSub] = useState(() => {
    return (NAV.find((item) => item.id === id)?.sub.length ?? 0) > 0
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSub((NAV.find((item) => item.id === id)?.sub.length ?? 0) > 0)
  }, [id])

  return (
    <div className="flex h-screen w-full text-base-text bg-base-bg overflow-hidden relative">
      {/* Sidebar Navigation */}
      <SideBar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isSub={isSub}
        setIsSub={setIsSub}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Mobile Header Bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-base-border/30 bg-base-bg md:hidden shrink-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 rounded hover:bg-primary-bg/50 text-base-text focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="font-black text-sm text-base-heading tracking-wider">
            LEELUSE REACT DOCS
          </span>
          <div className="w-6 h-6"></div> {/* Spacer to center the title */}
        </header>
        <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-50/20 dark:bg-zinc-900/10 p-5 sm:p-8 md:p-12">
          <div className="max-w-4xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
