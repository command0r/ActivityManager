import React from "react";
import {Grid} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

// Passing down activities via the interface
// i.e., de-structure the properties we're passing down from the ActivityDashboard
interface Props {
    activities: Activity[];
    
    // Define select and edit activities props (coming from App.tsx)
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

// Introducing interface in a property to use in a List  
export default function ActivitiesDashboard({activities, selectedActivity, deleteActivity,
    selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList  activities={activities} 
                               selectActivity={selectActivity}
                               deleteActivity={deleteActivity}
                               submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}
                />}
                {editMode &&
                <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}