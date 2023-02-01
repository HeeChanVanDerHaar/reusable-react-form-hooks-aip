import React from "react";
import "./App.css";
import { useCreateFormController } from "./components/hooks/useCreateFromController";
import ReactSelect from "react-select";
import { Input as MUIInput } from "@mui/material";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";

function submitHandlerValid(data: object) {
  console.log("submitted VALID form", data);
}

function submitHandlerInvalid(data: object) {
  console.warn("submitted INVALID form", data);
}

type User = {
  firstName: string;
  lastName: string;
  streetName: string;
  zipCode: string;
  email: string;
  country: { value: string; label: string };
  gender: { value: string; label: string };
  otherProps: {
    someValue: string;
  };
};

const countries = [
  { value: "Nederland", label: "Nederland" },
  { value: "Duitsland", label: "Duitsland" },
  { value: "Frankrijk", label: "Frankrijk" },
];

const gender = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Unknown", label: "Unknown" },
];

function App() {
  const { Form, FormControl, methods, InputControl } =
    useCreateFormController<User>();

  return (
    <Form onValid={submitHandlerValid} onInvalid={submitHandlerInvalid}>
      <div>
        <h1>My First React Hook Form </h1>

        <div>
          <pre>Native HTML Element</pre>
          <input
            placeholder="Enter first name"
            type="text"
            {...methods.register("firstName")}
          />
        </div>

        <hr />

        <div>
          <pre>Using Preset Form controlled component from hook</pre>
          <InputControl
            name="lastName"
            placeholder="Enter last name"
            label="LAST NAME: "
            rules={{ required: "Last name is required" }}
          />

          <InputControl
            name="otherProps.someValue"
            placeholder="Enter some value"
            label="SOME VALUE: "
            rules={{ required: "SOME VALUE IS REQUIRED" }}
          />

          <FormControl name="gender">
            <Select placeholder="Select gender" options={gender} />
          </FormControl>
        </div>

        <hr />

        <div>
          <pre>Using FormControl for wrapping native HTML elements </pre>
          <FormControl name="streetName" isNative>
            <input type="text" placeholder="Enter streetName" />
          </FormControl>
        </div>

        <hr />

        <div>
          <pre>
            Using FormControl for wrapping Local Custom NON-Controlled
            Components
          </pre>
          <FormControl name="zipCode">
            <Input placeholder="Enter zip code" />
          </FormControl>
        </div>

        <hr />

        <div>
          <pre> Using FormControl for wrapping Third Party Components</pre>

          <p>Mui Input</p>
          <FormControl name="email">
            <MUIInput placeholder="Enter email" />
          </FormControl>

          <br />

          <p>React Select</p>
          <FormControl name="country">
            <ReactSelect options={countries} placeholder="Select country" />
          </FormControl>
        </div>

        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}

export default App;
