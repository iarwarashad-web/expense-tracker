import { UserContext } from "../contexts/userContext"
import { useContext } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import React, { useState, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import axiosInstance from "../../utils/axioxInstance";
import { API_PATHS } from "../../utils/apiPath";
import { FaMoneyBill } from "react-icons/fa";
import { GiWallet, GiPayMoney } from "react-icons/gi"; // ✅ Make sure this line exists
import { MdDeleteForever } from "react-icons/md";
import IncomeExpensePieChart from '../components/IncomeExpensePieChart'
import { Link } from "react-router-dom";
export default function Home(second) {
    const { user } = useContext(UserContext);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchingData() {
        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)
            //  console.log(response.data.data)
            if (response.data.data) {
                setDashboardData(response.data.data);
                setLoading(false);
            }

        } catch (error) {
            console.error('something went wrong while fetching data:', error);
            setLoading(false);
        }
    }

    // ✅ Fetch data on component mount
    useEffect(() => {
        fetchingData();
    }, []);

    // ✅ Log when data updates
    useEffect(() => {
        console.log("✅ dashboardData updated:", dashboardData);
    }, [dashboardData]);
    //console.log("✅ ro updated:", dashboardData?.totalIncome);

    return (
        <DashboardLayout>
           
            <main className="">
                
                {loading && <p className="text-center">Loading...</p>}
                   {!loading && dashboardData.length === 0 && <p>No data to show.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoCard
                        label="Total Balance"
                        icon={<FaMoneyBill />}
                        value={dashboardData?.totaBalance || 0}
                        color="purple"
                    />

                    <InfoCard
                        label="Total Income"
                        icon={<GiWallet />}
                        value={dashboardData?.totalIncome || 0}
                        color="green"
                    />

                    <InfoCard
                        label="Total Expenses"
                        icon={<GiPayMoney />}
                        value={dashboardData?.totalExpenses || 0}
                        color="red"
                    
                    />

                </div>



                <div className="flex flex-col gap-4  my-6">
                    <h6 className="text-2xl  py-5 ">Recent Transacions</h6>
                    {dashboardData?.last5Transactions.length===0 &&<> <p>No transactions yet</p>
                    <Link className="bg-purple-800 p-1 rounded-md text-white w-40" to={'/income'}>Add Income</Link>
                    <Link className="bg-purple-800 p-1 rounded-md text-white w-40" to={'/expenses'}>Add Expenses</Link>
                   
                    </>
                    }
                    <div className="flex flex-col gap-4">
                        {dashboardData?.last5Transactions?.map((tx) => (

                            <div key={tx._id} className="  p-4 rounded-md shadow flex flex-col gap-2 shadow-md hover:scale-101 transition duration-300">
                                <div className="flex justify-between items-center">
                                <div> <p>Category: {tx.category}</p>
                                    <p className="text-gray-600">Date: {new Date(tx.date).toLocaleDateString()}</p>
                                </div>
                                <div className=""> {tx.type == "income" ? <span className="px-2 py-1 rounded-xl bg-green-600 text-white">Amount: +${tx.amount}</span> : <span className="px-2 py-1 rounded-xl bg-red-600 text-white">Amount: -${tx.amount}</span>
                                }  
                                </div>
                                </div>

                            </div>
                        ))}



                    </div>

                    <div className="shadow-lg rounded-md">
                <IncomeExpensePieChart
  totalExpenses={dashboardData?.totalExpenses || 0}
  totalIncome={dashboardData?.totalIncome || 0}
/>
</div>
                </div>
            </main>
        </DashboardLayout>
    )
}