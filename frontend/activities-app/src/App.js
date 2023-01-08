import "./App.css";
import Activity from "./pages/activities/Activity";
import { Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/activities" component={Activity} />
      <Route path="/clients" component={Client} />
    </Switch>
  );
}

const Home = () => {
  return <div>opa </div>;
};

const Client = () => {
  return <div>aaaaaaaaaaaS</div>;
};
