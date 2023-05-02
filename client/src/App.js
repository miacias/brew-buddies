import './App.css';
import Nav from './components/Nav';
// import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      {/* <Header/> */}
      <Nav/>
      <HomePage/>
      <Footer/>
    </>
  );
}

export default App;
