import React from 'react'
import classes from './CheckoutSummery.css'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummery = props => {
    return (
        <div className={classes.CheckoutSummery}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummery