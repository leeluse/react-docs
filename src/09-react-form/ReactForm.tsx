import { useState, useRef } from 'react'
import CodeBlock from '../components/CodeBlock'

export default function ReactForm() {
  const [activeTab, setActiveTab] = useState<'controlled' | 'uncontrolled'>('controlled')

  return (
    <section className="flex flex-col gap-10 py-6 text-base-text">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-base-heading border-b border-base-border/30 pb-4 mb-6">
        # React Form
      </h1>

      <article className="flex flex-col gap-2">
        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">React에서의 폼(Form)</h3>
        <div className="border-l-4 border-primary pl-4 py-1.5 bg-primary-bg/10 rounded-r-lg">
          <p className="leading-relaxed text-sm sm:text-base">
            HTML에서의 폼 요소(input, select, textarea 등)는 자체적으로 내부 상태(state)를 관리하고
            사용자의 입력에 따라 상태를 업데이트합니다.
            <br />
            React에서는 이 내부 상태를 React 컴포넌트의 <strong>state</strong>로 관리할 수도
            있고(제어 컴포넌트), DOM 요소의 <strong>ref</strong>를 통해 직접 DOM 값에 접근할 수도
            있습니다(비제어 컴포넌트).
          </p>
        </div>
      </article>

      {/* Tab UI to toggle between Controlled and Uncontrolled Components */}
      <div className="flex border-b border-base-border/30 gap-2">
        <button
          onClick={() => setActiveTab('controlled')}
          className={`px-4 py-2 font-bold text-sm sm:text-base cursor-pointer transition-colors duration-200 border-b-2 -mb-0.5 ${
            activeTab === 'controlled'
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-500 hover:text-base-heading'
          }`}
        >
          제어 컴포넌트 (Controlled)
        </button>
        <button
          onClick={() => setActiveTab('uncontrolled')}
          className={`px-4 py-2 font-bold text-sm sm:text-base cursor-pointer transition-colors duration-200 border-b-2 -mb-0.5 ${
            activeTab === 'uncontrolled'
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-500 hover:text-base-heading'
          }`}
        >
          비제어 컴포넌트 (Uncontrolled)
        </button>
      </div>

      {activeTab === 'controlled' ? <ControlledDemo /> : <UncontrolledDemo />}
    </section>
  )
}

function ControlledDemo() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'developer',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // 실시간 간단 유효성 검사
    if (name === 'username') {
      if (value.length < 3) {
        setErrors((prev) => ({ ...prev, username: '이름은 최소 3자 이상이어야 합니다.' }))
      } else {
        setErrors((prev) => {
          const next = { ...prev }
          delete next.username
          return next
        })
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }))
      } else {
        setErrors((prev) => {
          const next = { ...prev }
          delete next.email
          return next
        })
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.keys(errors).length === 0 && formData.username && formData.email) {
      setSubmittedData(formData)
    } else {
      alert('폼 데이터를 확인해주세요.')
    }
  }

  const codeString = `
import { useState } from 'react'

export default function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'developer'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('서밋된 데이터:', formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
      />
      <input 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
      />
      <button type="submit">제출</button>
    </form>
  )
}
  `

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h4 className="text-lg sm:text-xl font-bold text-base-heading">제어 컴포넌트란?</h4>
        <p className="leading-relaxed text-sm sm:text-base">
          React가 폼 입력 요소의 값을 제어하는 방식입니다. 입력 폼의 값은 컴포넌트의{' '}
          <code>state</code>에 저장되며, 사용자가 입력을 바꿀 때마다 <code>onChange</code> 이벤트를
          감지하여 state를 실시간으로 업데이트합니다.
        </p>
        <ul className="list-disc list-inside text-sm sm:text-base flex flex-col gap-1 text-slate-400">
          <li>입력값 검증(Validation) 및 피드백 제공이 실시간으로 가능합니다.</li>
          <li>
            특정 조건에 맞춰 입력 데이터를 강제로 포맷팅(예: 전화번호 하이픈 자동 삽입)할 때
            유용합니다.
          </li>
          <li>입력이 변경될 때마다 컴포넌트가 리렌더링됩니다.</li>
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 실습 UI 폼 */}
        <div className="flex-1 rounded-xl border border-base-border/50 p-6 bg-black/5 dark:bg-white/5 flex flex-col gap-4">
          <h5 className="font-bold text-base-heading text-lg">실시간 제어 폼 실습</h5>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-400">사용자 이름</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="이름 입력 (3자 이상)"
                className="w-full px-4 py-2 rounded-lg border border-base-border bg-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
              />
              {errors.username && (
                <span className="text-xs text-red-500 font-semibold">{errors.username}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-400">이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full px-4 py-2 rounded-lg border border-base-border bg-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-semibold">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-400">역할</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-base-border bg-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base text-base-text dark:bg-zinc-800"
              >
                <option value="developer" className="dark:bg-zinc-800">
                  개발자
                </option>
                <option value="designer" className="dark:bg-zinc-800">
                  디자이너
                </option>
                <option value="pm" className="dark:bg-zinc-800">
                  기획자
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm sm:text-base cursor-pointer shadow-md shadow-primary/20 transition-all"
            >
              폼 데이터 제출
            </button>
          </form>

          {submittedData && (
            <div className="mt-4 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex flex-col gap-1.5 text-xs sm:text-sm">
              <div className="font-bold mb-1">제출 성공! (State 데이터)</div>
              <div>• 이름: {submittedData.username}</div>
              <div>• 이메일: {submittedData.email}</div>
              <div>• 역할: {submittedData.role}</div>
            </div>
          )}
        </div>

        {/* 설명 코드블록 */}
        <div className="flex-1 min-w-0">
          <CodeBlock content={codeString} />
        </div>
      </div>
    </div>
  )
}

