import styled from "@emotion/styled";
import { CardContent } from "@mui/material";
import { Form, Toolbar } from "react-admin";
import LayoutGenerator from "./LayoutGenerator";

const DefaultComponent = styled(CardContent, {
  name: "RaSimpleForm",
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    paddingBottom: "5em",
  },
}));

const DefaultToolbar = <Toolbar />;

const FormLayoutGenerator = (props) => {
  const {
    children,
    className,
    component: DefaultComponent,
    sx,
    toolbar = DefaultToolbar,
    layout,
    ...rest
  } = props;
  return (
    <Form {...rest}>
      <LayoutGenerator layout={layout ?? undefined} children={children}/>
      {toolbar !== false ? toolbar : null}
    </Form>
  );
};

export default FormLayoutGenerator;
