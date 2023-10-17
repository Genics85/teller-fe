import React from "react"

type TextInputFieldProps = {
    placeholder:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    value:string,
    type?:string
}

function TextInputField({placeholder,onChange,value,type="text"}:TextInputFieldProps) {
    

  return (
    <input required  value={value} placeholder={placeholder} onChange={onChange} className="p-3 bg-gray-100 rounded-md h-8" type={type} />
  )
}

export default TextInputField