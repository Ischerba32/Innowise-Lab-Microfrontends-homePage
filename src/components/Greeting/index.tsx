import { Htag } from "../UI";
import styles from "./styles.module.scss";

const Greeting = () => {
  return (
    <div className={styles.greeting}>
      <Htag tag="h1">Welcome to the Microfrontend app</Htag>
      <Htag tag="h3">Choose application on the header</Htag>
    </div>
  );
};

export default Greeting;
