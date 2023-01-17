import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import { Account } from './comp/Account';
import { AccountIndex } from './comp/AccountIndex';
import { CourseNameIndex } from './comp/CourseNameIndex';
import { CreateCourse } from './comp/CreateCourse';
import { Info } from './comp/Info';
import { Login } from './comp/Login';
import { Register } from './comp/Register';
import { Slash } from './comp/Slash';
import { Top } from './comp/Top';
import { TopIndex } from './comp/TopIndex';
import { Update } from './comp/Update';
import { YMD } from './comp/YMD';
import { YMDIndex } from './comp/YMDIndex';
import { CreateEvent } from './comp/CreateEvent';
import { CreateEventIndex } from './comp/CreateEventIndex';
import { EventId } from './comp/EventId';
import { EventIdIndex } from './comp/EventIdIndex';
import { EventUpdate } from './comp/EventUpdate';
import { CourseName } from './comp/CourseName';
import { Error404 } from './comp/Error404';
import { PasswordChange } from './comp/PasswordChange';
import { Users } from "./comp/Users"
import { Chat } from "./comp/Chat"

declare global{
    interface Window{
        utilDraw: (chart: HTMLCanvasElement, rawData: {
            date: string,
            weight: string | number
        }[]) => void
    }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Slash/>}> {/* forceUpdate function context, redirect to top */}
              <Route path='top' element={<Top/>}> {/* check accessId sign to auto to account */}
                <Route index element={<TopIndex/>}></Route>
                <Route path='login' element={<Login/>}></Route>
                <Route path='register' element={<Register/>}></Route>
              </Route>
              <Route path='account' element={<Account/>}> {/* post account to get data */}  
                <Route index element={<AccountIndex/>}></Route>
                <Route path='info' element={<Info/>}></Route>
                <Route path='update' element={<Update/>}></Route>
                <Route path="user" element={<Users/>} ></Route>
                <Route path="chat" element={<Chat/>} ></Route>
                <Route path='passwordChange' element={<PasswordChange/>}></Route>
                <Route path='createCourse' element={<CreateCourse/>}></Route>
                <Route path='course/:courseName' element={<CourseName/>}> {/* add course data from account to context */}
                  <Route index element={<CourseNameIndex/>}></Route> {/* redirect to today */}
                  <Route path=':year/:month/:date' element={<YMD/>}>
                    <Route index element={<YMDIndex/>}></Route>
                  </Route>
                  <Route path='createEvent' element={<CreateEvent/>}>
                    <Route index element={<CreateEventIndex/>}></Route>
                  </Route>
                  <Route path='event/:eventId' element={<EventId/>}>
                    <Route index element={<EventIdIndex/>}></Route>
                    <Route path='update' element={<EventUpdate/>}>
                      <Route index element={<></>}></Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
              <Route path='*' element={<Error404/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
