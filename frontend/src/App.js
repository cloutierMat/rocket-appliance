import Main from './pages/mainPage/Main'
function App() {
  function thePageToDisplay() {
    return <Main/>
  }
  return (
    <div className="App">
      <div><nav>navBar</nav></div>
      {thePageToDisplay()}
    </div>
  );
}

export default App;
