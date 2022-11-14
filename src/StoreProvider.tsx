import {useState, FC, ReactElement, createContext} from 'react';

interface StoreContextState {
    username: string;
    setUsername: (username: string) => void;
    operation: {}[];
    setOperation: (operation: {}[]) => void;
}

interface StoreProviderProps {
    children: ReactElement;
}

const defaultStoreContextValue = {} as StoreContextState;

export const StoreContext = createContext(defaultStoreContextValue);

export const StoreProvider: FC<StoreProviderProps> = ({children}) => {
    const [username, setUsername] = useState('');
    const [operation, setOperation] = useState<{}[]>([]);

    return (
        <StoreContext.Provider value={{username, setUsername, operation, setOperation}}>
            {children}
        </StoreContext.Provider>
    );
}
