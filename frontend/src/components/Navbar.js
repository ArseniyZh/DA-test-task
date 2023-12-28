import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import cookie from 'react-cookies';
import { MODELS } from '../utils/urls/model_urls';
import { AuthenticationRoutePath } from '../routers/AppRouter'
import 'react-toggle/style.css';
import { TOKEN_NAME } from '../constants';

const MyNavbar = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleLogout = () => {
		cookie.remove(TOKEN_NAME);
	};

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === 'Escape') {
				handleGoBack();
			};
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	});

	return (
		<Navbar expand='lg' style={{boxShadow: '0 0 6px gray'}}>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav' style={{ justifyContent: 'flex-end' }}>
				<Nav style={{marginRight: '20px'}}>
					<Nav.Link as={Link} to={MODELS} style={{fontWeight: 'bold'}}>
						Модели
					</Nav.Link>
					<Nav.Link as={Link} to={AuthenticationRoutePath} onClick={handleLogout}>
						Выйти
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default MyNavbar;
