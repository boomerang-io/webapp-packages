import React from "react";
import { CodeSnippet } from "@boomerang-io/carbon-addons-boomerang-react";

export default function UsersCurrent({ user }) {
  return <CodeSnippet type="multi">{JSON.stringify(user, null, 2)}</CodeSnippet>;
}
