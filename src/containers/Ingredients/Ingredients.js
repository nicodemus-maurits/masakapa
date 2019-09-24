import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { Grid, Paper, makeStyles } from '@material-ui/core';

import { TOGGLE_SELECTED_INGREDIENT } from 'store/actions/actionConstants';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    }
}));

const Ingredient = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const unselectedIngredients = props.ingredients.filter(ing => ing.selected === false);
    const selectedIngredients = props.ingredients.filter(ing => ing.selected === true);

    let selectedIngredientsContent = <div>No Selected Ingredient</div>;
    if (selectedIngredients.length) {
        selectedIngredientsContent =
            <ul>
                {selectedIngredients.map(ing => (
                    <li key={ing.id} onClick={() => props.onToggleSelectedIngredient(ing.id)}>{ing.name}</li>
                ))}
            </ul>
    }

    return (
        <Fragment>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        {/** <Chart /> */}
                        <ul>
                            {unselectedIngredients.map(ing => (
                                <li key={ing.id} onClick={() => props.onToggleSelectedIngredient(ing.id)}>{ing.name}</li>
                            ))}
                        </ul>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        {selectedIngredientsContent}
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {/** <Orders /> */}
                        <div>ORDERS CONTENT</div>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleSelectedIngredient: (ingredientId) => dispatch({ type: TOGGLE_SELECTED_INGREDIENT, ingredientId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);
