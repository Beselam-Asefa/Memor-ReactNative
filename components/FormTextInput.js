/* import React from "react";

import {
  Badge,
  Text,
  Item,
  Card,
  Label,
  Input,
} from "native-base";
import PropTypes from "prop-types";

const FormTextInput = () => {
  const LoginForm = props => {
    const { error, lable, ...otherProps } = props;
    return (
      <Card style={{ borderRadius: 5, marginBottom: 10, padding: 5 }}>
        <Item floatingLabel style={{ borderColor: "transparent" }}>
          <Label>{lable}</Label>
          <Input {...otherProps} />
        </Item>
        {error && (
          <Badge>
            <Text>{error}</Text>
          </Badge>
        )}
      </Card>
    );
  };
  const RegisterForm = props => {
    const { error, lable, ...otherProps } = props;
    return (
      <Card style={{ borderRadius: 5, marginBottom: 5, padding: 4 }}>
        <Item floatingLabel style={{ borderColor: "transparent" }}>
          <Label>{lable}</Label>
          <Input {...otherProps} />
        </Item>
        {error && (
          <Badge>
            <Text>{error}</Text>
          </Badge>
        )}
      </Card>
    );
  };
  const AddMedicationForm = (props) => {
    const { error, lable, ...otherProps } = props;
    return (
      <Card style={{ borderRadius: 5, marginBottom: 5, padding: 4 }}>
        <Item floatingLabel style={{ borderColor: "transparent" }}>
          <Label>{lable}</Label>
          <Input {...otherProps} />
        </Item>
        {error && (
          <Badge>
            <Text>{error}</Text>
          </Badge>
        )}
      </Card>
    );
  };

  const AddSupplimentForm = props => {
    const { error, lable, ...otherProps } = props;
    return (
      <Card style={{ borderRadius: 5, marginBottom: 5, padding: 4 }}>
        <Item floatingLabel style={{ borderColor: "transparent" }}>
          <Label>{lable}</Label>
          <Input {...otherProps} />
        </Item>
        {error && (
          <Badge>
            <Text>{error}</Text>
          </Badge>
        )}
      </Card>
    );
  };



  return {
    LoginForm,
    RegisterForm,
    AddMedicationForm,
    AddSupplimentForm
  };
};

export default FormTextInput;
 */