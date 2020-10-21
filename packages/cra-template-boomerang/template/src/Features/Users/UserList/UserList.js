import React from "react";
import { useQuery } from "react-query";
import {
  ErrorMessage,
  StructuredListSkeleton,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { resolver, serviceUrl } from "Config/servicesConfig";

const usersUrl = serviceUrl.resourceUsers();

export default function UsersStructured() {
  const usersQuery = useQuery({ queryKey: usersUrl, queryFn: resolver.query(usersUrl) });
  if (usersQuery.isLoading) {
    return (
      <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
        <StructuredListSkeleton />
      </div>
    );
  }

  if (usersQuery.isError) {
    return <ErrorMessage />;
  }

  return (
    <StructuredListWrapper>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>Id</StructuredListCell>
          <StructuredListCell head>Name</StructuredListCell>
          <StructuredListCell head>Email</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {usersQuery.data.map((user) => {
          return (
            <StructuredListRow key={user.id}>
              <StructuredListCell>{user.id}</StructuredListCell>
              <StructuredListCell>{user.name}</StructuredListCell>
              <StructuredListCell>{user.email}</StructuredListCell>
            </StructuredListRow>
          );
        })}
      </StructuredListBody>
    </StructuredListWrapper>
  );
}
