import "./App.css";
import Activity from "./pages/activities/Activity";
import { Route, Switch } from "react-router-dom";
import Client from './pages/clients/Client';
import Dashboard from './pages/dashboard/Dashboard';

export default function App() {
  return (
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/activities" exact component={Activity} />
      <Route path="/clients" component={Client} />
    </Switch>
  );
}
