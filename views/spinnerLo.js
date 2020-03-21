import React from 'react';
import { Container, Header, Content, Spinner } from 'native-base';


//show a spinner while the request is on progress 
const MySpinner=()=> {
 
    return (
      <Container>
        <Header />
        <Content>
          <Spinner color='green' />
        </Content>
      </Container>
    );
  
}

export default MySpinner;
