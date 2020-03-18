import React, { useState, useEffect, useCallback } from 'react'
import Aux from '../../hoc/Auxiliar/Auxiliar'
import { useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import { initIngredients, addIngredient, removeIngredient } from '../../store/actions/burgerBuilder';
import { purchaseInit } from '../../store/actions/order';
import { setAuthRedirectPath } from '../../store/actions/auth';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector(state => state.burger.ingredients);
    const price = useSelector(state => state.burger.totalPrice);
    const error = useSelector(state => state.burger.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();
    const onInitIngredients = useCallback(() => dispatch(initIngredients()), [dispatch]);
    const onIngredientAdded = ingName => dispatch(addIngredient(ingName));
    const onIngredientRemoved = ingName => dispatch(removeIngredient(ingName));
    const onInitPurchase = () => dispatch(purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
           setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => setPurchasing(false);

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ings,
    }
    
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    let orderSummery = null;
    let burger = error ? <p style={{textAlign: 'center', color: 'red'}}>Ingredients can´t be loaded</p> : <Spinner />;
    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings}/>
                <BuildControls 
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    price={price.toFixed(2)}
                    isAuth={isAuthenticated}
                    ordered={purchaseHandler}
                />
            </Aux>
        );
        orderSummery = <OrderSummery 
            ingredients={ings}
            price={price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}/>
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummery}
            </Modal>
            {burger}
        </Aux>
    );
};

export default withErrorHandler(BurgerBuilder, axios);