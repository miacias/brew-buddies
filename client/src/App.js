import { React, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Layout, Menu, ConfigProvider, theme } from 'antd';
import { setContext } from '@apollo/client/link/context';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
import SignupPage from './pages/SignupPage';
// this page will render any user profile (future development)
import { UserProfile } from './pages/UserProfile';
import SearchPage from './pages/SearchPage';
import SingleBrewery from './pages/SingleBrewery';
import { AccountPage } from './pages/AccountPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './utils/auth'



const { Content, Sider } = Layout;

// sets endpoint for main GraphQL API
const httpLink = createHttpLink({
  uri: '/graphql',
});

// sets request middleware to attach JWT token to each request with authorization header
const authLink = setContext((_, { headers }) => {
  // gets authentication token from local storage
  const token = localStorage.getItem('id_token');
  // returns headers to context for httpLink to read
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // executes authLink middleware before making request to GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  const [clickNav, setClickNav] = useState();
  const onClick = (e) => {
    console.log('click ', e);
    setClickNav(e.key);
  };
  const token = {
    colorPrimary: "#f4900c", // amber
    colorSuccess: "#ffe84d", // pale ale
    colorWarning: "#761618", // default
    colorInfo: "#c7a5d9" // lavender
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const itemsLoggedOut = [
    {
      key: "1",
      label: <Link to="/">Home</Link>
    },
    {
      key: "2",
      label: <Link to="/breweries">Breweries</Link>
    },
    {
      key: "3",
      label: <Link to="/signup">Sign Up</Link>
    },
    {
      key: "4",
      label: <Link to="/connect">Login</Link>
    }
  ]
  const itemsLoggedIn = [
    {
      key: "1",
      label: <Link to="/">Home</Link>
    },
    {
      key: "2",
      label: <Link to="/breweries">Breweries</Link>
    },
    {
      key: "3",
      label: <Link to="/profile">Profile Page</Link>
    },
    {
      key: "4",
      label: (<a href="/" onClick={() => Auth.logout()}>
      Logout
    </a>)
    }
  ]
  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: token.colorPrimary,
            colorSuccess: token.colorSuccess,
            colorWarning: token.colorWarning,
            colorInfo: token.colorInfo
          }
        }}
      >
        {/* sets layout for navigation sidebar */}
        <Router>
        <Layout>
          {/* contains side-view, hamburger button, and menu options */}
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              // console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              // console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            {Auth.loggedIn() ?
              (<Menu
              theme="dark"
              mode="inline"
              onClick={onClick}
              selectedKeys={[clickNav]}
              items={itemsLoggedIn} />) :
              (<Menu
                theme="dark"
                mode="inline"
                onClick={onClick}
                selectedKeys={[clickNav]}
                items={itemsLoggedOut} />)
}

          </Sider>
          {/* sets layout for header, content, and footer */}
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            />
            {/* renders content section based on current url route */}
            <Content
              style={{
                margin: '24px 16px 0',
              }}
            >
              
                <Routes>
                  <Route
                    path='/'
                    element={
                      <HomePage 
                        style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        }}
                      />}
                  />
                  <Route
                    path='/profile'
                    element={
                      <AccountPage
                        style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        }}
                      />}
                  />
                   <Route
                    path='/profile/:username'
                    exact
                    element={
                      <UserProfile
                        style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        }}
                      />}
                  />
                  {/* <Route 
                    path='/search'
                    element={
                      <MapPage/>
                    }
                  />*/}
                  <Route 
                    path='/:breweryId'
                    exact
                    element={
                      <SingleBrewery/>
                    }
                  />
                  <Route
                    path='/breweries'
                    element={
                      <SearchPage
                        style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        }}
                      />}
                  />
                  <Route
                    path='/connect'
                    element={
                      <ConnectPage 
                        style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        }}
                      />}
                  />
                  <Route
                    path='/signup'
                    element={
                      <SignupPage 
                        style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        }}
                      />}
                  />
                </Routes>
              
            </Content>
            {/* ends layout with footer */}
            <Footer
              style={{
                textAlign: 'center',
              }}
            />
          </Layout>
        </Layout>
        </Router>
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default App;