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
          {modules.filter(m=>Boolean(m.sidebar)).map((m) => {
            if (Boolean(m.sidebar.children)) {
              return (
                <>
                  {m.sidebar.children.map((c) => (
                    <Resource
                      key={c.route}
                      name={c.route}
                      list={c.list ? c.list : ListGuesser}
                      show={c.show ? c.show : ShowGuesser}
                      edit={c.edit ? c.edit : EditGuesser}
                      create={c.create ? c.create : undefined}
                      icon={c.icon}
                    />
                  ))}
                </>
              );
            } else {
              return (
                <Resource
                  key={m.sidebar.route}
                  name={m.sidebar.route}
                  list={m.sidebar.list ? m.sidebar.list : ListGuesser}
                  show={m.sidebar.show ? m.sidebar.show : ShowGuesser}
                  edit={m.sidebar.edit ? m.sidebar.edit : EditGuesser}
                  create={m.sidebar.create ? m.sidebar.create : undefined}
                  icon={m.sidebar.icon}
                />
              );
            }
          })}
        </Admin>
    </div>
  );
}

export default App;
