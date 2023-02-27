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
            list={m.list ? m.list : ListGuesser}
            show={m.show ? m.show : ShowGuesser}
            edit={m.edit ? m.edit : EditGuesser}
            create={m.create ? m.create : undefined}
            icon={m.icon}
          />
        ))}
      </Admin>
    </div>
  );
}

export default App;
