import React, {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

// Introducing interface in a property to use in a List  
export default observer(function ActivitiesDashboard() {

    // Use store (destructuring object to access ActivityStore)
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
       if(activityRegistry.size <= 1) loadActivities();
        // Set dependencies so that the call only happens once
    }, [loadActivities])

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})