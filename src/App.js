import React from 'react';
import './App.css';

import Layout from 'components/Layout/Layout';
import Ingredient from 'containers/Ingredients/Ingredients';

const App = () => {
    return (
        <div className="App">
            <Layout>
                <Ingredient />
            </Layout>
        </div>
    );
};

export default App;
