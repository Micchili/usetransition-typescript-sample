import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import { BrowserRouter, Route, Switch, useLocation, Link} from 'react-router-dom';
import { animated , useTransition } from 'react-spring'

import * as Styled from './ResetStyle';

const Root = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto,
    segoe ui, arial, sans-serif;
  background: transparent;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  font-size: 30em;
  will-change: transform, opacity;
  text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
  -webkit-overflow-scrolling: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
       display: none;
    }
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
  bottom: 30px;
  right: 30px;
`

const App: React.FC = () => {
  const location = useLocation();
  const transitions = useTransition(location,location => location.pathname, {
    from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
    enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
    leave: {opacity: 0, transform: 'translate3d(-50%,0,0)'},
  });
  
  const PageStart = () => <Root><Link to={'/A'}>Start</Link></Root>
  const PageA = () => <A><Link to={'/B'}>A</Link></A>
  const PageB = () => <B><Link to={'/C'}>B</Link></B>
  const PageC = () => <C><Link to={'/A'}>C</Link></C>
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
      {location.pathname !== '/' ? <Link to={'/'}><FloatButton>/</FloatButton></Link> : <></>}
    </>
  );
}

ReactDOM.render(
    <BrowserRouter>
      <Styled.Global /> 
      <App />
    </BrowserRouter>,
    document.getElementById('root')
);
