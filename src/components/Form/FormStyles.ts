import styled from "styled-components";

export const FormElement = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormDescription = styled.p`
  margin-bottom: 24px;
`;

export const LabelAndInputContainer = styled.div`
  position: relative;

  input {
    max-width: 100%;
  }

  textarea {
    height: auto !important;
    width: 100%;
  }
`;

export const LabelAndInputRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  padding: 8px 0;

  button {
    padding: 8px 16px;
    height: 44px; // fix auto height of text varient button
  }
`;

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;

  fieldset {
    margin-bottom: 16px;
  }
`;

export const Legend = styled.legend`
  border: none;
  font-weight: bold;
  font-size: 32px;
  line-height: 120%;
`;

export const HelpText = styled.p`
  color: grey;
  font-size: 16px;
`;
