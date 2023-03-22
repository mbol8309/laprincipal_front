import logo from "./logo.svg";
import "./App.css";
import {
  Admin,
  CustomRoutes,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import "@fontsource/roboto/300.css";

import dataProvider from "./providers/data";
import authProvider from "./providers/auth";
import CustomLayout from "./layout";
import Dashboard from "./components/Dashboard";
import { QueryClient } from "react-query";
import { useFront2 } from "./api/useFront";
import getView from "./utils/getView";

function App() {
  const queryClient = new QueryClient();

  const {
    isSuccess,
    data: resources,
  } = useFront2("resources", queryClient);

  return (
    <div className="App">
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        layout={CustomLayout}
        dashboard={Dashboard}
        queryClient={queryClient}
      >
        {isSuccess &&
          resources?.items?.map((r) => (
            <Resource
              key={r.id}
              name={r.id}
              list={getView(r.id,'list',r.list)}
              show={getView(r.id,'show',r.show)}
              edit={getView(r.id,'edit',r.edit)}
              create={getView(r.id,'create',r.create)}
              recordRepresentation={(record)=> r.representation ? eval("`" + r.representation + "`") : r.id }
            />
          ))}
        {/* {modules.filter(m=>Boolean(m.sidebar)).map((m) => {
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
          })} */}
      </Admin>
    </div>
  );
}

export default App;
