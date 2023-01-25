import React, {useEffect} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import LoadingComponent from "./LoadingComponent";
import {useStore} from "../stores/store";
import { observer } from 'mobx-react-lite';

function App() {
  // Use store (destructuring object to access ActivityStore)
  const {activityStore} = useStore();
  
  useEffect(() => {
    activityStore.loadActivities();
    // Set dependencies so that the call only happens once
  }, [activityStore])
  
  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
      
  return (
    <div>
      <NavBar />
        <Container style={{marginTop: '7em'}}>
            <ActivitiesDashboard />
        </Container>
    </div>
  );
}

export default observer(App);
