import React from 'react';
import ReactDOM from 'react-dom';
import Appbar from 'muicss/src/react/appbar';
import Button from 'muicss/src/react/button';
import Container from 'muicss/src/react/container';

class Example extends React.Component {
  render() {
    return (
      <div>
        <Appbar></Appbar>
        <Container>
          <Button color="primary">button</Button>
        </Container>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('example'));

export default Example;