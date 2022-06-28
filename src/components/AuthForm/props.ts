import { SubmitHandler } from "react-hook-form";

import AuthForm from "../../../../../host/src/interfaces/authForm.interface";

export default interface AuthFormProps {
  onSubmit: SubmitHandler<AuthForm>;
  formAction: string;
  actionLink?: string;
  actionTitle?: string;
  successMsg?: string;
}
