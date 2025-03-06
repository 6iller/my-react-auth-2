
import axios from 'axios';
import { Dispatch } from 'redux';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: { id: number; name: string };
}

interface LoginFailAction {
    type: typeof LOGIN_FAIL;
    payload: string;
}

export type AuthActionTypes = LoginSuccessAction | LoginFailAction;
export const login = (username: string, password: string) => async (dispatch: Dispatch<AuthActionTypes>) => {
    console.log('Попытка входа с:', username, password);
    try {
        const response = await axios.get('https://dummyjson.com/users');
        const users = response.data.users;

        // Ищем пользователя по имени или email
        const user = users.find((user: any) => user.firstName === username || user.email === username);

        if (user) {
            const { id, firstName: name } = user;
            dispatch({ type: LOGIN_SUCCESS, payload: { id, name } });
            console.log('Успешный вход:', user);
        } else {
            dispatch({ type: LOGIN_FAIL, payload: 'Неверные учетные данные' });
            console.log('Ошибка: Неверные учетные данные');
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: 'Ошибка входа' });
        console.error('Ошибка при входе:', error);
    }
};