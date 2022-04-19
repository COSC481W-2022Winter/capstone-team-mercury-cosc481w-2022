import React from 'react';
import './placeholderpost.css';
 
const noPostsPlaceholder = () => {
	return (
		<div className="default-div">
			<h4></h4>
			<p><small></small></p>
			<p>There's nothing here... yet! Follow other users and their posts will show up here.</p>
		</div>
	);
}
 
 
 
export default noPostsPlaceholder;