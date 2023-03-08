import styled from "styled-components";

const FormStyle = styled.form`
  .form-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.7em;
    height: 280px;
    justify-content: space-between;
  }

  .form-control label {
    font-weight: bold;
    font-size: 0.7em;
    margin-bottom: 0.4em;
  }

  .form-control input {
    border: 1px solid #222;
    border-radius: 2px;
    background-color: #2c3035;
    padding: 0.5em;
    color: #dfdfdf;
  }
`;

export default FormStyle;
