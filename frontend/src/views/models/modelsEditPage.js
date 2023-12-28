import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { OuterCard } from '../../components/OuterCard'
import { MyButton } from "../../components/buttons/MyButton";
import { modelsEditRequest, modelsDeleteRequest } from "../../requests/modelsRequests";
import { ShowAlert } from "../../utils/alerts_utils";
import { useNavigate } from "react-router-dom";

const ModelsEditPage = () => {
    const { model_name, model_id } = useParams();

    const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const fields = JSON.parse(decodeURIComponent(searchParams.get('fields')));
    const data = JSON.parse(decodeURIComponent(searchParams.get('data')));

    return (
        <div>
            <DynamicForm model_name={model_name} model_id={model_id} fields={fields} data={data}/>
        </div>
    );
};

export default ModelsEditPage;


const DynamicForm = ({ model_name, model_id, fields, data }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(data);
  
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
            console.log(formData[key].length)
            if (_field.required && !_field.declarative && (!(key in formData) || formData[key].length === 0)) {
                console.log(key)
                required_fields.push(key)
            }
          });

        if (required_fields.length !== 0) {
            ShowAlert.warning({message: `Обязательные поля: ${required_fields}`})
            return
        }
        modelsEditRequest(model_name, model_id, formData)
        .then((response) => {
            if (response.status === 200) {
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

    const handleDelete = () => {
        modelsDeleteRequest(model_name, model_id)
        .then((response) => {
            if (response.status === 200) {
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
    }
  
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
                                    value={formData[fieldName]}
                                    type={fieldData.type === 'INTEGER' ? 'number' : 'text'}
                                    placeholder={fieldName}
                                    required={fieldData.required}
                                    onChange={(e) => handleChange(fieldName, e.target.value)}
                                />
                            </Form.Group>
                        )
                    }
                })}
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                    <MyButton variant="success" shadowColor='green' onClick={handleSubmit}>
                        Сохранить
                    </MyButton>
                    <MyButton variant="danger" shadowColor='red' onClick={handleDelete}>
                        Удалить
                    </MyButton>
                </div>
            </Form>
        </OuterCard>
    );
  };
