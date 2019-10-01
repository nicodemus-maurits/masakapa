import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { Grid, Paper, makeStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';

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
            <List aria-label="Ingredient List">
                {selectedIngredients.map(ing => (
                    <ListItem button key={ing.id} onClick={() => props.onToggleSelectedIngredient(ing.id)}>
                        <ListItemText primary={ing.name} />
                        <ListItemIcon>
                            <CheckBox />
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
    }

    return (
        <Fragment>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                        {/** <Chart /> */}
                        <List aria-label="Ingredient List">
                            {unselectedIngredients.map(ing => (
                                <ListItem button key={ing.id} onClick={() => props.onToggleSelectedIngredient(ing.id)}>
                                    <ListItemText primary={ing.name} />
                                    <ListItemIcon>
                                        <CheckBoxOutlineBlank />
                                    </ListItemIcon>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={6} lg={6}>
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
