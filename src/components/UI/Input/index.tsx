import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

import { IInputProps } from "./props";
import styles from "./styles.module.scss";

export const Input = forwardRef(
  (
    { error, className, ...props }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input
          className={cn(styles.inputWrapper__input, {
            [styles.inputWrapper__input_error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && (
          <span role="alert" className={styles.inputWrapper__errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
