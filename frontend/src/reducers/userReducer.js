import usersService from '../services/signUp';

//JUST KEEPING THIS HERE IN CASE I WANT TO ADD A KIND OF TWEETERLIKE WALL OR SOMETHING

const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_USER':
            return action.data
        default:
            return state;
    };
};

export const getUsers = () => {
    return async dispatch => {
        try {
            const users = await usersService.getUsers();
            dispatch({
                type: 'INIT_USERS',
                data: users,
            });
        } catch (error) {
            throw new Error('There are no users in the database!');
        };
    };
};

export default userReducer;