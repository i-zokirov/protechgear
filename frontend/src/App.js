import React from "react";

import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";


const App  = ()=>{

  return (
    <React.Fragment>
      <Header/>
      <main className="py-3">
        <Container>
          <h1>Welcome</h1>
        </Container>
      </main>
      <Footer/>
    </React.Fragment>
  )
}

export default App;
