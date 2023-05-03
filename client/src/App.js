import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ConnectPage from './pages/ConnectPage';
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
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ApolloProvider client={client}>
      {/* sets layout for navigation sidebar */}
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: `nav ${index + 1}`,
              }),
            )}
          />
        </Sider>
      </Layout>
      {/* sets layout for header */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
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
            </Routes>
          </Router>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        />
      </Layout>
    </ApolloProvider>
  );
}

export default App;