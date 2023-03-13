import React from "react";
import { User } from "../models/user";
import { Modal, Form, Button } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { useForm } from "react-hook-form";
import { LogInCredentials } from "../network/notes_api";
import UtilsStyles from "../styles/utils.module.css";
import * as NoteApi from "../network/notes_api";

interface LogInModalProps {
  onDismiss: () => void;
  onLogInSuccessful: (user: User) => void;
}

export default function LogInModal({
  onDismiss,
  onLogInSuccessful,
}: LogInModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LogInCredentials>();

  const onSubmit = async (credentials: LogInCredentials) => {
    try {
      console.log(credentials)
      const userLogIn = await NoteApi.logIn(credentials);
      onLogInSuccessful(userLogIn);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            label="Username"
            name="username"
            placeholder="username"
            type="text"
            register={register}
            registerOptions={{ required: "Required" }}
            // error={errors.username}
          />
          <TextInputField
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
            register={register}
            registerOptions={{ required: "Required" }}
            // error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={UtilsStyles.width100}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
