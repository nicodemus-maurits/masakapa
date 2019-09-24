import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import KitchenIcon from '@material-ui/icons/Kitchen';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

export const mainMenu = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <KitchenIcon />
            </ListItemIcon>
            <ListItemText primary="Ingredients" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Recipes" />
        </ListItem>
    </div>
);

export const secondaryMenu = (
    <div>
        <ListSubheader inset>Account Area</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
        </ListItem>
    </div>
);
