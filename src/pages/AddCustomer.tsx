import axios from "../api/axios"
import Button from "../components/Button"
import TextInputField from "../components/InputField"
import React,{useState} from "react"

type CustomerType = {
    firstName:string,
    lastName:string,
    phoneNumber:string,
    dateOfBirth:string,
    address:string,
    email:string
}
const INITIAL_VALUE:CustomerType = {
    firstName:"",
    lastName:"",
    phoneNumber:"",
    dateOfBirth:"",
    address:"",
    email:""
}

function AddCustomer() {
    const[data,setData] = useState<CustomerType>(INITIAL_VALUE)
    const updateFields = (field:Partial<CustomerType>)=>{
        setData((prev)=>{
            return {...prev,...field}
        })
    }

    const cleanUp = ()=>{
        updateFields({
            firstName:"",
            lastName:"",
            phoneNumber:"",
            dateOfBirth:"",
            address:"",
            email:""
        })
    }

    const addCustomer = async (e:React.FormEvent) => {
        e.preventDefault()
        try{

            let response = await axios.post(`/api/customer`,data)
    
            if(response.data){
                alert(`Customer created: Ac no: ${response?.data?.accountNumber} `)
                cleanUp()
            }else{
                alert("Error: Check your email and retry")
            }
        }catch(e){
            alert("Request failed, check your email and retry")
        }
      };

    
  return (
    <div className="flex gap-5 flex-col items-center justify-center w-full h-full">
        <h3 className="font-bold text-3xl">Add a customer</h3>
        <form onSubmit={addCustomer} className="flex flex-col gap-4">
            <TextInputField placeholder="Enter first name" value={data.firstName} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>updateFields({firstName:e.target.value})}/>
            <TextInputField placeholder="Enter last name" value={data.lastName} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>updateFields({lastName:e.target.value})}/>
            <TextInputField placeholder="Enter email" value={data.email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>updateFields({email:e.target.value})}/>
            <TextInputField placeholder="Enter phone number" value={data.phoneNumber} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>updateFields({phoneNumber:e.target.value})}/>
            <TextInputField placeholder="Enter address" value={data.address} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>updateFields({address:e.target.value})}/>
            <input type="date" className="rounded-md p-1" value={data.dateOfBirth} onChange={(e)=>updateFields({dateOfBirth:e.target.value})} />
            <Button/>
        </form>
    </div>
  )
}

export default AddCustomer