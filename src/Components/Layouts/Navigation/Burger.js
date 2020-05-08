// Burger.js
import React from 'react';
import { StyledBurger } from '../styles/Burger.styled';

const Burger = ({ open, toggleNav }) => {
	return (
		<StyledBurger open={open} onClick={toggleNav}>
			<div />
			<div />
			<div />
		</StyledBurger>
	);
};

export default Burger;
