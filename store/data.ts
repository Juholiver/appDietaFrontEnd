import { create } from 'zustand';

export type User = {
    name: string;
    weight: string;
    height: string;
    age: string;
    level: string;
    objective: string;
    gender: string;
}

type DataState = {
    user: User;
    setPageOne: (data: Omit<User, 'level' | 'objective' | 'gender'>) => void;
    setPageTwo: (data: Pick<User, 'level' | 'objective' | 'gender'>) => void;
}


export const useDataStore = create<DataState>((set) => ({
    user: {
        name: '',
        weight: '',
        height: '',
        age: '',
        level: '',
        objective: '',
        gender: '',
    },
    setPageOne: (data) => set((state)=> ({user: {...state.user, ...data}})),
    setPageTwo: (data) => set((state)=> ({user: {...state.user, ...data}})),
}))
