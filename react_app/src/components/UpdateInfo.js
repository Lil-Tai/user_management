import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function UpdateInfo(props) {
    const { handleSubmit, register, control, errors } = useForm({}); 

    const onSubmit = data => {
        var datePic = moment(data.ReactDatepicker).utc().format('MM/DD/YYYY')
        console.log(datePic)
        axios.put('https://liltaiapi.herokuapp.com/user/' + props.username, {
            last_name: data.lastName,
            first_name: data.firstName,
            dob: datePic,
            gender: data.gender,
            occupation: data.occupation,
            address: data.address,
            email: data.email,
            phone_number: data.phone_number
        })
    };

    const onReset = data => {
        console.log(data.password)
        if(data.Confirmpassword === data.password){
            axios.put('https://liltaiapi.herokuapp.com/forgot/' + props.username, {
                password: data.password
            })
        }else{
            alert("passswrong")
        }  
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label htmlFor="lastName">Last Name</label>
            <input name="lastName" ref={register} />
            </div>
            <div>
            <label htmlFor="firstName">First Name</label>
            <input name="firstName" ref={register} />
            </div>

        
            <div>
            <label htmlFor="dob">dob</label>
            <Controller
                control={control}
                name="ReactDatepicker"
                render={({ onChange, onBlur, value}) => (
                <ReactDatePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                />
                )}
            />
            </div>

            <div>
            <label htmlFor="gender">gender</label>
            <select name="gender" ref={register}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
            </select>
            </div>

            <div>
            <label htmlFor="occupation">Occupation</label>
            <select name="occupation" ref={register}>
                <option value="student">student</option>
                <option value="employee">employee</option>
                <option value="other">other</option>
            </select>
            </div>
            <div>
            <label htmlFor="address">Address</label>
            <input name="address" ref={register} />
            </div>
            <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="email" ref={register({
                required: "Required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                }
            })} />
            {errors.email && errors.email.message}
            </div>
            <div>
            <label htmlFor="phone_number">phone_number</label>
            <input name="phone_number" type="number" ref={register} />
            </div>


            <button type="submit">Submit</button>
            </form>

            
            <Popup trigger={<button> Trigger</button>} position="right center" >
                <form onSubmit={handleSubmit(onReset)} >
                <div>
                <label htmlFor="CurrentPassword">Password</label>
                <input name="CurrentPassword" type="password" />
                </div>
                <div>
                <label htmlFor="password">Last Name</label>
                <input name="password" type="password" ref={register} />
                </div>
                <div>
                <label htmlFor="Confirmpassword">Last Name</label>
                <input name="Confirmpassword" type="password"ref={register} />
                </div>
                <button type="submit">Submit</button>
                </form>
            </Popup>
            
            
        </div>
    )
}



