import logo from "./logo.svg";
import "./App.css";
import {
  Admin,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import "@fontsource/roboto/300.css";

import modules from "./modules";
import dataProvider from "./providers/data";
import authProvider from "./providers/auth";
import CustomLayout from "./layout";

function App() {
  return (
    <div className="App">
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        layout={CustomLayout}
      >
        {modules.map((m) => (
          <Resource
            key={m.route}
            name={m.route}
            list={ListGuesser}
            show={ShowGuesser}
            edit={EditGuesser}
            icon={m.sidebar.icon}
          />
        ))}
      </Admin>
    </div>
  );
}

export default App;
