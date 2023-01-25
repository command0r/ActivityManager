// Store for all state 'stores'
import ActivityStore from "./activityStore";
import {createContext, useContext} from "react";

interface Store {
    activityStore: ActivityStore
}

// Exporting store context
export const store: Store = {
    activityStore: new ActivityStore()
}

// Create React context
export const StoreContext = createContext(store);

// Use store inside other components (a hook that'll return store context)
export function useStore() {
    return useContext(StoreContext);
}