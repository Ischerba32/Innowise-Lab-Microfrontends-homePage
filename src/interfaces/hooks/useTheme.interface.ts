import { Dispatch, SetStateAction } from 'react';

export default interface IUseTheme {
	theme: string;
	// setTheme: Dispatch<SetStateAction<string>>;
	setTheme: (value: string) => void;
}
