class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {currentGame: null}
    this.toMenu = this.toMenu.bind(this)
    this.pickGame = this.pickGame.bind(this)
  }

  toMenu() {
    this.setState({currentGame: null})
  }

  pickGame(game) {
    this.setState({currentGame: game})
  }

  render() {
    return <div class="arcadeContainer">
      {(!!this.state.currentGame) ? <Game currentGame={this.state.currentGame} toMenu={this.toMenu}/> : <Menu pickGame={this.pickGame}/>}
    </div>
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('body')
)
