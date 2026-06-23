import { useNavigate } from 'react-router-dom'
import { NAV } from '../constants/nav'

export default function SideBar() {

    return (
        <article className='w-56 min-w-56 border-r border-base-border/30 py-6 px-4 flex flex-col h-full bg-base-bg sticky top-0'>
            <div>
                <h3 className='py-8 font-black text-base-heading tracking-wider text-sm text-center border-b border-base-border/20 mb-6'>
                    REACT JS DOCS
                </h3>
                <SidebarItem />
            </div>
        </article >
    )
}

function SidebarItem() {
    const nav = useNavigate()
    const onClick = (id: string) => {
        nav(`/${id}`)
    }

    return (
        <ul className='flex flex-col gap-2'>
            {NAV.map((item) =>
                <li
                    key={item.id}
                    onClick={() => onClick(item.id)}
                    className='text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-primary hover:bg-primary-bg/50 cursor-pointer py-2 px-4 rounded-lg transition-all duration-200 hover:translate-x-1'
                >
                    <p className='w-full'>{item.title}</p>
                </li>
            )}
        </ul>
    )
}