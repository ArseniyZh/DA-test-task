import React, { useState } from 'react';
import cookie from 'react-cookies';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TOKEN_NAME } from '../../../constants';
import { userLoginRequest } from '../../../requests/userRequests';
import { ShowAlert } from '../../../utils/alerts_utils';
import { OuterCard } from '../../OuterCard';
import { MyButton } from '../../buttons/MyButton';
import { MODELS } from '../../../utils/urls/model_urls';

const LoginForm = () => {
	document.title = 'Вход';
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		if (!username || !password) {
			ShowAlert.warning({message: 'Заполните все поля'});
			return;
		};

		userLoginRequest({ username: username, password: password })
		.then(response => {
			return response.json();
		})
		.then(data => {
			if (data.detail) {
				ShowAlert.error({message: data.detail});
				return;
			};

			cookie.save(TOKEN_NAME, data.token, {path: '/'});
			navigate(MODELS);
		});
	};

	return (
		<OuterCard>
			<h1 style={{textAlign: 'center'}}>Вход</h1>
			<hr/>
			<Form>
				<Form.Group controlId='formLoginUsername'>
					<Form.Label>Имя пользователя:</Form.Label>
					<Form.Control
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId='formLoginPassword'>
					<Form.Label>Пароль:</Form.Label>
					<Form.Control
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>

				<MyButton style={{width: '100%'}} className='mt-3' variant='success' type='button' onClick={handleLogin} shadowColor='green'>
					Войти
				</MyButton>
			</Form>
		</OuterCard>
	);
};

export default LoginForm;
