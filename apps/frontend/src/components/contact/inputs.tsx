export function TextInput({
  label,
  name,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div className="w-full rounded-md bg-transparent px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-teal-200 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-yellow-500">
      <label htmlFor={name} className="block text-xs font-medium text-teal-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...rest}
        className="block w-full text-white placeholder:text-teal-500 focus:outline-none sm:text-sm/6 bg-transparent"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export function CheckboxInput({
  label,
  name,
  description,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
  error?: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-6 shrink-0 items-center">
        <div className="group grid size-4 grid-cols-1">
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={rest.checked}
            {...rest}
            aria-describedby={`${name}-description`}
            className="col-start-1 row-start-1 appearance-none rounded-sm border border-teal-200 bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:border-slate-300 disabled:bg-slate-100 disabled:checked:bg-slate-100 forced-colors:appearance-auto"
          />
          <svg
            fill="none"
            viewBox="0 0 14 14"
            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25 dark:group-has-disabled:stroke-white/25"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-checked:opacity-100"
            />
            <path
              d="M3 7H11"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-indeterminate:opacity-100"
            />
          </svg>
        </div>
      </div>
      <div className="text-sm/6">
        <label htmlFor={name} className="font-medium text-white">
          {label}
        </label>{' '}
        <span id={`${name}-description`} className="text-teal-100">
          <span className="sr-only">{label} </span>
          {description}
        </span>
      </div>
    </div>
  );
}
