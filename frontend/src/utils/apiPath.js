import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";
import Login from "../pages/Auth/Login";
import Expenses from "../../../backend/models/Expenses";

export const BASE_URL = 'http://localhost:8000';

export const API_PATHS = {
    AUTH:{
        LOGIN: '/api/V1/auth/login',
        REGISTER: '/api/V1/auth/register',
       GET_USER_INFO: '/api/V1/auth/getUser',
    },
    DASHBOARD :{
        GET_DATA: '/api/V1/dashboard',
    },
    INCOME:{
        GET_INCOME: '/api/V1/income/get',
        ADD_INCOME: '/api/V1/income/add',
        DELETE_INCOME: `/api/V1/income`,
        
        DOWNLOAD_INCOME: '/api/V1/income/download',
    }, 
    EXPENSES:{
        GET_EXPENSES: '/api/V1/expenses/get',
        ADD_EXPENSES: '/api/V1/expenses/add',
        DELETE_EXPENSES: '/api/V1/expenses',
        DOWNLOAD_EXPENSES: '/api/V1/expenses/download',
    }
}
