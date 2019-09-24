import { ADD_RECIPE, REMOVE_RECIPE } from 'store/actions/actionConstants';

const initialState = {
    recipes: [
        { id: 0, name: 'Ayam Mentega', recipe: ['0', '1', '2', '3'] },
        { id: 1, name: 'Nasi Goreng', recipe: ['4', '5'] }
    ]
};

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECIPE:
            return {
                recipes: state.recipes.concat(action.recipe)
            };

        case REMOVE_RECIPE:
            return {
                recipes: state.recipes.filter(recipe => recipe.id !== action.recipeId)
            };

        default:
            return state;
    }
}

export default recipesReducer;
