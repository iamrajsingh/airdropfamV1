import React from 'react'

const Button = ({
    children,
    type = 'Button',
    bgColor = '',
    textColor = 'text-pale-blue',
    className = '',
    ...props
}) => {
  return (
    <button className= {`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor} active:scale-95 transition-all `} {...props}>
        {children}  
    </button>
  )
}

export default Button