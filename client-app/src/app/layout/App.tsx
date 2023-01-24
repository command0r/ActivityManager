import React, {useEffect, useState} from 'react';
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import {useStore} from "../stores/store";
import { observer } from 'mobx-react-lite';

function App() {
  // Use store (destructuring object to access ActivityStore)
  const {activityStore} = useStore();
    
  // Use a 'useState' hook to store activities when the results get back from the API
  // Give 'useState' an empty array to get around the 'activities' variable render as 'undefined'
  const [activities, setActivities] = useState<Activity[]>([]);
  
  // The initial state of Activity is 'undefined' (logic for passing mouse click and edit)
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    activityStore.loadActivities();
    // Set dependencies so that the call only happens once
  }, [activityStore])
    
  // Logic to pass down the button click on a specific activity to a downstream component
  function handleSelectActivity(id: String) {
      setSelectedActivity(activities.find(x => x.id === id));
  }
  
  function handleCancelSelectActivity() {
      setSelectedActivity(undefined);
  }
  
  // Edit logic
  function handleFormOpen(id?: string) {
      id ? handleSelectActivity(id) : handleCancelSelectActivity();
      setEditMode(true);
  }
  
  function handleFormClose() {
      setEditMode(false);
  }
  
  function handleCreateOrEditActivity(activity: Activity) {
      // Use 'filter' to remove Activities that are updated and replaced them 
      // with the parameters passed to this func
      setSubmitting(true);
      if(activity.id) {
          agent.Activities.update(activity).then(() => {
              setActivities([...activities.filter(x => x.id !== activity.id), activity])
              setSelectedActivity(activity);
              setEditMode(false);
              setSubmitting(false);
          })
      } else {
          activity.id = uuid();
          agent.Activities.create(activity).then(() => {
              setActivities([...activities, activity])
              setSelectedActivity(activity);
              setEditMode(false);
              setSubmitting(false);
          })
      }
  }
  
  function handleDeleteActivity(id: string) {
      setSubmitting(true);
      agent.Activities.delete(id).then(() => {
          setActivities([...activities.filter(x => x.id !== id)])
          setSubmitting(false);
      })
  }
  
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
      
  return (
    <div>
      <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
            <ActivitiesDashboard 
                activities={activityStore.activities}
                selectedActivity={selectedActivity}
                selectActivity={handleSelectActivity}
                cancelSelectActivity={handleCancelSelectActivity}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                createOrEdit={handleCreateOrEditActivity}
                deleteActivity={handleDeleteActivity}
                submitting={submitting}
            />
        </Container>
    </div>
  );
}

export default observer(App);
