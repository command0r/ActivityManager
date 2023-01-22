import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import {v4 as uuid} from 'uuid';

function App() {
  // Use a 'useState' hook to store activities when the results get back from the API
  // Give 'useState' an empty array to get around the 'activities' variable render as 'undefined'
  const [activities, setActivities] = useState<Activity[]>([]);
  
  // The initial state of Activity is 'undefined' (logic for passing mouse click and edit)
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
     axios.get<Activity[]>('http://localhost:5000/api/Activities')
         .then(response => {
           // console.log(response);
           setActivities(response.data);
         })
    // Set dependencies so that the call only happens once
  }, [])
    
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
      activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
          : setActivities([...activities, {...activity, id: uuid()}]);
      setEditMode(false);
      setSelectedActivity(activity);
  }
  
  function handleDeleteActivity(id: string) {
      setActivities([...activities.filter(x => x.id !== id)])
  }
  
  return (
    <div>
      <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
            <ActivitiesDashboard 
                activities={activities}
                selectedActivity={selectedActivity}
                selectActivity={handleSelectActivity}
                cancelSelectActivity={handleCancelSelectActivity}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                createOrEdit={handleCreateOrEditActivity}
                deleteActivity={handleDeleteActivity}
            />
        </Container>
    </div>
  );
}

export default App;
