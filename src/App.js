import React, {Component} from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import { MenuItem, Typography, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


class App extends Component {

constructor () {
super();
this.state = {
  cards:[
   
  ]
}
}

// START Adding a card
addCard = () =>{
 let newid = this.state.cards.length+1;
 let newcards = this.state.cards.push({id:newid,card:'New card',status:'todo'});
 this.setState({
  ...this.state,
  newcards})


 }
// END Adding a card

// START Dragging a card
onDragStart = (event,id) => {
  event.dataTransfer.setData("id",id)
}
// END Dragging a card

//Dropping a card
onCardProgressDrop = (event,id) => {
  let cardid = event.dataTransfer.getData("id")
  alert(event.dataTransfer.getData("id"));
    let cards = this.state.cards.filter(card =>
      {if(card.id==cardid){
        card.status='inprogress'
      }
      return card;
    }
      );

      this.setState({
        ...this.state, 
        cards
      });

};

onCardToDoDrop = (event,id) => {
  let cardid = event.dataTransfer.getData("id")
  alert(event.dataTransfer.getData("id"));
    let cards = this.state.cards.filter(card =>
      {if(card.id==cardid){
        card.status='todo'
      }
      return card;
    }
      );
      this.setState({
        ...this.state, 
        cards
      });

};

onCardDoneDrop = (event,id) => {
  let cardid = event.dataTransfer.getData("id")
  alert(event.dataTransfer.getData("id"));
    let cards = this.state.cards.filter(card =>
      {if(card.id==cardid){
        card.status='done'
      }
      return card;
    }
      );

      this.setState({
        ...this.state, 
        cards
      });

};

onCardDragOver = (e) => {
  e.preventDefault();
  }
//Dropping a card

render () {

return (
   
<div className="boardContainer">
  <div className="pageHeading">
    <h2 className="head">My own Kanban Board</h2>

  </div>
  <div className="lanes">
  <div className="ToDo" onDragOver = {this.onCardDragOver} onDrop={(event)=>this.onCardToDoDrop(event,"")} >
    <h2 className="head">To Do</h2> <span><AddIcon cursor ="pointer" onClick={this.addCard}/></span>
    {this.state.cards.filter(card => card.status==='todo').map(matchcard =>
       <Card  key={matchcard.id} onDragStart={(event) => this.onDragStart(event, matchcard.id)} draggable style={{fontWeight:'bold',fontFamily:'calibri',margin:'5px'}} >
      <CardContent>
    <Typography style={{fontWeight:'bold'}}>{matchcard.card}</Typography>
      </CardContent>
      <CardActions>
      <Select value="todo"className="statusselector">
        <MenuItem value={'todo'}>To Do</MenuItem>
        <MenuItem value={'inprogress'}>In Progress</MenuItem>
        <MenuItem value={'done'}>Done</MenuItem>
        </Select>
      </CardActions>
    </Card>)
     };
  </div>
  <div onDragOver = {this.onCardDragOver} onDrop={(event)=>this.onCardProgressDrop(event,"")} 
  className="inProgress" >
    <h2 className="head">In Progress</h2>
  
    {this.state.cards.filter(card => card.status ==='inprogress').map(matchcard => (
    
       <Card  key={matchcard.id} onDragStart={(event) => this.onDragStart(event, matchcard.id)} draggable style={{fontWeight:'bold',fontFamily:'calibri',margin:'5px'}} >
      <CardContent>
    <Typography style={{fontWeight:'bold'}}>{matchcard.card}</Typography>
      </CardContent>
      <CardActions>
      <Select value="inprogress" className="statusselector">
        <MenuItem value={'todo'}>To Do</MenuItem>
        <MenuItem value={'inprogress'}>In Progress</MenuItem>
        <MenuItem value={'done'}>Done</MenuItem>
        </Select>
      </CardActions>
    </Card>))}

  </div>
  <div onDragOver = {this.onCardDragOver} onDrop={(event)=>this.onCardDoneDrop(event,"")} className="Done">
    <h2 className="head">Done</h2>
    {this.state.cards.filter(card => card.status ==='done').map(matchcard => (
    
    <Card  key={matchcard.id} onDragStart={(event) => this.onDragStart(event, matchcard.id)} draggable style={{fontWeight:'bold',fontFamily:'calibri',margin:'5px'}} >
   <CardContent>
 <Typography style={{fontWeight:'bold'}}>{matchcard.card}</Typography>
   </CardContent>
   <CardActions>
   <Select value="done" className="statusselector">
     <MenuItem value={'todo'}>To Do</MenuItem>
     <MenuItem value={'inprogress'}>In Progress</MenuItem>
     <MenuItem value={'done'}>Done</MenuItem>
     </Select>
   </CardActions>
 </Card>))}
  </div>
  </div>
</div>
);
}
}

export default (App);
