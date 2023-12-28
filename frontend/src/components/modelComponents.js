import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CARD_LINK_HEX_COLOR } from '../constants';
import { getModelListUrl } from '../utils/urls/model_urls'; 

export const ModelComponent = ({ title, count }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Card style={{ 
			minWidth: '90%',
			margin: '10px', 
			boxShadow: isHovered ? '0 16px 32px rgba(0, 150, 0, 0.2)' : '0 8px 16px rgba(0, 0, 0, 0.1)',
			transition: 'box-shadow 0.3s ease-in-out',
		}}
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
		>
			<Card.Body>
				<div style={{ display: 'flex', justifyContent: 'center', }}>
					<Card.Link style={{ color: CARD_LINK_HEX_COLOR, textDecoration: 'none' }} as={Link} to={getModelListUrl(title)}>
						<Card.Title>{title}</Card.Title>
					</Card.Link>
				</div>
				<span className='text-muted small' style={{ display: 'flex', justifyContent: 'center', }}>
					{`Кол-во: ${count}`}
				</span>
			</Card.Body>
		</Card>
	);
};
