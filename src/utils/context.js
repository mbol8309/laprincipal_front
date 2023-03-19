import React from "react";

export function getContextValue(context) {
    const { Provider } = context;
    const value = Provider.value
    if (!value) {
      throw new Error(`Cannot retrieve value from ${context.displayName}`);
    }
    return value;
  }