import {makeAutoObservable, runInAction} from "mobx";
import {Activity} from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }
    
    // Computed property that work out the Activity dates in order
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    // 'Arrow' func, so that no need to worry about binding to a class
    // All async code is inside the try/catch block
    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                // Update date property before we 'set' activity
                activity.date = activity.date.split('T')[0];
                // Mutate the state in MobX (populate an array with received activities)
                this.activityRegistry.set(activity.id, activity);
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

    // Logic to pass down the button click on a specific activity to a downstream component
    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    // Edit logic
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    // Create Activity method
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            // If update operation is successful the store needs to be updated
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // Update Activity method
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                // this.activities.filter(a => a.id !== activity.id);
                // this.activities.push(activity); or:
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    // Delete Activity
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
