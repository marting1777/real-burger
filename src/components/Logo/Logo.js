import React from 'react'
import classes from './Logo.css'
import BurgerLogoImg from '../../assets/images/burger-logo.png'

const logo = props => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={BurgerLogoImg} alt="Burger App" />
    </div>
)

export default logo