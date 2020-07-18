import React, {Component} from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import { MenuItem, Button, Typography, makeStyles, TextField, ClickAwayListener } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import $ from 'jquery';


class App extends Component {
constructor () {
super();
this.state = {
  cards:[],
  numOfToDo:0,
  numOfInProgress:0,
  numOfDone:0
}
}

// START Adding a card
addCard = () =>{
 

  let notidata = JSON.stringify({
    "id": 0,
    "title": "title",
    "status": "todo"
      });

   let that = this;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200) {
      // Typical action to be performed when the document is ready:
     var allcards = JSON.parse(xhr.responseText).filter(card => {return card});
     that.setState(
       {
         cards:allcards
       });
     }
  } 
  xhr.open("POST", "http://localhost:8080/addcard");
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.send(notidata);
 }
// END Adding a card

// START Dragging a card
onDragStart = (event,id) => {
  event.dataTransfer.setData("id",id)
}
// END Dragging a 

onTempTitleUpdate=(event,id)=>{
let den = event.target.value
let cards = this.state.cards.filter((card)=> {
  if(card.id===id){
    card.title=den
  }
  return card;
})
this.setState({
  ...this.state,
  cards
});
}

onUpdate= (event, id) => {

  let cardid = id;
  let cardtitle = document.getElementById(id+"title").value;

  let dummy = JSON.stringify({
    "id":cardid,
    "title":cardtitle
  });
  alert(document.getElementById(id+"title").value)
  alert(cardid);
   
  let that = this;
  let xhrtitleupdate = new XMLHttpRequest();
  xhrtitleupdate.onreadystatechange = function() {
    if(this.readyState===4 && this.status===200){
      var allcards = JSON.parse(xhrtitleupdate.responseText);
      that.setState(
        {
          cards:allcards
        });

    }

  };
  xhrtitleupdate.open("POST","http://localhost:8080/updatetitle/");
  xhrtitleupdate.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhrtitleupdate.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhrtitleupdate.send(dummy);
}

//Dropping a card
onCardProgressDrop = (event,id) => {
  let dummy = null;
  let cardid = event.dataTransfer.getData("id")
  alert(event.dataTransfer.getData("id"));
   
  let that = this;
  let xhrtoprogress = new XMLHttpRequest();
  xhrtoprogress.onreadystatechange = function() {
    if(this.readyState===4 && this.status===200){
      var allcards = JSON.parse(xhrtoprogress.responseText);
      that.setState(
        {
          cards:allcards
        });

    }

  };
  xhrtoprogress.open("GET","http://localhost:8080/toprogress/"+cardid);
  xhrtoprogress.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhrtoprogress.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhrtoprogress.send(dummy);

};

onCardToDoDrop = (event,id) => {
  let dummy = null;
  let cardid = event.dataTransfer.getData("id")
  alert(event.dataTransfer.getData("id"));
  let that = this;
  let xhrtodo = new XMLHttpRequest();
  xhrtodo.onreadystatechange = function() {
    if(this.readyState===4 && this.status===200){
      var allcards = JSON.parse(xhrtodo.responseText);
      that.setState(
        {
          cards:allcards
        });

    }

  };
  xhrtodo.open("GET","http://localhost:8080/todo/"+cardid);
  xhrtodo.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhrtodo.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhrtodo.send(dummy);
};

onCardDoneDrop = (event,id) => {
  let dummy = null;
  let cardid = event.dataTransfer.getData("id")
  alert(event.dataTransfer.getData("id"));
   
  let that = this;
  let xhrtodone = new XMLHttpRequest();
  xhrtodone.onreadystatechange = function() {
    if(this.readyState===4 && this.status===200){
      var allcards = JSON.parse(xhrtodone.responseText);
      that.setState(
        {
          cards:allcards
        });

    }

  };
  xhrtodone.open("GET","http://localhost:8080/todone/"+cardid);
  xhrtodone.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhrtodone.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhrtodone.send(dummy);
};

onCardDragOver = (e) => {
  e.preventDefault();
  }
//Dropping a card

componentWillMount() {
  let dummy = null;
  let that = this;
  let xhrlistall = new XMLHttpRequest();
  xhrlistall.onreadystatechange = function() {
    if(this.readyState===4 && this.status===200){
      var allcards = JSON.parse(xhrlistall.responseText);
      let numOfToDo=0;
      let numOfInProgress=0;
      let numOfDone=0;

      let temp = allcards.filter(card => {
        if(card.status==="todo"){
          numOfToDo++;
        }
        if(card.status==="inprogress"){
          numOfInProgress++;
        }
        if(card.status==="done"){
          numOfDone++;
        }
      });


      that.setState(
        {
          cards:allcards,
          numOfToDo:numOfToDo,
          numOfInProgress:numOfInProgress,
          numOfDone:numOfDone
        });

    }

  };
  xhrlistall.open("GET","http://localhost:8080/listall/");
  xhrlistall.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhrlistall.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhrlistall.send(dummy);
  


 

};

