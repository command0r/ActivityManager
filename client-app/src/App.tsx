import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {Header, List, ListItem} from "semantic-ui-react";

function App() {
  // Use a 'useState' hook to store activities when the results get back from the API
  // Give 'useState' an empty array to get around the 'activities' variable render as 'undefined'
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
     axios.get('http://localhost:5000/api/Activities')
         .then(response => {
           console.log(response);
           setActivities(response.data);
         })
    // Set dependencies so that the call only happens once
  }, [])
  
  return (
    <div>
      <Header as='h2' icon='users' content='Activities' />
        
        <List>
            {activities.map((activity: any) => (
                <ListItem key={activity.id}>
                    {activity.title}
                </ListItem>
            ))}
        </List>
    </div>
  );
}

export default App;
