class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {currentGame: null}

    this.getGameDiv = this.getGameDiv.bind(this)
  }

  getGameDiv = () => {
    switch (this.state.currentGame) {
      case null:
        return null
      case "snake"
    }
  }

  render() {
    let gameDiv = this.getGameDiv();

    return <div class="arcadeContainer">

    </div>
  }
}

ReactDOM.render() {
  <App/>,
  document.querySelector('body')
}
