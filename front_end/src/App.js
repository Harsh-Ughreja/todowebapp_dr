import React, { useEffect, useState } from 'react';
import './my.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { AuthMain } from './Components/AuthComponent/AuthMain';
import { isLoggedIn } from './Components/ApiCall/authApi';
import { Header } from './Components/Header';
import { ListsMain } from './Components/MainPart/ListsMain';
import { ScheduledMain } from './Components/MainPart/ScheduledMain';
import { TodayMain } from './Components/MainPart/TodayMain';
import { ViewList } from './Components/MainPart/ViewList';
import { AccountMain } from './Components/MainPart/AccountMain';
import { TermsAndConditions } from './Components/MainPart/TermsAndConditions';
import { PrivacyPolicy } from './Components/MainPart/PrivacyPolicy';
import { AppMain } from './Components/MainPart/AppMain';
import { Contactus } from './Components/MainPart/Contactus';

const pathNames = ['/terms-conditions/', '/privacy-policy/', '/contact-us/']

function App() {

  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [themeStyle, setThemeStyle] = useState('');

  useEffect(async () => {
    await isLoggedIn()
      .then((response) => {
        const response_data = response.data;
        const pathname = window.location.pathname;
        if (pathNames.includes(pathname)) {

        }
        else {
          if (response_data.content.isLoggedIn) {
            if (pathname == '/login/' || pathname == "/login" || pathname == '/signup/' || pathname == "/signup") {
              window.location = "/";
            }
            setEmailAddress(response_data.content.emailAddress);
            setUserName(response_data.content.userName);
            setThemeStyle(response_data.content.themeStyle);
          }
          else {
            if (pathname == "/login/" || pathname == "/login") {
              // window.location = "/login/";
            }
            else {
              window.location = "/login/";
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <>
      <Router>
        <Switch>

          <Route exact path={'/'}>
            <Header activeTab={"app"} emailAddress={emailAddress} userName={userName} themeStyle={themeStyle} />
            <AppMain />
          </Route>

          <Route exact path={`/login/`}>
            <AuthMain authActionType={"login"} />
          </Route>

          <Route exact path={"/signup/"}>
            <AuthMain authActionType={"signup"} />
          </Route>

          <Route exact path={`/forgotPassword/`} >
            <AuthMain authActionType={'forgotPassword'} />
          </Route>

          <Route exact path={'/myLists'}>
            <Header activeTab={"myLists"} emailAddress={emailAddress} userName={userName} themeStyle={themeStyle} />
            <ListsMain />
          </Route>

          <Route exact path={'/scheduled'}>
            <Header activeTab={"scheduled"} emailAddress={emailAddress} userName={userName} themeStyle={themeStyle} />
            <ScheduledMain />
          </Route>

          <Route exact path={'/today'}>
            <Header activeTab={"today"} emailAddress={emailAddress} userName={userName} themeStyle={themeStyle} />
            <TodayMain />
          </Route>

          <Route path={`/myLists/:pk_list`}>
            <Header activeTab={"viewList"} emailAddress={emailAddress} userName={userName} themeStyle={themeStyle} />
            <ViewList />
          </Route>

          <Route exact path={"/account"}>
            <Header activeTab={"account"} emailAddress={emailAddress} userName={userName} themeStyle={themeStyle} />
            <AccountMain
              setUserName={setUserName}
              setThemeStyle={setThemeStyle}
              themeStyle={themeStyle}
            />
          </Route>

          <Route exact path={"/terms-conditions/"}>
            <TermsAndConditions />
          </Route>

          <Route exact path={"/privacy-policy/"}>
            <PrivacyPolicy />
          </Route>

          <Route exact path={"/contact-us/"}>
            <Contactus />
          </Route>

        </Switch>
      </Router>
    </>
  )
}

export default App;
