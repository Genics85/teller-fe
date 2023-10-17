import React,{useState} from "react";
import TextInputField from "../components/InputField";
import Button from "../components/Button";
import axios from "../api/axios";

type TellerType = {
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    password:string,
}
const INITIAL_VALUE:TellerType = {
    firstName:"",
    lastName:"",
    phoneNumber:"",
    email:"",
    password:""
}

function AddTeller() {
  const [data, setData] = useState<TellerType>(INITIAL_VALUE);
  const updateFields = (field: Partial<TellerType>) => {
    setData((prev) => {
      return { ...prev, ...field };
    });
  };

  const cleanUp = ()=>{
    updateFields({
      firstName:"",
      lastName:"",
      phoneNumber:"",
      email:"",
      password:""
    })
}

  const addTeller = async (e:React.FormEvent) => {
    e.preventDefault()
    try{

        let response = await axios.post(`/api/teller`,data)

        console.log("response",response)
        if(response.data){
            alert(`Teller created with success`)
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
      <h3 className="font-bold text-3xl">Teller Sign Up</h3>
      <form onSubmit={addTeller} className="flex flex-col gap-4">
        <TextInputField
          placeholder="Enter first name"
          value={data.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFields({ firstName: e.target.value })
          }
        />
        <TextInputField
          placeholder="Enter last name"
          value={data.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFields({ lastName: e.target.value })
          }
        />
        <TextInputField
          placeholder="Enter email"
          value={data.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFields({ email: e.target.value })
          }
        />
        <TextInputField
          placeholder="Enter phone number"
          value={data.phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFields({ phoneNumber: e.target.value })
          }
        />
        <TextInputField
          placeholder="Enter address"
          value={data.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFields({ password: e.target.value })
          }
        />
        <Button/>
    
      </form>
    </div>
  );
}

export default AddTeller;
