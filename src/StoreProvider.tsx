import {useState, FC, ReactElement, createContext} from 'react';


interface OperationObj {
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
}

interface StoreProviderProps {
    children: ReactElement;
}

const defaultStoreContextValue = {} as StoreContextState;

export const StoreContext = createContext(defaultStoreContextValue);

export const StoreProvider: FC<StoreProviderProps> = ({children}) => {
    const [username, setUsername] = useState('');
    const [operation, setOperation] = useState<OperationObj[]>([]);

    return (
        <StoreContext.Provider value={{username, setUsername, operation, setOperation}}>
            {children}
        </StoreContext.Provider>
    );
}
