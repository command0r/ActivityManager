import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'activities', element: <ActivitiesDashboard />},
            {path: 'createActivity', element: <ActivityForm />}
        ]
    }
] 

export const router = createBrowserRouter(routes);