import React from 'react';
import { useState } from 'react';
import { useTheme } from '../ThemeWrapper/ThemeWrapper.tsx';
import './Header.css';
import FormPractice from '../../components/Button/Form.tsx'
import Modal from '../../components/Modal/Modal.tsx'


const Header: React.FC = () => {
    const { toggleTheme, isDarkTheme } = useTheme();
    const [modalOpen, setModalOpen] = useState(false);

    const handleSignIn = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <header>

            <button
                className={`toggleButton ${isDarkTheme ? 'dark-theme-button' : 'light-theme-button'}`}
                onClick={toggleTheme}
            >
                {isDarkTheme ? "Light on" : "Light off"}
            </button>
            <button className='registerButton' onClick={handleSignIn}>
                Sign in
            </button>
            <div className="nav_bottom_panel">
                        <a className="nav_bottom_panel_links" href="/">О нас</a>
                        <a className="nav_bottom_panel_links" href="/">Галерея</a>
                        <a className="nav_bottom_panel_links" href="/">Блог</a>
                        <a className="nav_bottom_panel_links" href="/">Контакты</a>
                    </div>

           {/* модальное окно */}
            {modalOpen && (
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <FormPractice />
                </Modal>
            )}
        </header>
    );
};

export default Header;