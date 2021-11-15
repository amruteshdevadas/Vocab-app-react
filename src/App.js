
import './App.css';
import Homepage from './components/Homepage';
import Add from './components/Add';
import Singlepost from './components/Singlepost';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <>
     <Router>
       <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/singlepost/:id" component={Singlepost} />
       </Switch>
     </Router>
    </>
  );
}

export default App;
