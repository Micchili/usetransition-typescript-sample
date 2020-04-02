import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import { BrowserRouter, Route, Switch, useLocation, Link} from 'react-router-dom';
import { animated , useTransition } from 'react-spring'

import * as Styled from './ResetStyle';

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  color: white;
`

const NextButton = styled.button`
  color: white;
  font-weight: 800;
  font-size: 40em;
  will-change: transform, opacity;
  text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
  background: none;
`

const A = styled(Root)`
  background-color: lightpink;
`

const B = styled(Root)`
  background-color: lightblue;
`

const C = styled(Root)`
  background-color: lightgreen;
`

const Error = styled(Root)`
  background-color: lightgray;
`

const FloatButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  font-size: 4em;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  position: absolute;
  top: 50;
  bottom: 0;
  left: 50;
  right: 0;
  margin: auto;
`

const App: React.FC = () => {
  const location = useLocation();
  const transitions = useTransition(location,location => location.pathname, {
    from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
    enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
    leave: {opacity: 0, transform: 'translate3d(-50%,0,0)'},
  });
  
  const PageStart = () => <Root><NextButton><Link to={'/A'}>Start</Link></NextButton></Root>
  const PageA = () => <A><NextButton><Link to={'/B'}>A</Link></NextButton></A>
  const PageB = () => <B><NextButton><Link to={'/C'}>B</Link></NextButton></B>
  const PageC = () => <C><NextButton><Link to={'/A'}>C</Link></NextButton></C>
  const PageError = () => <Error>Error</Error>

  return (
    <>
      {transitions.map(({item, props}) => (
        <animated.div style={props}>
          <Switch location={item}>
            <Route path="/" exact={true} component={PageStart} />
            <Route path="/A" exact={true} component={PageA} />
            <Route path="/B" exact={true} component={PageB} />
            <Route path="/C" exact={true} component={PageC} />
            <Route path="/error" exact={false} component={PageError} />
          </Switch>
        </animated.div>
      ))}
    </>
  );
}

ReactDOM.render(
    <BrowserRouter>
      <Styled.Global /> 
      <App />
      <Link to={'/'}><FloatButton>/</FloatButton></Link>
    </BrowserRouter>,
    document.getElementById('root')
);
