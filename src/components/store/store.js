import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useStore = create(
    persist((set) => ({
        productdetails: '', // initial value
        setProductDetails: (productdetails) => set({ productdetails }),
    }), {
        name: 'statedata',
    })
);