import React from "react";
import {Grid, List, ListItem} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity";
import ActivityList from "./ActivityList";

// Passing down activities via the interface
// i.e., de-structure the properties we're passing down from the ActivityDashboard
interface Props {
    activities: Activity[];
}

// Introducing interface in a property to use in a List  
export default function ActivitiesDashboard({activities}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList  activities={activities} />
            </Grid.Column>
        </Grid>
    )
}