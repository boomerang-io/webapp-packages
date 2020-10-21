import React from "react";
import { useQuery } from "react-query";
import { ErrorBoundary, Loading } from "@boomerang-io/carbon-addons-boomerang-react";
import AppContext from "State/appContext";
import ErrorDragon from "Components/ErrorDragon";
import Navbar from "./Navbar";
import Main from "./Main";
import { serviceUrl, resolver } from "Config/servicesConfig";

const userUrl = serviceUrl.resourceUserProfile();
const navigationUrl = serviceUrl.resourceNavigation();

export function App() {
  const { data: userData, error: userError, isLoading: userIsLoading } = useQuery({
    queryKey: userUrl,
    queryFn: resolver.query(userUrl),
  });
  const { data: navigationData, error: navigationError, isLoading: navigationIsLoading } = useQuery({
    queryKey: navigationUrl,
    queryFn: resolver.query(navigationUrl),
  });

  if (userIsLoading || navigationIsLoading) {
    return <Loading />;
  }

  if (userError || navigationError) {
    return <ErrorDragon />;
  }

  return (
    <>
      <Navbar navigation={navigationData} user={userData} />
      <ErrorBoundary errorComponent={ErrorDragon}>
        <AppContext.Provider value={{ user: userData, navigation: navigationData }}>
          <Main user={userData} />
        </AppContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
