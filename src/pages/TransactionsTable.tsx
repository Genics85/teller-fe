import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  let id = sessionStorage.getItem("teller-id");

  useEffect(() => {
    if (id) {
      id = sessionStorage.getItem("teller-id");
    }
  }, [id]);

  const getTransactions = async () => {
    try {
      let response = await axios.get(`/api/transaction/${id}`);

      if (response != null) {
        setTransactions(response?.data);
      } else {
        alert("Failed to fetch transactions");
      }
    } catch (e: any) {
      if (e?.response) {
        setTransactions(e?.response?.data);
        return;
      }
      alert("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);


  return (
    <div className=" relative overflow-x-auto  flex-1">
        <div className="text-3xl font-bold m-2"> Today's Transactions</div>
      <table className="w-full text-left text-gray-500 ">
        <thead className=" text-gray-700 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Transaction type
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-4 py-3">
              Account Number
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions?.map((transaction: any, i: number) => {
              return (
                <tr
                  key={i}
                  className=" border-b hover:bg-gray-50 hover:cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <div className="flex gap-3 items-center">
                      <p>{transaction?.transactionType}</p>
                    </div>
                  </th>
                  <td className="px-6 py-4">GHS {transaction?.amount}</td>
                  <td className="px-4 py-4">{transaction?.accountNumber}</td>

                  <td className="px-6 py-4">
                    {new Date(transaction?.date).toUTCString()}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
