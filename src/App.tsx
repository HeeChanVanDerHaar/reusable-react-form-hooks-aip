import React from "react";
import "./App.css";
import { useCreateFormController } from "./components/hooks/useCreateFromController";
import ReactSelect from "react-select";
import { Input as MUIInput } from "@mui/material";
import Input from "./components/Input/Input";

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
  country: string;
  // naar: {
  //   testText: string;
  // };
};

const options = [
  { value: "Nederland", label: "Nederland" },
  { value: "Duitsland", label: "Duitsland" },
  { value: "Frankrijk", label: "Frankrijk" },
];

function App() {
  const {
    Form,
    FormControl,
    methods,
    Input: LocalCustomInput,
  } = useCreateFormController<User>();

  return (
    <Form onValid={submitHandlerValid} onInvalid={submitHandlerInvalid}>
      <div>
        <h1>My First React Hook Form </h1>

        {/* Native HTML Input */}
        <input
          placeholder="Enter first name"
          type="text"
          {...methods.register("firstName")}
        />

        {/* Using Preset Form controlled component from hook */}
        <LocalCustomInput
          name="lastName"
          placeholder="Enter last name"
          label="LAST NAME: "
        />

        {/* Using FormControl for wrapping native HTML elements */}
        <FormControl name="streetName" isNative omitFieldState>
          <input type="text" placeholder="Enter streetName" />
        </FormControl>

        {/* Using FormControl for wrapping Local Custom NON-Controlled Components */}
        <FormControl name="zipCode" omitFieldState>
          <Input placeholder="Enter zip code" />
          {/* <Input placeholder="Enter zip code" /> */}
        </FormControl>

        <br />

        {/* Using FormControl for wrapping Third Party Components */}
        <FormControl name="email" omitFieldState>
          <MUIInput placeholder="Enter email" />
        </FormControl>
        <br />
        <FormControl name="country" omitFieldState>
          <ReactSelect options={options} placeholder="Select country" />
        </FormControl>

        <button type="submit">Submit</button>
      </div>
    </Form>
  );
}

export default App;
