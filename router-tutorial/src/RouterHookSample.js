import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

function RouterHookSample() {
  let history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  console.log({ history, location, match });
  return null;
}

export default RouterHookSample;