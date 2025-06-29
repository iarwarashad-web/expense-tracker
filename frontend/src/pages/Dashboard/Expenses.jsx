import React from "react";
import GoBack from "../components/GoBack";
import DashboardLayout from "../../layouts/DashboardLayout";
import axiosInstance from "../../utils/axioxInstance";
import { API_PATHS } from "../../utils/apiPath";
import { toast } from "react-toastify";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import AddExpensesForm from "../components/AddExpenses";
import InfoCard from "../components/InfoCard";
export default function Expense(second) {
    const [loading, setLoading] = React.useState(false)
    const [allExpenses, setAllExpenses] = React.useState([])
    const [formShow, setShowForm] = React.useState(false)

    function fromToggle(params) {
        setShowForm(prev => !prev)
    }



    async  function fetchExpenses(){
    try {
        setLoading(true)
        const response = await axiosInstance.get(API_PATHS.EXPENSES.GET_EXPENSES)
        setAllExpenses(response.data.data)
    //   console.log(allExpenses)
    } catch (error) {
        console.log('error fetching expenses', error)
      
    }finally{
        setLoading(false)
    }
    } 
       
 
 React.useEffect(() => {
    fetchExpenses();
  }, []);
    
async function addExpensesHandle(expenses) {
  try {
    setLoading(true);
    const response = await axiosInstance.post(API_PATHS.EXPENSES.ADD_EXPENSES, expenses);
    toast.success("Expense added successfully");
   fetchExpenses(); // refresh list
    setShowForm(false); // optionally hide form
  } catch (error) {
    console.error("Failed to add expense", error);
    toast.error("Failed to add expense");
  } finally {
    setLoading(false);
  }
}


    React.useEffect(() => {
  console.log("Updated expenses:", allExpenses);
}, [allExpenses]);

async function deleteExpenses(id) {
    try {
        const response = await axiosInstance.delete(API_PATHS.EXPENSES.DELETE_EXPENSES+'/'+id)
        fetchExpenses()
    } catch (error) {
        console.error('error deleteing expenses', error)
    }
}

    return (
        <DashboardLayout>
            <GoBack />
            <h1 className="text-4xl">Expenses</h1>
            
            {allExpenses.length?
                allExpenses.map((item, key)=>(
                    <InfoCard
                      key={item._id || key}
                    icon={<FaMoneyBillTransfer />}
                     color="red"
                     value={item.amount}
                       label={item.category}
                       date={item.date}
                       deleteIcon={<MdDelete/>}
                       deleteItem={()=>deleteExpenses(item._id)}
                        
                    />
                )) : <p>No expenses to show</p>
            }
         <div className="flex justify-end">   <button onClick={fromToggle} className="align-end hover:bg-purple-600 px-2 py-3 rounded-md bg-purple-800 text-white cursor-pointer">Add new expense</button>
      </div>
      {formShow&& <AddExpensesForm  addExpensesHandle={addExpensesHandle}/>}
        </DashboardLayout>
    );

}