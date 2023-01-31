import React from "react";
import "./App.css";
import { useCreateFormController } from "./components/hooks/useCreateFromController";
import SelectAtom from "./components/Select/Select";
import InputAtom from "./components/Input/Input";
import ConnectForm from "./components/ConnectForm";

function submitHandlerValid(data: object) {
  console.log("submitted valid form", data);
}

function submitHandlerInvalid(data: object) {
  console.log("submitted invalid form", data);
}

type Data = {
  testInputController: string;
  testText: string;
  testSelect: string;
  testNumber: number;
  testBoolean: boolean;
  naar: {
    testText: string;
  };
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const DeepNest = ({ name }: { name: string }) => (
  <ConnectForm>{({ register }) => <input {...register(name)} />}</ConnectForm>
);

function App() {
  const { Form, Input, Controller } = useCreateFormController<Data>();

  return (
    <Form onValid={submitHandlerValid} onInvalid={submitHandlerInvalid}>
      <h1>My First React Hook Form </h1>
      <Input name="naar.testText" type="text" required label="a label" />
      <Input name="testNumber" type="number" required label="a label" />
      <Input name="testBoolean" type="checkbox" required label="a label" />

      <Controller
        name="testInputController"
        label="a label"
        Component={InputAtom}
        componentProps={{ type: "text" }}
      />

      <br />
      <br />

      <Controller
        name="testSelect"
        label="a label"
        Component={SelectAtom}
        componentProps={{ options: options }}
      />
      <Input name="testText" type="text" required label="a label" />

      <button type="submit">Submit</button>
    </Form>
  );
}

export default App;
