import React, { useEffect, useState } from "react";
import { ModelComponent } from "../../components/modelComponents";
import { ShowAlert } from "../../utils/alerts_utils";
import { OuterCard } from "../../components/OuterCard";
import { allModelsListRequest } from "../../requests/modelsRequests";


const AllModelsListPage = () => {
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		allModelsListRequest()
		.then(response => {return response.json()})
		.then(data => {
			if (data.detail) {
				ShowAlert.warning({message: data.detail});
				return;
			};

			setBoards(data);
		});
	}, []);

	return (
		<OuterCard 
			selfStyle={{
				display: 'flex',
				alignItems: 'center',
				width: '80%',
			}}
		>
			<div>
				<div style={{ textAlign: 'center', }}>
					<h2>Модели</h2>
				</div>
				<hr/>

				<div style={{ minWidth: '150px', marginTop: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>
					{
						boards.length === 0 && <h2>Нет моделей</h2>
					}
					{boards.map(board => (
						<ModelComponent
							key={board.id}
							id={board.id}
							title={board.title}
							count={board.count}
						/>
					))}
				</div>
			</div>
		</OuterCard>
	);
};

export default AllModelsListPage;