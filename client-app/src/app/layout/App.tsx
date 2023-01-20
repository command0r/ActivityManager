import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";

function App() {
  // Use a 'useState' hook to store activities when the results get back from the API
  // Give 'useState' an empty array to get around the 'activities' variable render as 'undefined'
  const [activities, setActivities] = useState<Activity[]>([]);
  
  useEffect(() => {
     axios.get<Activity[]>('http://localhost:5000/api/Activities')
         .then(response => {
           // console.log(response);
           setActivities(response.data);
         })
    // Set dependencies so that the call only happens once
  }, [])
  
  return (
    <div>
      <NavBar />
        <Container style={{marginTop: '7em'}}>
            <ActivitiesDashboard activities={activities} />
        </Container>
    </div>
  );
}

export default App;
