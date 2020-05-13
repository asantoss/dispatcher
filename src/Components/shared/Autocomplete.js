import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
export default function Autocomplete({
	options,
	open,
	getLabel,
	getSelected,
	setOpen,
	keys,
	...props
}) {
	const debounced = useRef(null);
	const [state, setState] = useState({
		activeOption: 0,
		filteredOptions: [],
		showOptions: false,
		userInput: '',
		isLoading: false,
	});
	const [height, setHeight] = useState(null);
	const calcHeight = (el) => {
		const height = el.offsetHeight;
		setHeight(height * state.filteredOptions.length);
	};
	const handleChange = (e) => {
		const userInput = e?.currentTarget?.value ?? null;
		setState((s) => ({ ...s, userInput, isLoading: true }));
		if (!debounced.current) {
			debounced.current = debounce((userInput) => {
				const filteredOptions = options.filter((option) => {
					const found = keys.filter((key) => {
						return option[key].toLowerCase().includes(userInput.toLowerCase());
					});
					return found.length;
				});
				setState((s) => ({
					...s,
					activeOption: 0,
					filteredOptions,
					showOptions: true,
					isLoading: false,
				}));
			}, 500);
		}
		debounced.current(userInput);
		// calcHeight();
	};

	//Fired when a user clicks the option
	const handleClick = (e, i) => {
		e.persist();
		getSelected(filteredOptions[i]);
		setState((s) => ({
			...s,
			activeOption: i,
			filteredOptions: [],
			showOptions: false,
			userInput: e.currentTarget.innerText,
		}));
	};
	const handleClear = () => {
		getSelected(null);
		setState((s) => ({
			...s,
			activeOption: 0,
			filteredOptions: [],
			showOptions: false,
			userInput: '',
		}));
	};
	//Event fired when a user hits a key
	const handleKeyDown = (e) => {
		const { activeOption, filteredOptions } = state;
		if (e.keycode === 13) {
			setState((s) => ({
				...s,
				activeOption: 0,
				showOptions: false,
				userInput: filteredOptions[activeOption],
			}));
		} else if (e.keycode === 40) {
			if (activeOption - 1 === filteredOptions.length) {
				return;
			}
			setState((s) => ({ ...s, activeOption: state.activeOption + 1 }));
		}
	};

	const { userInput, filteredOptions, showOptions, isLoading } = state;

	function Options() {
		return (
			<TransitionGroup component={null} enter appear>
				{filteredOptions.map((option, i) => {
					return (
						<CSSTransition
							unmountOnExit
							mountOnEnter
							classNames='item'
							timeout={500}
							onEnter={calcHeight}
							onExit={calcHeight}
							key={option.docId}>
							<li className='option_item' onClick={(e) => handleClick(e, i)}>
								{getLabel(option)}
							</li>
						</CSSTransition>
					);
				})}
			</TransitionGroup>
		);
	}
	return (
		<AutocompleteContainer open={showOptions}>
			<TextField
				className='input'
				variant='outlined'
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				value={userInput}
				{...props}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							{isLoading && <span className='spinner' />}
							{userInput && (
								<IconButton onClick={handleClear}>
									<Close />
								</IconButton>
							)}
						</InputAdornment>
					),
				}}
			/>
			<CSSTransition
				in={Boolean(showOptions && userInput)}
				classNames='option_container'
				timeout={500}
				unmountOnExit>
				<ul
					className='option_container'
					style={{
						height,
					}}>
					{showOptions && userInput && <Options />}
				</ul>
			</CSSTransition>
		</AutocompleteContainer>
	);
}

const AutocompleteContainer = styled.div`
	@keyframes slideIn {
		from {
			transform: scale(0.5);
		}
		to {
			transform: scale(1);
		}
	}
	height: auto;
	/* width: calc(300px + 1rem); */
	.input {
		width: 100%;
	}
	.autocomplete_input {
		display: flex;
		border: 1px solid #999;
		align-items: center;
		padding: 0.5rem;
		align-items: center;
		font-weight: 400;
		line-height: 1.1876em;
		border-radius: 4px;
	}
	.no-suggestions {
		color: #999;
		padding: 0.5rem;
	}
	.option_container {
		list-style: none;
		border: 1px solid #999;
		margin-top: 0;
		max-height: 145px;
		width: calc(300px + 1rem);
		position: absolute;
		z-index: 999;
		background-color: #fff;
		/* overflow-y: auto; */
		padding-left: 0;
		transform-origin: top left;
		animation: slideIn 500ms ease;
		transition: height var(--speed) ease;
		.option_item {
			padding: 0.5rem;
			cursor: pointer;
			&:hover {
				filter: brightness(1.5);
				background-color: var(--bg-accent);
				color: var(--text-color);
				cursor: pointer;
				font-weight: 700;
			}
			&:not(:last-of-type) {
				border-bottom: 1px solid #999;
			}
		}
	}

	.item-enter {
		opacity: 0;
	}
	.item-enter-active {
		opacity: 1;
		transition: opacity 500ms ease-in;
	}
	.item-exit {
		opacity: 1;
	}
	.item-exit-active {
		opacity: 0;
		transition: opacity 500ms ease-in;
	}

	.spinner {
		display: inline-block;
		height: 1rem;
		width: 1rem;
	}
`;
