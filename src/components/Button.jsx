const variants = {
  primary: 'bg-mosai-red hover:bg-mosai-red-dark text-white',
  secondary: 'bg-mosai-blue-dark hover:bg-mosai-blue text-white',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-mosai-blue-dark',
  outlineBlue: 'border-2 border-mosai-blue text-mosai-blue hover:bg-mosai-blue hover:text-white',
}

export default function Button({ variant = 'primary', children, className = '', ...props }) {
  return (
    <button
      className={`font-heading font-bold px-6 py-3 rounded-full transition-all duration-200 cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