componentDidMount() {


};

render () {

return (
   
<div className="boardContainer">
  <div className="pageHeading">
    <h2 className="head">My own Kanban Board</h2>

  </div>
  <div className="lanes">
  <div className="ToDo" onDragOver = {this.onCardDragOver} onDrop={(event)=>this.onCardToDoDrop(event,"")} >
<h2 className="head">To Do<span className="todotaskcount"> {this.state.numOfToDo} Tasks</span></h2> <span><AddIcon cursor ="pointer" onClick={this.addCard}/></span>

    {this.state.cards.filter(card => card.status==='todo').map(matchcard =>
       <Card  key={matchcard.id}  onDragStart={(event) => this.onDragStart(event, matchcard.id)} draggable style={{fontWeight:'bold',fontFamily:'calibri',margin:'5px'}} >
      <CardContent>
    <Typography style={{fontWeight:'bold'}}>{matchcard.title}</Typography>
    <TextField id={matchcard.id+"title"} onChange={(event)=>this.onTempTitleUpdate(event,matchcard.id)} 
    value={matchcard.title} label="Add task"></TextField>
      </CardContent>
      <CardActions>
      <Select value="todo"className="statusselector">
        <MenuItem value={'todo'}>To Do</MenuItem>
        <MenuItem value={'inprogress'}>In Progress</MenuItem>
        <MenuItem value={'done'}>Done</MenuItem>
        </Select>
        <Button style={{marginLeft:"60%"}}onClick={(event)=>this.onUpdate(event,matchcard.id)}>Update</Button>
      </CardActions>
    </Card>)
     }; 
  </div>
  <div onDragOver = {this.onCardDragOver} onDrop={(event)=>this.onCardProgressDrop(event,"")} 
  className="inProgress" >
    <h2 className="head">In Progress<span className="inprogresstaskcount"> {this.state.numOfInProgress} Tasks</span></h2>
  
    {this.state.cards.filter(card => card.status ==='inprogress').map(matchcard => (
    
       <Card  key={matchcard.id} onDragStart={(event) => this.onDragStart(event, matchcard.id)} draggable style={{fontWeight:'bold',fontFamily:'calibri',margin:'5px'}} >
      <CardContent>
      <TextField id={matchcard.id+"title"} onChange={(event)=>this.onTempTitleUpdate(event,matchcard.id)} 
    value={matchcard.title} label="Add task"></TextField>
      </CardContent>
      <CardActions>
      <Select value="inprogress" className="statusselector">
        <MenuItem value={'todo'}>To Do</MenuItem>
        <MenuItem value={'inprogress'}>In Progress</MenuItem>
        <MenuItem value={'done'}>Done</MenuItem>
        </Select>
        <Button style={{marginLeft:"60%"}}onClick={(event)=>this.onUpdate(event,matchcard.id)}>Update</Button>
      </CardActions>
    </Card>))}

  </div>
  <div onDragOver = {this.onCardDragOver} onDrop={(event)=>this.onCardDoneDrop(event,"")} className="Done">
    <h2 className="head">Done<span className="donetaskcount"> {this.state.numOfDone} Tasks</span></h2>
    {this.state.cards.filter(card => card.status ==='done').map(matchcard => (
    
    <Card  key={matchcard.id} onDragStart={(event) => this.onDragStart(event, matchcard.id)} draggable style={{fontWeight:'bold',fontFamily:'calibri',margin:'5px'}} >
   <CardContent>
   <TextField id={matchcard.id+"title"} onChange={(event)=>this.onTempTitleUpdate(event,matchcard.id)} 
    value={matchcard.title} label="Add task"></TextField>
   </CardContent>
   <CardActions>
   <Select value="done" className="statusselector">
     <MenuItem value={'todo'}>To Do</MenuItem>
     <MenuItem value={'inprogress'}>In Progress</MenuItem>
     <MenuItem value={'done'}>Done</MenuItem>
     </Select>
     <Button style={{marginLeft:"60%"}}onClick={(event)=>this.onUpdate(event,matchcard.id)}>Update</Button>
   </CardActions>
 </Card>))}
  </div>
  </div>
</div>
);
}
}

export default (App);
