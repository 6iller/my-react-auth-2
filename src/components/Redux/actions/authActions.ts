
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

        // Ищем пользователя по имени ИЛИ email (игнорируем пароль, т.к. он не хеширован в DummyJSON)
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

// import axios from 'axios';
// import { Dispatch } from 'redux';

// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAIL = 'LOGIN_FAIL';

// interface LoginSuccessAction {
//     type: typeof LOGIN_SUCCESS;
//     payload: { id: number; name: string };
// }

// interface LoginFailAction {
//     type: typeof LOGIN_FAIL;
//     payload: string;
// }

// export type AuthActionTypes = LoginSuccessAction | LoginFailAction;

// export const login = (username: string, password: string) => async (dispatch: Dispatch<AuthActionTypes>) => {
//     console.log('Попытка входа с:', username, password);
//     try {
//         // Получаем всех пользователей
//         const response = await axios.get('https://dummyjson.com/users');
//         const users = response.data.users; // Предполагается, что данные пользователей находятся в поле "users"
//         console.log('Полученные пользователи:', users);
//         // Ищем пользователя с указанным username и password
//         const user = users.find((user: any) => 
//             (user.firstName === username || user.email === username) && user.password === password
//         );

//         if (user) {
//             const { id, firstName: name } = user;

//             // Здесь можно сохранить токен, если он у вас есть
//             // localStorage.setItem('token', token);

//             dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload: { id, name },
//             });
//             console.log('Успешный вход:', user); // Логируем успешный вход
//         } else {
//             dispatch({
//                 type: LOGIN_FAIL,
//                 payload: 'Неверные учетные данные',
//             });
//             console.log('Ошибка: Неверные учетные данные'); // Логируем ошибку
//         }
//     } catch (error) {
//         dispatch({
//             type: LOGIN_FAIL,
//             payload: error.response?.data?.message || 'Ошибка входа',
//         });
//         console.error('Ошибка при входе:', error); // Логируем ошибку
//     }
// };



// // import axios from 'axios';
// // import { Dispatch } from 'redux';

// // export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// // export const LOGIN_FAIL = 'LOGIN_FAIL';

// // interface LoginSuccessAction {
// //     type: typeof LOGIN_SUCCESS;
// //     payload: { id: number; name: string };
// // }

// // interface LoginFailAction {
// //     type: typeof LOGIN_FAIL;
// //     payload: string;
// // }

// // export type AuthActionTypes = LoginSuccessAction | LoginFailAction;

// // export const login = (username: string, password: string) => async (dispatch: Dispatch<AuthActionTypes>) => {
// //     try {
// //         const response = await axios.post('https://dummyjson.com/users', {
// //             username,
// //             password,
// //         });

// //         const { id, name, token } = response.data;

// //         localStorage.setItem('token', token);

// //         dispatch({
// //             type: LOGIN_SUCCESS,
// //             payload: { id, name },
// //         });
// //     } catch (error) {
// //         dispatch({
// //             type: LOGIN_FAIL,
// //             payload: error.response.data.message || 'Ошибка входа',
// //         });
// //     }
// // };
