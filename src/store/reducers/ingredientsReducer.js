import { ADD_INGREDIENT, REMOVE_INGREDIENT, TOGGLE_SELECTED_INGREDIENT } from 'store/actions/actionConstants';

const initialState = {
    ingredients: [
        { id: '0', name: 'Dada Ayam', selected: false },
        { id: '1', name: 'Bawang putih', selected: false },
        { id: '2', name: 'Jahe', selected: false },
        { id: '3', name: 'Bawang bombay', selected: false },
        { id: '4', name: 'Nasi', selected: false },
        { id: '5', name: 'Kecap Manis', selected: false }
    ]
};

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ingredients: state.ingredients.concat(action.ingredient)
            };

        case REMOVE_INGREDIENT:
            return {
                ingredients: state.ingredients.filter(ing => ing.id !== action.ingredientId)
            };

        case TOGGLE_SELECTED_INGREDIENT:
            const index = state.ingredients.findIndex(ing => ing.id === action.ingredientId)
            const updatedData = [...state.ingredients];
            updatedData[index].selected = !updatedData[index].selected;
            return {
                ingredients: updatedData
            };

        default:
            return state;
    }
}

export default ingredientsReducer;
