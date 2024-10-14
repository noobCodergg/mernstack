
import './App.css';
import Application from './Components/Application';
import Dashboard from './Components/Dashboard';
import Detail from './Components/Detail';
import EmployeeAccount from './Components/EmployeeAccount';
import Employeelist from './Components/Employeelist';
import Login from './Components/Login';
import NewsAndNotices from './Components/NewsAndNotices';
import NewsAndNoticesInput from './Components/NewsAndNoticesInput';
import Notices from './Components/Notices';
import RegistrationForm from './Components/RegistrationForm';
import MyApplications from './Components/MyApplications';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ApplicationDetail from './Components/ApplicationDetail';
import AllApplications from './Components/AllApplications';
import AllApplicationDetail from './Components/AllApplicationDetail';
import TaskList from './Components/TaskList';
import Performance from './Components/Performance';
import EmptyFile from './Components/EmptyFile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path='/' element={ <Login/>}/>
        <Route path='/dashboard/:id/*' element={<Dashboard/>}>
             <Route  path='registration' element={<RegistrationForm/>}/>
             <Route path='application' element={<Application/>}/>
             <Route index element={<Employeelist/>}/>
             <Route path='postnews' element={<NewsAndNoticesInput/>}/>
             <Route path='allapplication/*' element={<AllApplications/>}/>
        </Route> 
        
        <Route path='detail/:id' element={<Detail/>}/> 

        <Route path='/account/:id/*' element={<EmployeeAccount/>}>
            <Route path='list' element={<Employeelist/>}/>
            <Route path='detail/:id' element={<Detail/>}/> 
            <Route path='news' element={<NewsAndNotices/>}/>
            <Route path='notices' element={<Notices/>}/>
            <Route path='application' element={<Application/>}/>
            <Route path='myapplications' element={<MyApplications/>}/>
            <Route index element={<TaskList/>}/>
            <Route path='performance' element={<Performance/>}/>
            
        </Route>
        <Route path='/applicationdetail/:uniqueID' element={<ApplicationDetail/>}/>
        <Route path='/allapplicationdetail/:uniqueID' element={<AllApplicationDetail/>}/>  
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
