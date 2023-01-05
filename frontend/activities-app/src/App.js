import "./App.css";
import Activity from "./pages/activities/Activity";
import { Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Route path="/activities" component={Activity} />
      <Route path="/clients" component={Client} />
      <Route path="/home" component={Home} />
    </>
  );
}

const Home = () => {
  return <div>home</div>;
};

const Client = () => {
  <div>clients</div>;
};
