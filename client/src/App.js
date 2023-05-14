// client-side packages
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Layout, Menu, ConfigProvider, theme } from 'antd';
import { setContext } from '@apollo/client/link/context';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// client-side utils, pages, components
import Auth from '../src/utils/auth';
import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
import SignupPage from './pages/SignupPage';
import { UserProfile } from './pages/UserProfile';
import SearchPage from './pages/SearchPage';
import SingleBrewery from './pages/SingleBrewery';
import { AccountPage } from './pages/AccountPage';
import Header from './components/Header';
import Footer from './components/Footer';



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
  // Ant Design UI theme
  const token = {
    colorPrimary: "#f4900c", // amber
    colorSuccess: "#ffe84d", // pale ale
    colorWarning: "#761618", // default
    colorInfo: "#c7a5d9" // lavender
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // navbar menu items
  const items = [
    {
      key: "/",
      label: <Link to="/">Home</Link>
    },
    {
      key: "/breweries",
      label: <Link to="/breweries">Breweries</Link>
    },
    ...Auth.loggedIn() ? 
      [
        {
        key: "/profile",
        label: <Link to="/profile">Profile Page</Link>
        },
        {
          key: "/",
          label: (<Link to="/" onClick={() => Auth.logout()}>
          Logout
        </Link>)
        }
      ] : [
        {
          key: "/signup",
          label: <Link to="/signup">Sign Up</Link>
        },
        {
          key: "/connect",
          label: <Link to="/connect">Login</Link>
        }
      ],
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
          <Router>
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
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={window.location.pathname}
                items={items} 
              />
            </Sider>
            {/* sets inner layout for header, content, and footer */}
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
              {/* ends inner layout with footer */}
              <Footer
                style={{
                  textAlign: 'center',
                }}
              />
            </Layout>
          </Router>
        </Layout>
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default App;