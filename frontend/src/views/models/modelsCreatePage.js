import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { OuterCard } from '../../components/OuterCard'
import { MyButton } from "../../components/buttons/MyButton";
import { modelsCreateRequest } from "../../requests/modelsRequests";
import { ShowAlert } from "../../utils/alerts_utils";
import { useNavigate } from "react-router-dom";

const ModelsCreatePage = () => {
    const { model_name } = useParams();

    const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const fields = JSON.parse(decodeURIComponent(searchParams.get('fields')));

    return (
        <div>
            <DynamicForm model_name={model_name} fields={fields} />
        </div>
    );
};

export default ModelsCreatePage;


const DynamicForm = ({ model_name, fields }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
  
    const handleChange = (fieldName, value) => {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    };

    const handleSubmit = () => {
        let required_fields = [];
        Object.keys(fields).forEach((key) => {
            let _field = fields[key];
            if (_field.required && !_field.declarative && (!(key in formData) || formData[key].length === 0)) {
                required_fields.push(key)
            }
          });

        if (required_fields.length !== 0) {
            ShowAlert.warning({message: `Обязательные поля: ${required_fields}`})
            return
        }
        modelsCreateRequest(model_name, formData)
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            }
        })
        .then((data) => {
            if (data.detail) {
                ShowAlert.warning({message: data.detail})
                return
            }
            navigate(-1);
        })
    };
  
    return (
        <OuterCard selfStyle={{width: '350px'}}>
            <h2>{model_name}</h2>
            <hr />
            <Form>
                {Object.entries(fields).map(([fieldName, fieldData]) => {
                    if (!fieldData.declarative) {
                        return (
                            <Form.Group key={fieldName} controlId={fieldName}>
                                <Form.Label>{fieldName}</Form.Label>
                                <Form.Control
                                    type={fieldData.type === 'INTEGER' ? 'number' : 'text'}
                                    placeholder={fieldName}
                                    required={fieldData.required}
                                    onChange={(e) => handleChange(fieldName, e.target.value)}
                                />
                            </Form.Group>
                        )
                    }
                })}
                <MyButton variant="success" shadowColor='green' style={{marginTop: '10px'}} onClick={handleSubmit}>
                    Создать
                </MyButton>
            </Form>
        </OuterCard>
    );
  };
