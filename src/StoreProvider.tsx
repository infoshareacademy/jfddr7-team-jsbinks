import {useState, FC, ReactElement, createContext} from 'react';
import { Incomes, Expenses } from './constants/categories';
import { Category } from './types';


export interface OperationObj {
    id: string,
    amount: number,
    category: string,
    type: string,
    date: string,
}

interface StoreContextState {
    username: string;
    setUsername: (username: string) => void;
    operation: OperationObj[];
    setOperation: (operation: OperationObj[]) => void;
    incomeCategories: Category[];
    expenseCategories: Category[];
}

interface StoreProviderProps {
    children: ReactElement;
}

const defaultStoreContextValue = {
    incomeCategories: Incomes,
    expenseCategories: Expenses,
} as StoreContextState;

export const StoreContext = createContext(defaultStoreContextValue);

export const StoreProvider: FC<StoreProviderProps> = ({children}) => {
    const [username, setUsername] = useState('');
    const [operation, setOperation] = useState<OperationObj[]>([]);
    const incomeCategories = Incomes;
    const expenseCategories = Expenses;

    return (
        <StoreContext.Provider value={{username, setUsername, operation, setOperation, incomeCategories, expenseCategories}}>
            {children}
        </StoreContext.Provider>
    );
}
