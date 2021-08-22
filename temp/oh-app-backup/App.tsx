import { lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppNavigation } from "components/AppNavigation";
import { CssBaseline } from "@material-ui/core";
import { ErrorHandledSuspense } from "components/ErrorHandledSuspense";
import { Loading } from "components/Loading";

// code-splitting to reduce bundle size
const Dashboard = lazy(() => import('views/Dashboard'))
const Earn = lazy(() => import('views/Earn'))
const NoMatch = lazy(() => import('views/NoMatch'))
const Stake = lazy(() => import('views/Stake'))
const Vote = lazy(() => import('views/Vote'))

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppNavigation />

      <ErrorHandledSuspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          {/* <Route path="/earn/:id" component={Banks} /> */}
          <Route path="/earn" component={Earn} />
          <Route path="/stake" component={Stake} />
          <Route path="/vote" component={Vote} />
          <Route component={NoMatch} />
        </Switch>
      </ErrorHandledSuspense>
    </BrowserRouter>
  );
};

export default App;
