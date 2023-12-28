import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { modelListRequest } from "../../requests/modelsRequests";
import { ShowAlert } from "../../utils/alerts_utils";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import moment from "moment";
import {MyButton} from '../../components/buttons/MyButton'
import { getModelCreateUrl, getModelEditUrl } from "../../utils/urls/model_urls";
import { OuterCard } from "../../components/OuterCard";


const ModelsListPage = () => {
    const { model_name } = useParams();

    const [ fields, setFields ] = useState([]);
    const [ models, setModels ] = useState([]);
    const [ tableFields, setTableFields ] = useState([]);
	const [ showViewWindow, setShowViewWindow ] = useState(false);

    useEffect(() => {
      modelListRequest(model_name)
      .then(response => {return response.json()})
      .then(data => {
        if (data.detail) {
          ShowAlert.warning({message: data.detail});
          return;
        };

        setFields((prevFields) => {
			return Object.keys(prevFields).reduce((updatedFields, fieldName) => {
			  updatedFields[fieldName] = { ...prevFields[fieldName], hiddenTable: false };
			  return updatedFields;
			}, data.fields);
		  });

		setModels(data.models);
		if (data.models.length !== 0) {
			const firstModel = data.models[0];
			if (firstModel !== undefined && firstModel !== null) {
				setTableFields(Object.keys(firstModel))
			}
		}
          });
      }, [model_name]);

	const handleViewWindow = (field) => {
		let _fields = {...fields}
		_fields[field].hiddenTable = !_fields[field].hiddenTable
		setFields(_fields)
	}

	console.log(fields, models)

    return (
        <div>
			<div style={{display: 'flex', justifyContent: 'space-around'}}>
				<div>
					<MyButton 
					as={Link} 
					to={getModelCreateUrl(
					model_name, 
					encodeURIComponent(JSON.stringify(fields))
					)} 
					variant='success' shadowColor='green'>Создать</MyButton>
				</div>

				<div>
					{
						showViewWindow &&
						<ViewWindow 
							fields={tableFields} 
							implementedFields={fields} 
							stateHandle={setShowViewWindow} 
							state={showViewWindow}
							handle={handleViewWindow}
						/>
					}
					<MyButton 
						onClick={() => setShowViewWindow(!showViewWindow)} 
						hidden={true ? showViewWindow : false} 
						variant='success' 
						shadowColor='green'
					>
						Отображение
					</MyButton>
				</div>
			</div>

            <div style={{marginTop: '10px'}}>
				{
					models.length !== 0 &&
					<DynamicTable model_name={model_name} models={models} fields={tableFields} implementedFields={fields}/>
				}
            </div>
        </div>
    );
};

export default ModelsListPage;


const DynamicTable = ({ model_name, models, fields, implementedFields }) => {
    const fieldType = {
        DATETIME: "DATETIME",
        INTEGER: "INTEGER",
        VARCHAR: "VARCHAR"
    }
  
    const tableHeaders = fields.map(field => {
		let _field = implementedFields[field]
		if (_field.hiddenTable) {
			return
		}
      	return <th key={field}>{field}</th>
    });

	let tableRows = [];
	console.log(models.length)
	if (models.length !== undefined && models.length !== 0) {
		tableRows = models.map(model => (
			<tr key={model.id}>
			  {fields.map(field => {
				  if (implementedFields[field].hiddenTable) {
					  return
				  }
				  let _field = model[field]
				  const _field_type = implementedFields[field].type
				  if (_field_type === fieldType.DATETIME) {
					  _field = moment(_field).format('DD.MM.YYYY HH:MM')
				  }
				  if (field === 'id') {
					_field = <Link 
					to={getModelEditUrl(
					  model_name, 
					  _field, 
					  encodeURIComponent(JSON.stringify(implementedFields)), 
					  encodeURIComponent(JSON.stringify(model))
					  )}
					>{_field}</Link>
				  }
				  return <td key={field}>{_field}</td>
			  })}
			</tr>
		  ));
	}
  
    return (
      <Table striped bordered hover>
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    );
  };


const ViewWindow = (fields, implementedFields, stateHandle, state, handle) => {
	return (
		<OuterCard selfStyle={{position: 'absolute'}}>
			{
				fields.fields.map(field => {
					let _field = fields.implementedFields[field]
					return <div style={{display: 'flex', justifyContent: 'space-between'}}>
						<div style={{marginRight: '5px'}}>{field}</div>
						<input type='checkbox'
							checked={true ? !(_field.hiddenTable) : false}
							onClick={() => fields.handle(field)}
						/>
					</div>
				})
			}
			<MyButton onClick={() => fields.stateHandle(!fields.state)} variant='danger' shadowColor='red'>
				Скрыть
			</MyButton>
		</OuterCard>
	);
}
