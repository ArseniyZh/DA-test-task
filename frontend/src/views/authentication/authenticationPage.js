import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RegistrationForm from '../../components/forms/authentication/RegistrationForm';
import LoginForm from '../../components/forms/authentication/LoginForm';
import { MyButton } from  '../../components/buttons/MyButton';

const AuthenticationPage = () => {
	const [isLoginMode, setIsLoginMode] = useState(false);

	const handleToggleMode = () => {
		setIsLoginMode(!isLoginMode);
	};

  	return (
		<Container className="mt-5">
			<Row className="justify-content-center">
				<Col md={6}>
					{isLoginMode ? (
						<LoginForm />
					) : (
						<RegistrationForm />
					)}
					<MyButton variant="primary" type="button" onClick={handleToggleMode} className="mt-2" shadowColor="blue">
						{isLoginMode ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
					</MyButton>
				</Col>
			</Row>
		</Container>
	);
};

export default AuthenticationPage;
