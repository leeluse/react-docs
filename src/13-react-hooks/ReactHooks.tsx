import ReactUseCallback from './ReactUseCallback'
import ReactUseEffect from './ReactUseEffect'
import ReactUseMemo from './ReactUseMemo'
import ReactUseRef from './ReactUseRef'
import ReactUseState from './ReactUseState'

export default function ReactHooks() {
  return (
    <div className="text-base-text flex flex-col gap-6 py-6">
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
          # 13. React Hooks
        </h1>
        <ReactUseState />
        <ReactUseEffect />
        <ReactUseMemo />
        <ReactUseCallback />
        <ReactUseRef />
      </section>
    </div>
  )
}
