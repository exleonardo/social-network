import React , {useEffect , useState} from 'react';
import './App.css';
import {Redirect , Route , Switch} from 'react-router-dom';
import News from './components/News/News';
import Setting from './components/Setting/Setting';
import Music from './components/Music/Music';
import {UsersPage} from "./components/Users/UsersPage";
import {Header} from './components/Header/Header'
import {Login} from "./components/Login/Login";
import {initializeApp} from "./redux/app-reducer";
import {useAppDispatch , useAppSelector} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {getInitialized} from "./components/Login/login-selectors";
import {Layout , theme} from "antd";
import {MenuNav} from "./components/Navbar/Menu/MenuNav";
import {ResultStatus} from "./components/Result/ResultStatus";
import {Player} from "./components/Video/Player";
import {ChatPage} from "./components/Chat/ChatPage";

const { Sider , Content , Footer } = Layout;

const DialogsContainer = React.lazy ( () => import("./components/Dialogs/Dialogs") )
const ProfileContainer = React.lazy ( () => import("./components/Profile/ProfileMain") )


export const App = () => {
  const [collapsed , setCollapsed] = useState ( false );

  const initialized = useAppSelector ( getInitialized )
  const dispatch = useAppDispatch ()


  const catchAllUnhandleErrors = () => {
    alert ( "Some Error" )
  }
  useEffect ( () => {
    dispatch ( initializeApp () )
    window.addEventListener ( 'unhandledrejection' , catchAllUnhandleErrors )
    return () => {
      window.removeEventListener ( 'unhandledrejection' , catchAllUnhandleErrors )
    }
  } , [initialized] );


  if ( initialized ) {
    return <Preloader/>
  }


  const {
    token: { colorBgContainer , borderRadiusLG } ,
  } = theme.useToken ();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider zeroWidthTriggerStyle={{ display: "none" }} className={'menu'} style={{ background: '#1d2b43' }}
             collapsedWidth={0} trigger={collapsed}
             collapsible
             collapsed={collapsed}
             onCollapse={() => setCollapsed ( !collapsed )}>

        <MenuNav/>
      </Sider>
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content
          style={{
            margin: '24px 16px' ,
            padding: 24 ,
            minHeight: 280 ,
            background: colorBgContainer ,
            borderRadius: borderRadiusLG ,
            boxShadow: '1px -2px 19px -1px rgba(34, 60, 80, 0.2)'
          }}
        >
          <Switch>
            <Route exact path="/" render={() => <Redirect to={'/profile'}/>}/>
            <Route path="/dialogs" render={withSuspense ( DialogsContainer )}/>
            <Route path="/profile/:userId?" render={withSuspense ( ProfileContainer )}/>
            <Route path="/users" render={() => <UsersPage/>}/>
            <Route path="/login" render={() => <Login/>}/>
            <Route path="/news" render={() => <News/>}/>
            <Route path="/music" render={() => <Music/>}/>
            <Route path="/video" render={() => <Player/>}/>
            <Route path="/chat" render={() => <ChatPage/>}/>
            <Route path="/setting" render={() => <Setting/>}/>
            <Route path="/unautorized" render={() => <ResultStatus status={'403'} buttonTitle={'Login'}
                                                                   subTitle={"Sorry, you are not authorized to access this page."}/>}/>
            <Route path="*" render={() => <ResultStatus status={'404'} buttonTitle={'Back home'}
                                                        subTitle={"Sorry, the page you visited does not exist."}/>}/>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Alexander Khomenok Design Created ©{new Date ().getFullYear ()}
        </Footer>
      </Layout>
    </Layout>
  );
}