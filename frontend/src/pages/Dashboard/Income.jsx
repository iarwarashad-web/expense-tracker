import GoBack from "../components/GoBack";
import DashboardLayout from "../../layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPath";
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import IncomeLineChart from "../components/IncomeBarChart";
import React from "react";
import axiosInstance from "../../utils/axioxInstance";
import { MdWork } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import AddIncome from '../components/AddIncome'

import InfoCard from "../components/InfoCard";
export default function Income() {
  const [loading, setLoading] = React.useState(false);
  const [allIncome, setAllIncome] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);

  async function fetchIncome() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_INCOME}`);
      setAllIncome(response.data.data); // Make sure to access `.data` inside `.data`
      console.log(response.data.data);
    } catch (error) {
      console.error(`Error fetching all income: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchIncome();
  }, []);
async function addIncomeHandle(income) {
  try {
    setLoading(true)
    const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, income);
    toast.success('Income added successfully');
    setShowForm(false);           // hide form
    fetchIncome();                // refresh the list
  } catch (error) {
    console.log(error);
    toast.error('Failed to add income');
  }
  finally{setLoading(false)}
}

async function deleteIncome(id) {
   
    try {
        setLoading(true)
      const response = await axiosInstance.delete(`${API_PATHS.INCOME.DELETE_INCOME}/${id}`);

        if (response) {
            toast.success('income deleted successfully')
            fetchIncome();
        }
    } catch (error) {
          console.error("Failed to delete income:", error);
    toast.error("Failed to delete income");
    } finally{setLoading(false)}
}
  return (
    <DashboardLayout>
        <GoBack />
      <h1 className="text-2xl font-bold mb-4">Income</h1>

      {loading && <p>Loading...</p>}

      {!loading && allIncome.length === 0 && <p>No income records found.</p>}

      {!loading && allIncome.length > 0 && (
        <ul className="space-y-2">
          {allIncome.map((item) => (
            <li key={item._id} >
                <InfoCard
                label={item.source}
                value={item.amount}
                color="green"
                icon={<MdWork/>}
                date={item.date}
                deleteIcon={<MdDelete/>}
                deleteItem={()=>deleteIncome(item._id)}
                />
           
            
            </li>
          ))}
        </ul>
      )}
<div className="flex justify-end">

     <button   onClick={() => setShowForm(!showForm)} className="align-end hover:bg-purple-600 px-2 py-3 rounded-md bg-purple-800 text-white cursor-pointer"><IoAddCircle className="inline mr-1 align-center text-lg"/>{showForm?"Close the form":'Add new Income' }</button>
</div>
     {showForm && <AddIncome  addIncomeHandle={addIncomeHandle}/>}
<IncomeLineChart allIncome={allIncome} />

    </DashboardLayout>
  );
}
