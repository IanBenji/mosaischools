import { useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'

/* A lightweight, self-contained "are you human?" check — a small sum the visitor
 * answers. No third-party service or site key (unlike hCaptcha/reCAPTCHA), so it
 * always works and adds no external requests. Parent tracks the boolean:
 *   const [ok, setOk] = useState(false)
 *   <SimpleCaptcha onChange={setOk} error={errs.captcha} seed={resetCount} />
 */
const rnd = () => 1 + Math.floor(Math.random() * 8)

export default function SimpleCaptcha({ onChange, error, seed = 0 }) {
  const [a, b] = useMemo(() => {
    void seed          // regenerate the sum whenever the parent bumps `seed`
    return [rnd(), rnd()]
  }, [seed])
  const [val, setVal] = useState('')
  const solved = val !== '' && Number(val) === a + b

  function handle(e) {
    const v = e.target.value.replace(/[^\d]/g, '').slice(0, 2)
    setVal(v)
    onChange(Number(v) === a + b)
  }

  return (
    <div>
      <label className="block font-body text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Quick check: are you human?<span className="text-mosai-red ml-0.5">*</span>
      </label>
      <div className="flex items-center gap-3">
        <span className="font-heading font-extrabold text-mosai-blue-dark text-lg bg-mosai-blue-light rounded-xl px-4 py-2.5 select-none whitespace-nowrap">
          {a} + {b} =
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={val}
          onChange={handle}
          aria-label={`What is ${a} plus ${b}?`}
          placeholder="?"
          className={`w-20 text-center px-3 py-3 rounded-xl border text-base font-heading font-bold bg-gray-50 focus:bg-white transition-all focus:outline-none focus:ring-2 ${
            error ? 'border-red-300 focus:ring-red-100'
            : solved ? 'border-green-300 focus:ring-green-100'
            : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
          }`}
        />
        {solved
          ? <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
          : <RefreshCw className="w-4 h-4 text-gray-300 shrink-0" aria-hidden />}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5 font-body">
          <AlertCircle className="w-3 h-3" />{error}
        </p>
      )}
    </div>
  )
}
