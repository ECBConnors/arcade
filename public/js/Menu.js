class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.pickGame = this.pickGame.bind(this)
  }

  pickGame(game) {
    this.props.pickGame(game)
  }

  render() {
    return <div class="menuDiv">
      <h1>Menu Here</h1>
      <h1 onClick={() => this.pickGame("def")}>STAR DEFENDER</h1>
      <img src="../assets/defender_pic.png" onClick={() => this.pickGame("def")}/>
      <br/>
      <h1 onClick={() => this.pickGame("collect")}>STAR COLLECTOR</h1>
      <img src="../assets/collector_pic.png" onClick={() => this.pickGame("collect")}/>
    </div>
  }
}
