/* 
    This ActivityList component is a grid list of all activity items shown as ActivityCards.
*/

import React from 'react'
import Activity from './Activity.js'

// Should be renamed to ActivityList for clarity
function Activities(props) {
    const activities = props.activities
    return (
        <div>
            <h1>Activities Library</h1>
            <ul>
            {/* For each activity in the activities array, pass key info to the ActivityCard and display all cards as list items */}
                {activities.map(activity => (
                    <li>
                        {/* Display an activity item as an ActivityCard instance */}
                        <Activity key={activity._id} activity={activity}></Activity>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Activities

/* 
function Activities(props) {
const activities = props.activities 
    return (
        {activities.map(activity => (
    <li key={activity._id}>
        <p>Activity Title: {activity.title}</p>
        <p>Description: {activity.description}</p>
        <p>Age Level: {activity.ageLevel.name}</p>
    </li>
))} */