import { useNavigate, useParams } from 'react-router-dom'
import { NAV } from '../constants/nav'

interface SideBarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isSub: boolean
  setIsSub: (open: boolean) => void
}

export default function SideBar({ isOpen, setIsOpen, isSub, setIsSub }: SideBarProps) {
  const nav = useNavigate()
  const { id: paramsId, subId: paramsSubId } = useParams()

  const onClick = (type: string, id: string) => {
    if (type === 'MAIN') {
      const selectedItem = NAV.find((i) => i.id === id)
      if (selectedItem && selectedItem.sub.length > 0) {
        setIsSub(paramsId === id ? !isSub : true)
      } else {
        setIsSub(false)
      }
      nav(`/${id}`)
      setIsOpen(false) // Close drawer on selection for mobile view
    }
  }

  return (
    <>
      {/* Mobile Dark Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 md:sticky md:z-0 flex flex-col w-60 border-r border-base-border/30 bg-base-bg transition-transform duration-300 ease-in-out py-6 px-4 h-full shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="relative h-full flex flex-col">
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-0 p-2 text-base-text hover:bg-primary-bg/50 rounded md:hidden focus:outline-none"
            aria-label="Close Sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h3 className="pt-4 pb-6 font-black text-base-heading tracking-wider text-sm text-center border-b border-base-border/20 mb-6">
            LEELUSE REACT DOCS
          </h3>

          <nav className="flex-1 overflow-y-auto no-scrollbar">
            <ul className="flex flex-col gap-1.5">
              {NAV.map((item) => {
                const isActive = String(item.id) === String(paramsId)
                return (
                  <li
                    key={item.id}
                    onClick={() => onClick('MAIN', item.id)}
                    className={`py-2 px-3.5 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-200 
                      ${
                        isActive
                          ? 'text-primary bg-primary-bg/80 border-primary pl-2.5'
                          : 'text-slate-600 dark:text-zinc-400 hover:text-primary hover:bg-primary-bg/40 hover:translate-x-1'
                      }
                    `}
                  >
                    <p className="w-full">{item.title}</p>
                    {isSub && isActive && (
                      <ul
                        className="w-full p-2 flex flex-col gap-1 "
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.sub.map((subItem) => {
                          const isSubActive = subItem === paramsSubId
                          return (
                            <li key={subItem}>
                              <button
                                onClick={() => {
                                  nav(`/${item.id}/${subItem}`)
                                  setIsOpen(false)
                                }}
                                className={`block w-full text-left py-1 text-xs transition-colors font-medium cursor-pointer
                                  ${
                                    isSubActive
                                      ? 'text-primary font-bold'
                                      : 'text-slate-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary'
                                  }
                                `}
                              >
                                {subItem === 'rules-of-hooks'
                                  ? 'Hook 심화'
                                  : subItem.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}
