import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect,Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Modal } from 'react-bootstrap';
import {projectTree} from '../../../Actions/index.js';

class ProjectsListItem extends Component {
  constructor(props){
    super(props);
    this.getTaskTree = this.getTaskTree.bind(this);
  }
  getTaskTree(){
    axios.get('/allChildTasks', {params: {taskid: this.props.projectsListItem.id}})
    .then(resp => {
      let totals = resp.data.pop();
      let tree = this.props.projectsListItem;
      tree.children = resp.data;
      if (tree.status === -1) {
        tree.className = 'red-node-root';
      } else if (tree.status === 1) {
        tree.className = 'green-node-root';
      }
      tree.timeAlloted = [tree.budget_hours + totals.budgetTotal, tree.actual_hours + totals.actualTotal];
      this.props.projectTree(tree);
    })
  }

  render(){
    return(

      <div className="tasksListItemContainer">
        <div className="tasksListItemCircle">
          <img className="tasksListItemCircleImage" src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/>
        </div>
        <Link to='/tasksTree'><div className="tasksListItemTitle" onClick={this.getTaskTree}>{this.props.projectsListItem.name}</div></Link>
        <Button bsStyle="danger" style={{float: 'right'}}>Delete Project</Button>
      </div>
    )
  }

}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({projectTree}, dispatch);
}

export default connect(null, mapDispatchToProps)(ProjectsListItem);
