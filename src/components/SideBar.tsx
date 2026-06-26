import { useNavigate, useParams } from 'react-router-dom'
import { NAV } from '../constants/nav'
import { useState } from 'react'
import { Arrow } from '../05-life-cycle/LifeCycle'

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true)

  if (isOpen) {
    return (
      <article
        className={`w-56 min-w-56 border-r border-base-border/30 py-6 px-4 flex flex-col h-full bg-base-bg sticky top-0`}
      >
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? 'rotate-90' : 'rotate-90'} absolute right-0 text-white transition duration-200`}
          >
            <Arrow />
          </button>
          <h3 className="py-8 font-black text-base-heading tracking-wider text-xs sm:text-sm text-center border-b border-base-border/20 mb-6">
            LEELUSE REACT DOCS
          </h3>
          <SidebarItem />
        </div>
      </article>
    )
  } else {
    return (
      <article
        className={`w-fit border-r border-base-border/30 py-6 px-4 flex flex-col h-full bg-base-bg sticky top-0`}
      >
        <div className="relative flex items-center w-fit" onClick={() => setIsOpen(!isOpen)}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? 'rotate-90' : 'rotate-270'} text-white w-fit transition duration-200`}
          >
            <Arrow />
          </button>
        </div>
      </article>
    )
  }
}

function SidebarItem() {
  const nav = useNavigate()
  const paramsId = useParams().id

  const onClick = (id: string) => {
    nav(`/${id}`)
  }

  return (
    <ul className="flex flex-col gap-2">
      {NAV.map((item) => (
        <li
          key={item.id}
          onClick={() => onClick(item.id)}
          className={`${String(item.id) === String(paramsId) ? 'text-primary bg-primary-bg/50' : 'transition-all duration-200 hover:translate-x-1 text-slate-600 dark:text-zinc-400 hover:text-primary hover:bg-primary-bg/50'} text-[11px] sm:text-xs font-semibold cursor-pointer py-2 px-4 rounded-lg`}
        >
          <p className="w-full">{item.title}</p>
        </li>
      ))}
    </ul>
  )
}
