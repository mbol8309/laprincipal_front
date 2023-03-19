import { AuthContext, useAuthenticated, useAuthState, useGetIdentity } from "react-admin";
import dataProvider from ".";
import instance from "../../api/instance";
import { getContextValue } from "../../utils/context";
import replaceStringsWithContextValues from "../../utils/replaceStringWithContextValue";
import restDataProvider from "./restDataProvider";

const jsonParserDataProvider = {
  ...restDataProvider,
};

export default jsonParserDataProvider;
