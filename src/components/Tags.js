import React, { Component } from 'react';

class TagList extends React.Component {
  constructor(props) {
    super();
    
    this.state = {
      tagList : props.tagList
    };
  }

  render () {
    return(
      this.state.tagList.map((tag) => (
        <span>#{tag + " "}</span>
      ))
    );
  } // end render

} // end TagList component

export default TagList;
