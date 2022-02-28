import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import loadable from '@loadable/component';
import { useSession } from '@users/session';
import { goLoginPage } from '@users/navigate';

const AssignmentPage = loadable(() => import('./src/pages/private/assignment/AssignmentPage'));
const Welcome = loadable(() => import('./src/pages/private/welcome/WelcomePage'));
const Library = loadable(() => import('./src/pages/private/library/LibraryPage'));
const SetupTask = loadable(() => import('./src/pages/private/library/TaskSetupPage'));
const Profiles = loadable(() => import('./src/pages/private/profiles/ProfilesPage'));
const Ongoing = loadable(() => import('./src/pages/private/ongoing/OngoingPage'));
const Details = loadable(() => import('./src/pages/private/assignment/DetailsPage'));

export default function Private() {
  const { path } = useRouteMatch();
  const session = useSession({ redirectTo: goLoginPage });

  return (
    <Switch>
      <Route path={`${path}/welcome`}>
        <Welcome session={session} />
      </Route>
      <Route path={`${path}/profiles`}>
        <Profiles session={session} />
      </Route>
      <Route path={`${path}/library/edit/:id`}>
        <SetupTask session={session} />
      </Route>
      <Route path={`${path}/library/create`}>
        <SetupTask session={session} />
      </Route>
      <Route path={`${path}/library/assign/:id`}>
        <AssignmentPage session={session} />
      </Route>
      <Route path={`${path}/library`}>
        <Library session={session} />
      </Route>
      <Route path={`${path}/ongoing`}>
        <Ongoing session={session} />
      </Route>
      <Route path={`${path}/details/:id`}>
        <Details session={session} />
      </Route>
    </Switch>
  );
}
