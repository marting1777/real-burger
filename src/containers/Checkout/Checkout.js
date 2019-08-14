import React, { Component } from 'react'

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1,
        }
    }

    render () {
        return (
            <div>
                <CheckoutSummery ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default Checkout