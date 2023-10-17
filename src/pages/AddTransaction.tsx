import React, { useState, useEffect } from "react";
import TextInputField from "../components/InputField";
import Button from "../components/Button";
import axios from "../api/axios";

type TellerType = {
  type: string;
  amount: number;
  accountNumber: string;
  tellerId: number;
};
const INITIAL_VALUE: TellerType = {
  type: "",
  accountNumber: "",
  tellerId: 0,
  amount: 0,
};
function AddTransaction() {
  const id = sessionStorage.getItem("teller-id");

  const [data, setData] = useState<TellerType>(INITIAL_VALUE);
  const updateFields = (field: Partial<TellerType>) => {
    setData((prev) => {
      return { ...prev, ...field };
    });
  };

  useEffect(() => {

    if (id) {
      updateFields({ tellerId: parseInt(id ?? "") });
    }
  }, [id]);

  const cleanUp = () => {
    updateFields({
      accountNumber: "",
      amount: 0,
    });
  };

  const makeTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response = await axios.put(`/api/account`, data);

      if (response.data) {
        alert(
          `Transaction successful, ${data.type} of an amount of ${data.amount} on account ${response?.data?.accountNumber}`
        );
        cleanUp();
      } else {
        alert("Failed transaction");
      }
    } catch (e) {
      alert("Failed transaction");
    }
  };

  return (
    <div className="flex gap-5 flex-col items-center justify-center w-full h-full">
      <h3 className="font-bold text-3xl">Make transaction</h3>
      <form onSubmit={makeTransaction} className="flex flex-col gap-4">
        <select
          className="p-2 rounded-md"
          value={data.type}
          onChange={(e) => updateFields({ type: e.target.value })}
        >
          <option value="">Select type</option>
          <option value="DEPOSIT">DEPOSIT</option>
          <option value="WITHDRAWAL">WITHDRAWAL</option>
        </select>
        <TextInputField
          placeholder="Enter account number"
          value={data.accountNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFields({ accountNumber: e.target.value })
          }
        />
        <TextInputField
          type="number"
          placeholder="Enter amount"
          value={data.amount.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFields({ amount: parseInt(e.target.value) })
          }
        />
        <Button />
      </form>
    </div>
  );
}

export default AddTransaction;
