import './ui.css'

// variant: 'primary' (dark), 'gold', 'outline'
function Button({ variant = 'primary', full = false, className = '', children, ...props }) {
  const classes = `btn btn-${variant}${full ? ' btn-full' : ''} ${className}`
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button