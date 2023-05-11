import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, ConfigProvider, theme } from 'antd';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
import SignupPage from './pages/SignupPage';
// this page will render any user profile (future development)
// import { UserProfile } from './pages/UserProfile';
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
      label: (<a href="/">Home</a>)
    },
    {
      key: "2",
      label: (<a href="/breweries">Breweries</a>)
    },
    {
      key: "3",
      label: (<a href="/profile">Profile Page</a>)
    },
    {
      key: "4",
      label: (<a href="/connect">Login</a>)
    },
    {
      key: "5",
      label: (<a href="/signup">Sign Up</a>)
    }
  ]
  const itemsLoggedIn = [
    {
      key: "1",
      label: (<a href="/">Home</a>)
    },
    {
      key: "2",
      label: (<a href="/breweries">Breweries</a>)
    },
    {
      key: "3",
      label: (<a href="/profile">Profile Page</a>)
    },
    {
      key: "4",
      label: (<a href="/" onClick={() => Auth.logout()}>
      Logout
    </a>)
    },
    {
      key: "5",
      label: (<a href="/signup">Sign Up</a>)
    },
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
              defaultSelectedKeys={['4']}
              items={itemsLoggedIn} />) :
              (<Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
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
              <Router>
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
                  {/* <Route 
                    path='/search'
                    element={
                      <MapPage/>
                    }
                  /> */}
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
                    path='/SingleBrewery'
                    element={
                      <SingleBrewery 
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
              </Router>
            </Content>
            {/* ends layout with footer */}
            <Footer
              style={{
                textAlign: 'center',
              }}
            />
          </Layout>
        </Layout>
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default App;