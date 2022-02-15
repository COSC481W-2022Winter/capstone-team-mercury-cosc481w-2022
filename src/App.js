import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class fromServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
	
	refreshGames() {
		this.callAPI();
		this.render();
		this.apiResponse.replaceAll("\"X\"", "");
	}

    callAPI() {
        fetch("/api/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
		this.timer = setInterval(() => this.refreshGames(), 5000);
		
    }

    render() {
		
		var output = [];
		var game = this.state.apiResponse.split(",");
		console.log(game);
		for(var i=0; i < 50; i= i + 10) {
			if(game[i] == undefined)
				break;
			var winner = "Winner: " +game[0+i];
			output.push(<div className = "pastGame">
					<div className="status">{winner}</div>
					<div className="board-row">
						<button className="square">{game[1+i]}</button>
						<button className="square">{game[2+i]}</button>
						<button className="square">{game[3+i]}</button>
					</div>
					<div className="board-row">
						<button className="square">{game[4+i]}</button>
						<button className="square">{game[5+i]}</button>
						<button className="square">{game[6+i]}</button>
					</div>
					<div className="board-row">
						<button className="square">{game[7+i]}</button>
						<button className="square">{game[8+i]}</button>
						<button className="square">{game[9+i]}</button>
					</div>
				</div>);
		}
		return (
		<div className="centered">
			<h2>Past Games</h2>
			{output}
		</div>);
    }
}
export default fromServer;


// ========================================

