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
            setModalMessage(error || 'Неверные учетные данные');
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
                        <label>Введите email, например emily.johnson@x.dummyjson.com</label>
                        <input className="input" type="email" {...register("email", { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ })} />
                        {errors.email && <p className="error">Поле Email обязательное и должно быть email адресом</p>}
                    </div>
                    <div>
                        <label>Введите пароль, например emilyspass</label>
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
