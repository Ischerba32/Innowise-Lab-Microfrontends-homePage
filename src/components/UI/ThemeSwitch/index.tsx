import { useTheme } from '../../../hooks/useTheme';
import styles from './styles.module.scss';

export const ThemeSwitch = (): JSX.Element => {
	const { theme, setTheme } = useTheme();

	const handleChangeTheme = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
	};

	return (
		<div className={styles.themeSwitch}>
			<label className={styles.themeSwitch__container}>
				<input
					type='checkbox'
					defaultChecked={theme === 'light' ? true : false}
					onChange={handleChangeTheme}
				/>
				<div />
			</label>
		</div>
	);
};
