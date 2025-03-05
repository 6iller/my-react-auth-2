import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button.tsx";
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, LOGIN_SUCCESS, LOGIN_FAILURE } from '../Redux/actions/authActions';
import { RootState } from '../Redux/store';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal.tsx';

interface InputValues {
    email: string;
    password: string;
}

export default function FormPractice() {
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector((state: RootState) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<InputValues>();

    const onSubmit: SubmitHandler<InputValues> = (data) => {
        dispatch(login(data.email, data.password));
    };

    useEffect(() => {
        const handleSuccess = () => {
            setModalMessage('Вход выполнен!');
            setIsOpen(true);
        };

        const handleFailure = () => {
            setModalMessage(error || 'Неверные учетные данные'); // используем error из store, если есть
            setIsOpen(true);
        };

        if (isAuthenticated) {
            handleSuccess();
        } else if (error) {
            handleFailure();
        }
    }, [isAuthenticated, error]);


    return (
        <>
            {!isAuthenticated ? (
                <form className="form-input" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Введите email</label>
                        <input className="input" type="email" {...register("email", { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ })} />
                        {errors.email && <p className="error">Поле Email обязательное и должно быть email адресом</p>}
                    </div>
                    <div>
                        <label>Введите пароль</label>
                        <input className="input" type="password" {...register("password", { required: true, minLength: 4 })} />
                        {errors.password && <p className="error">Поле Пароль обязательное и должно содержать не менее 4 символов</p>}
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Вход...' : 'Войти'}
                    </Button>
                </form>
            ) : (
                <p>Вход выполнен!</p>
            )}

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2>{modalMessage}</h2>
            </Modal>
        </>
    );
}

// import { useForm, SubmitHandler } from "react-hook-form";
// import Button from "./Button.tsx";
// import './Form.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../Redux/actions/authActions';
// import { RootState } from '../Redux/store/store.ts';
// import { useEffect, useState } from 'react';
// import Modal from '../Modal/Modal.tsx';

// interface InputValues {
//     name: string;
//     email: string;
//     password: string;
// }

// export default function FormPractice() {
//     const dispatch = useDispatch();
//     const { isAuthenticated, error, loading } = useSelector((state: RootState) => state.auth);
//     const [isOpen, setIsOpen] = useState(false);
//     const [modalMessage, setModalMessage] = useState('');

//     const { register, handleSubmit, formState: { errors } } = useForm<InputValues>();

//     const onSubmit: SubmitHandler<InputValues> = (data) => {
//         dispatch(login(data.email, data.password));
//         setIsOpen(true);
//     };

//     useEffect(() => {
//         if (isAuthenticated) {
//             setModalMessage('Добро пожаловать!');
//             //Optional: Redirect to another page after successful login
//         } else if (error) {
//             setModalMessage(error);
//             setIsOpen(true);
//         } else if (!isAuthenticated && isOpen) {
//             setModalMessage('Вход не выполнен');
//         }
//     }, [isAuthenticated, error, isOpen]);

//     return (
//         <>
//             {!isAuthenticated ? (
//                 <form className="form-input" onSubmit={handleSubmit(onSubmit)}>
//                     <div>
//                         <label>Введите имя</label>
//                         <input className="input" type="text" {...register("name", { required: true })} />
//                         {errors.name && <p className="error">Поле Имя обязательное</p>}
//                     </div>
//                     <div>
//                         <label>Введите email</label>
//                         <input className="input" type="email" {...register("email", { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ })} />
//                         {errors.email && <p className="error">Поле Email обязательное и должно быть email адресом</p>}
//                     </div>
//                     <div>
//                         <label>Введите пароль</label>
//                         <input className="input" type="password" {...register("password", { required: true, minLength: 4 })} />
//                         {errors.password && <p className="error">Поле Пароль обязательное и должно содержать не менее 4 символов</p>}
//                     </div>
//                     <Button type="submit" disabled={loading}>
//                         {loading ? 'Вход...' : 'Войти'}
//                     </Button>
//                     {error && <p className="error">{error}</p>}
//                 </form>
//             ) : (
//                 <p>Вход выполнен!</p>
//             )}

//             <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
//                 <h2>{modalMessage}</h2>
//             </Modal>
//         </>
//     );
// }

// import { useForm, SubmitHandler } from "react-hook-form";
// import Button from "./Button.tsx";
// import './Form.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../Redux/actions/authActions.ts';
// import { RootState } from '../Redux/store/store.ts'; // Импортируйте тип корневого состояния
// import { useEffect, useState } from 'react';
// import Modal from '../Modal/Modal.tsx'; // Импортируйте ваш компонент Modal

// interface InputValues {
//     name: string;
//     email: string;  
//     password: string;
// }

// export default function FormPractice() {
//     const dispatch = useDispatch();
//     const { isAuthenticated, error } = useSelector((state: RootState) => state);
//     const [isOpen, setIsOpen] = useState(false); 

    
//     const { register, handleSubmit, formState: { errors } } = useForm<InputValues>();

//     const onSubmit: SubmitHandler<InputValues> = (data) => {
//         console.log("Форма отправлена!", data);
//         dispatch(login(data.email, data.password)); 
//         setIsOpen(true); // Открываем модальное окно после отправки формы
//     };

//     useEffect(() => {
//         if (isAuthenticated) {
//             setIsOpen(true); // Открываем модальное окно при успешном входе
//         }
//     }, [isAuthenticated]);

//     return (
//         <>
//             {!isAuthenticated ? (
//                 <form className="form-input" onSubmit={handleSubmit(onSubmit)}>
//                     <div>
//                         <label>Введите имя</label>
//                         <input className="input" type="text" {...register("name", { required: true })} />
//                         {errors.name && <p className="error">Поле Имя обязательное</p>}
//                     </div>
//                     <div>
//                         <label>Введите email</label>
//                         <input className="input" type="email" {...register("email", { required: true, pattern: /^[^@]+@[^@]+.[^@]+$/ })} />
//                         {errors.email && <p className="error">Поле Email обязательне и должно быть email адресом</p>}
//                     </div>
//                     <div>
//                         <label>Введите пароль</label>
//                         <input className="input" type="password" {...register("password", { required: true, minLength: 4 })} />
//                         {errors.password && <p className="error">Поле Пароль обязательное и должно содержать не менее 4 символов</p>}
//                     </div>
//                     <Button type="submit">Отправить</Button>
//                     {error && <p className="error">{error}</p>}
//                 </form>
//             ) : (
//                 <p>Вход выполнен!</p>
//             )}

//             {/* Модальное окно */}
//             <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
//                 <h2>Добро пожаловать!</h2>
//                 <p>Вы успешно вошли в систему.</p>
//             </Modal>
//         </>
//     );
// }
// interface InputValues {
//     name: string;
//     email: string;
//     password: string;
// }

// export default function FormPractice() {
//     const dispatch = useDispatch();
//     const { isAuthenticated, error } = useSelector((state: RootState) => state);
//     const [isOpen, setIsOpen] = useState(false); 

//     const { register, handleSubmit, formState: { errors } } = useForm<InputValues>();

//     const onSubmit: SubmitHandler<InputValues> = (data) => {
//         console.log("Форма отправлена!", data);
//         dispatch(login(data.email, data.password)); 
//         setIsOpen(true); // Открываем модальное окно после успешного входа
//     };

//     useEffect(() => {
//         if (isAuthenticated) {
//             setIsOpen(false); 
//         }
//     }, [isAuthenticated]);

//     return (
//         <>
//             <form className="form-input" onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <label>Введите имя</label>
//                     <input className="input" type="text" {...register("name", { required: true })} />
//                     {errors.name && <p className="error">Поле Имя обязательное</p>}
//                 </div>
//                 <div>
//                     <label>Введите email</label>
//                     <input className="input" type="email" {...register("email", { required: true, pattern: /^[^@]+@[^@]+.[^@]+$/ })} />
//                     {errors.email && <p className="error">Поле Email обязательне и должно быть email адресом</p>}
//                 </div>
//                 <div>
//                 <label>Введите пароль</label>
//                     <input className="input" type="password" {...register("password", { required: true, minLength: 4 })} />
//                     {errors.password && <p className="error">Поле Пароль обязательное и должно содержать не менее 4 символов</p>}
//                 </div>
//                 <Button type="submit">Отправить</Button>
//                 {isAuthenticated && <p>Вход выполнен!</p>}
//                 {error && <p className="error">{error}</p>}
//             </form>

//             {/* Модальное окно */}
//             <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
//                 <h2>Добро пожаловать!</h2>
//                 <p>Вы успешно вошли в систему.</p>
//             </Modal>
//         </>
//     );
// }


// export default function FormPractice() {
//     const dispatch = useDispatch();
//     const { isAuthenticated, error } = useSelector((state: RootState) => state); // Получаем состояние аутентификации

//     const { register, handleSubmit, formState: { errors } } = useForm<InputValues>();

//     const onSubmit: SubmitHandler<InputValues> = (data) => {
//         console.log("Форма отправлена!", data);
//         dispatch(login(data.email, data.password)); // Используем email как имя пользователя
//     };

//     return (
//         <form className="form-input" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//             <label>Введите имя</label>
//                 <input className="input" type="text" {...register("name", { required: true })} />
//                 {errors.name && <p className="error">Поле Имя обязательное</p>}
//             </div>
//             <div>
//                 <label>Введите email</label>
//                 <input className="input" type="email" {...register("email", { required: true, pattern: /^[^@]+@[^@]+.[^@]+$/ })} />
//                 {errors.email && <p className="error">Поле Email обязательне и должно быть email адресом</p>}
//             </div>
//             <div>
//                 <label>Введите пароль</label>
//                 <input className="input" type="password" {...register("password", { required: true, minLength: 4 })} />
//                 {errors.password && <p className="error">Поле Пароль обязательное и должно содержать не менее 4 символов</p>}
//             </div>
//             <Button type="submit">Отправить</Button>
//             {isAuthenticated && <p>Вход выполнен!</p>}
//             {error && <p className="error">{error}</p>}
//         </form>
//     );
// }



{/* // import { useForm, SubmitHandler } from "react-hook-form";
// import Button from "./Button.tsx";
// import './Form.css';

// interface InputValues {
//     name: string;
//     email: string;
//     password: string;
// }

// export default function FormPractice() {
//     const { register, handleSubmit, formState: { errors } } = useForm<InputValues>(); // useForm с InputValues

//     const onSubmit: SubmitHandler<InputValues> = (data) => {
//         console.log("Форма отправлена!", data); 
//     };

//     return (
//         <form className="form-input" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//                 <label>Введите имя</label>
//                 <input className="input" type="text" {...register("name", { required: true })} />
//                 {errors.name && <p className="error">Поле Имя обязательное</p>}
//             </div>
//             <div>
//                 <label>Введите email</label>
//                 <input className="input" type="email" {...register("email", { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ })} />
//                 {errors.email && <p className="error">Поле Email обязательне и должно быть email адресом</p>}
//             </div>
//             <div>
//                 <label>Введите пароль</label>
//                 <input className="input" type="password" {...register("password", { required: true, minLength: 4 })} />
//                 {errors.password && <p className="error">Поле Пароль обязательное и должно содержать не менее 4 символов</p>}
//             </div>
//             <Button type="submit">Отправить</Button>
//         </form>
//     );
// } */}
