import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DiscountEvent(props){
    const[dob, setDob ] = useState(props.user)
    const[discountRules, setDiscountRules] = useState("22")
    const[startingTime, setStartingTime] = useState("2008-11-11 11:12:01")
    function get_discount()
    {
        //let start = new Date(dob);
        let end = new Date(startingTime);
        //let count = end.getFullYear() - start.getFullYear();
        console.log(props.user.dob);
        console.log(props.events);

    }
    if (props.user == null)
    return(
        <div><button onClick={()=>{console.log('bye')}}>Hello</button></div>
    )

    if (props.user != null)
    return(
        <div><button onClick={()=>get_discount()}>Hello</button></div>
    )
}

export default DiscountEvent;