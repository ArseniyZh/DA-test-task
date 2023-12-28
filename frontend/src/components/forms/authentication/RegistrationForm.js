import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import cookie from 'react-cookies'
import { TOKEN_NAME } from '../../../constants';
import { userRegistrationRequest } from '../../../requests/userRequests';
import { ShowAlert } from '../../../utils/alerts_utils';
import { OuterCard } from '../../OuterCard';
import { MyButton } from '../../buttons/MyButton';
import { MODELS } from '../../../utils/urls/model_urls';

const RegistrationForm = () => {
	document.title = 'Регистрация';
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegistration = () => {
		if (!username || !password) {
			ShowAlert.warning({message: 'Заполните все поля'});
			return;
		};

		userRegistrationRequest({ username: username, password: password })
		.then(response => {
			return response.json();
		})
		.then(data => {
			if (data.detail) {
				ShowAlert.error({message: data.detail});
				return;
			}

			cookie.save(TOKEN_NAME, data.token, {path: '/'});
			navigate(MODELS);
		});
	};

	return (
		<OuterCard>
			<h1 style={{textAlign: 'center'}}>Регистрация</h1>
			<hr/>
			<Form>
				<Form.Group controlId='formRegisterUsername'>
					<Form.Label>Имя пользователя:</Form.Label>
					<Form.Control
						required
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId='formRegisterPassword'>
					<Form.Label>Пароль:</Form.Label>
					<Form.Control
						required
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				<MyButton style={{width: '100%'}} variant='success' type='button' className='mt-3' onClick={handleRegistration} shadowColor='green'>
					Зарегистрироваться
				</MyButton>
			</Form>
		</OuterCard>
	);
};

export default RegistrationForm;
