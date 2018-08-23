class Game extends React.Component {
  constructor(props) {
    super(props)
    this.toMenu = this.toMenu.bind(this)
  }

  toMenu() {
    document.querySelector("canvas").remove()
    this.props.toMenu()
  }

  componentDidMount () {
    const script = document.createElement("script");
    if (this.props.currentGame == "def") {
      script.src = "../games/four_way_defense.js"
    } else if (this.props.currentGame == "collect") {
      script.src = "../games/star_collector.js"
    } else {
      console.log(this.props.currentGame);
    }
    script.async = true;
    // this.setState({script: script})
    document.querySelector("#gameDiv").appendChild(script);
  }

  componentWillUnmount() {

  }

  render() {
    return <div id="gameDiv">
      <h1> Game here</h1>
      <button onClick={this.toMenu}>Return to Menu</button>
    </div>
  }
}
