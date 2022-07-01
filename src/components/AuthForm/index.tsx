import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import IAuthForm from "../../../../../host/src/interfaces/authForm.interface";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, Input } from "../UI";
import AuthFormProps from "./props";
import styles from "./styles.module.scss";
import { useTheme } from "../../hooks/useTheme";

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

  const { theme } = useTheme();

  const formSubmit = ({ email, password }: IAuthForm) => {
    toast.promise(onSubmit({ email, password }), {
      pending: {
        render() {
          return "Please wait...";
        },
        icon: false,
      },

      error: {
        render({ data }) {
          return `${data.message}`;
        },
      },
    });
  };

  return (
    <div className={styles.loginForm}>
      <Card color="blue" className={styles.loginCard}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {
              required: { value: true, message: "Enter the email" },
            })}
            type="email"
            placeholder="Email"
            error={errors.email}
          />
          <Input
            {...register("password", {
              required: { value: true, message: "Enter the password" },
            })}
            type="password"
            placeholder="Password"
            error={errors.password}
          />
          <div className={styles.buttons}>
            <Button
              appearance="primary"
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
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'light' ? 'light': 'dark'}
      /> */}
    </div>
  );
};

export default AuthForm;
