import {makeAutoObservable, runInAction} from "mobx";
import {Activity} from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;
        
    constructor() {
        makeAutoObservable(this)
    }
    
    // 'Arrow' func, so that no need to worry about binding to a class
    // All async code is inside the try/catch block
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                // Update date property before we 'set' activity
                activity.date = activity.date.split('T')[0];
                // Mutate the state in MobX (populate an array with received activities)
                this.activities.push(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}