function UncontrolledDemo() {
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const roleRef = useRef<HTMLSelectElement>(null)
  const [submittedData, setSubmittedData] = useState<{
    username: string
    email: string
    role: string
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const username = usernameRef.current?.value || ''
    const email = emailRef.current?.value || ''
    const role = roleRef.current?.value || ''

    if (!username || !email) {
      alert('필드들을 빠짐없이 입력해주세요.')
      return
    }

    setSubmittedData({ username, email, role })
  }

  const codeString = `
import { useRef } from 'react'

export default function UncontrolledForm() {
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const roleRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('서밋된 데이터:', {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={usernameRef} />
      <input ref={emailRef} />
      <select ref={roleRef}>
        <option value="developer">개발자</option>
      </select>
      <button type="submit">제출</button>
    </form>
  )
}
  `

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h4 className="text-lg sm:text-xl font-bold text-base-heading">비제어 컴포넌트란?</h4>
        <p className="leading-relaxed text-sm sm:text-base">
          React가 폼의 값을 강제 제어하지 않고, DOM 자체에서 폼 데이터를 관리하는 방식입니다.
          컴포넌트는 입력값의 상태 변화를 실시간 추적하지 않고, <code>useRef</code>를 활용해 필요할
          때(예: 제출 시점) DOM으로부터 직접 값을 조회합니다.
        </p>
        <ul className="list-disc list-inside text-sm sm:text-base flex flex-col gap-1 text-slate-400">
          <li>
            사용자 입력 시마다 매번 컴포넌트가 리렌더링되지 않으므로 성능상 유리할 수 있습니다.
          </li>
          <li>폼 제출 순간에만 데이터가 필요할 때 코드가 매우 간단해집니다.</li>
          <li>
            실시간 유효성 검사, 조건별 입력 제한 또는 동적 UI 변화를 주는 폼에는 적합하지 않습니다.
          </li>
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 실습 UI 폼 */}
        <div className="flex-1 rounded-xl border border-base-border/50 p-6 bg-black/5 dark:bg-white/5 flex flex-col gap-4">
          <h5 className="font-bold text-base-heading text-lg">비제어 폼 실습 (Ref 활용)</h5>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-400">사용자 이름</label>
              <input
                type="text"
                ref={usernameRef}
                placeholder="이름 입력"
                className="w-full px-4 py-2 rounded-lg border border-base-border bg-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-400">이메일</label>
              <input
                type="email"
                ref={emailRef}
                placeholder="example@email.com"
                className="w-full px-4 py-2 rounded-lg border border-base-border bg-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-400">역할</label>
              <select
                ref={roleRef}
                defaultValue="developer"
                className="w-full px-4 py-2 rounded-lg border border-base-border bg-transparent outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base text-base-text dark:bg-zinc-800"
              >
                <option value="developer" className="dark:bg-zinc-800">
                  개발자
                </option>
                <option value="designer" className="dark:bg-zinc-800">
                  디자이너
                </option>
                <option value="pm" className="dark:bg-zinc-800">
                  기획자
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm sm:text-base cursor-pointer shadow-md shadow-primary/20 transition-all"
            >
              제출 시점에 DOM에서 값 조회하기
            </button>
          </form>

          {submittedData && (
            <div className="mt-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex flex-col gap-1.5 text-xs sm:text-sm">
              <div className="font-bold mb-1">제출 성공! (Ref 직접 조회 데이터)</div>
              <div>• 이름: {submittedData.username}</div>
              <div>• 이메일: {submittedData.email}</div>
              <div>• 역할: {submittedData.role}</div>
            </div>
          )}
        </div>

        {/* 설명 코드블록 */}
        <div className="flex-1 min-w-0">
          <CodeBlock content={codeString} />
        </div>
      </div>
    </div>
  )
}
