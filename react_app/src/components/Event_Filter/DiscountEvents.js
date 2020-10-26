import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DiscountEvent(props){
    const[dob, setDob ] = useState(props.user)
    const[discountRules, setDiscountRules] = useState(props.event.discount_rules)
    const[startingTime, setStartingTime] = useState(props.event.starting_time)
    function get_discount()
    {
        //let start = new Date(dob);
        let end = new Date(startingTime);
        //let count = end.getFullYear() - start.getFullYear();
        console.log(props.user);
        console.log(props.event);

    }
    if (props.user == null)
    return(
        <div><button onClick={()=>get_discount()}>Hello</button></div>
    )

    if (props.user != null)
    return(
        <div><button onClick={()=>get_discount()}>Hello</button></div>
    )
}

export default DiscountEvent;