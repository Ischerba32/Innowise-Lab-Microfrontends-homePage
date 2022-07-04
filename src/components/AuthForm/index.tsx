import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import IAuthForm from '../../interfaces/authForm.interface';
import { Button, Card, Input } from '../UI';
import AuthFormProps from './props';
import styles from './styles.module.scss';

const AuthForm = ({
	onSubmit,
	formAction,
	actionLink,
	actionTitle,
}: AuthFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IAuthForm>();

	return (
		<div className={styles.loginForm}>
			<Card color='blue' className={styles.loginCard}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						{...register('email', {
							required: { value: true, message: 'Enter the email' },
						})}
						type='email'
						placeholder='Email'
						error={errors.email}
					/>
					<Input
						{...register('password', {
							required: { value: true, message: 'Enter the password' },
						})}
						type='password'
						placeholder='Password'
						error={errors.password}
					/>
					<div className={styles.buttons}>
						<Button
							appearance='primary'
							onClick={() => clearErrors()}
							className={styles.loadingBtn}
						>
							{formAction}
						</Button>
						{actionLink && (
							<Link to={actionLink}>
								<p className={styles.link} onClick={() => reset()}>
									{actionTitle}
								</p>
							</Link>
						)}
					</div>
				</form>
			</Card>
		</div>
	);
};

export default AuthForm;
