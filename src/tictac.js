import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Square function: Manages a square on the board
function Square(props) {
	return (
		//renders the square as a weird button
		//the caller, props, manages the square's value and what to do onClick
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
	
}

//calculateWinner function: Checks for if somebody won the game
function calculateWinner(squares) {
  const lines = [ //list of winning lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) { //iterate through the list
    const [a, b, c] = lines[i]; //store each line as a, b, and c
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { //check if the lines match
      return squares[a];
    }
  }
  if(squares.includes(null))
	  return null; //if no matchand there's still empty squares
  else
	return 'Draw'; //else a draw
}

//Board component: Represents the whole game board, including squares
class Board extends React.Component {
	//Board constructor
	constructor(props) {
		super(props);
		this.state = { //creates an array to hold the square's states all set to null
			squares: Array(9).fill(null),
			xIsNext: true, //x first by default, gets flipped each move
		};
	}
	
	
	//handleClick method: Handles a square getting clicked
	handleClick(i) {
	const squares = this.state.squares.slice(); //effectivly copies the squares array locally
	if(squares[i] || calculateWinner(squares)) //stops input if somebody won or the square is taken
		return;
	squares[i] = this.state.xIsNext ? 'X' : 'O'; //if(xIsNext) 'X' else 'O'
	this.setState({
		squares: squares, //sets Board.squares to this.squares
		xIsNext: !this.state.xIsNext, //flips xIsNext
		}); 
	}
		
  //renderSquare method: Renders each square on the board	
  renderSquare(i) {
    return <Square 
	value={this.state.squares[i]} //gets the square's value squares[]
	onClick={() => this.handleClick(i)} //onClick points to handleClick
	/>;
  }

  render() {
	var submitGame;
    const winner = calculateWinner(this.state.squares);
	var status;
	if(winner) {
		status = 'Winner: ' +winner;
		submitGame = (<form action="/api/testAPI/send" method="POST">
		<h3>Submit Game</h3>
		<input type="hidden" id="game" name="game" value={calculateWinner(this.state.squares) + "," +this.state.squares}></input>
		<button type ="submit">Submit</button>
		</form>);
	}
	else
		status = (this.state.xIsNext ? 'X' : 'O') +"'s turn";

	//renders the board as a set of 3x3 squares and a next player text
    return ( 
      <div>
        <div className="status">{status}</div>
		<div className="status">{submitGame}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//game component: Basically represents the webpage at this point, renders a board and others
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);