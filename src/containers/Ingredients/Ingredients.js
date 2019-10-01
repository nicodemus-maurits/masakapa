import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { Grid, Paper, makeStyles, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
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
    const [currentlyDisplayed, setCurrentlyDisplayed] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        setCurrentlyDisplayed(props.unselectedIngredients);
    }, [props.unselectedIngredients]);

    const onFilter = event => {
        setSearchTerm(event.target.value);

        let curList = [];
        let newList = [];

        if (event.target.value !== '') {
            curList = props.unselectedIngredients;
            newList = curList.filter(ing => {
                const lc = ing.name.toLowerCase();
                const filter = event.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = props.unselectedIngredients;
        }
        setCurrentlyDisplayed(newList);
    }

    const onSelectedIngredient = id => {
        setSearchTerm('');
        props.onToggleSelectedIngredient(id);
    }

    let selectedIngredientsContent = <div>No Selected Ingredient</div>;
    if (props.selectedIngredients.length) {
        selectedIngredientsContent =
            <List aria-label="Ingredient List">
                {props.selectedIngredients.map(ing => (
                    <ListItem button key={ing.id} onClick={() => onSelectedIngredient(ing.id)}>
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
                        <TextField
                            label="Search"
                            onChange={onFilter}
                            margin="normal"
                            value={searchTerm}
                        />
                        {/** <Chart /> */}
                        <List aria-label="Ingredient List">
                            {currentlyDisplayed.map(ing => (
                                <ListItem button key={ing.id} onClick={() => onSelectedIngredient(ing.id)}>
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
        selectedIngredients: state.ingredients.ingredients.filter(ing => ing.selected === true),
        unselectedIngredients: state.ingredients.ingredients.filter(ing => ing.selected === false)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleSelectedIngredient: (ingredientId) => dispatch({ type: TOGGLE_SELECTED_INGREDIENT, ingredientId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);
