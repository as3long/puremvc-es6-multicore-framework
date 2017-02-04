import React from 'react';
import ReactDOM from 'react-dom';
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';

class Example extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Button color="primary" onClick={this.clickHandler}>btn1</Button>
          <Button color="primary" onClick={this.clickHandler}>btn2</Button>
        </Container>
      </div>
    );
  }

  clickHandler = () => {
    console.log('点击按钮');
  }
}

ReactDOM.render(<Example />, document.getElementById('example'));

export default Example;