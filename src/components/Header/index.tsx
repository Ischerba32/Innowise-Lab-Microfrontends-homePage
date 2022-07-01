import { HeaderProps } from "./props";
import styles from "./styles.module.scss";
import cn from "classnames";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Button, Htag, ThemeSwitch } from "../UI";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    signOut(auth);
  };

  const handleClickLink = (route: string) => {
    navigate(route);
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Htag tag="h3">Home</Htag>
      <div className={styles.header__pages}>
        <Htag tag="h3" onClick={() => handleClickLink("/todo")}>
          ToDo
        </Htag>
        <Htag tag="h3" onClick={() => handleClickLink("/mini-paint")}>
          Mini-paint
        </Htag>
      </div>
      <div className={styles.header__buttons}>
        <ThemeSwitch />
        <Button appearance="primary" onClick={handleClickButton}>
          SignOut
        </Button>
      </div>
    </header>
  );
};
