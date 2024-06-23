interface Props {
  option: string
  checked: boolean
  children: React.ReactNode
  name: string
  onChange: () => void
}

export function Checkbox({ option, checked, name, children, onChange }: Props) {
  return (
    <div>
      <input
        type="checkbox"
        id={option}
        name={name}
        value={option}
        checked={checked}
        onChange={(e) => {
          if (e.target.value) {
            onChange()
          }
        }}
      />
      <label htmlFor={option}>{children}</label>
    </div>
  )
}
