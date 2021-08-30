import './index.css';
import HomePage from './Pages/homepage'
import SignInOutContainer from './Containers/index'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import voterverifyPage from './Pages/voteridver';
import aboutPage from './Pages/about';
import contactsPage from './Pages/contacts';
import votedayPage from './Pages/votingday';


export default function App() {


  return (
    <Router>
      <Switch>
      <Route path ="/" component ={HomePage} exact = {true}/>
      <Route path ="/login" component ={SignInOutContainer}/>
      <Route path ="/voterver" component ={voterverifyPage}/>
      <Route path ="/about" component ={aboutPage}/>
      <Route path ="/contacts" component ={contactsPage}/>
      <Route path ="/voteday" component ={votedayPage}/>
      </Switch>
    </Router>
  );
}

 