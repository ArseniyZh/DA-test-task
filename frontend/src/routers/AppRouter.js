import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageTemplate from '../views/index';

import AuthenticationPage from '../views/authentication/authenticationPage';

import AllModelsListPage from '../views/models/allModelsListPage';
import ModelsListPage from '../views/models/modelsListPage';
import ModelsCreatePage from '../views/models/modelsCreatePage';
import ModelsEditPage from '../views/models/modelsEditPage';

import { MODELS, ModelListRoutePath, ModelCreateRoutePath, ModelEditRoutePath } from '../utils/urls/model_urls';

export const AuthenticationRoutePath = '/authentication';

export const DefaultPage = AllModelsListPage;

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="*" element={
					<PageTemplate >
						<DefaultPage />
					</PageTemplate>
				} />

				<Route path={AuthenticationRoutePath} element={
					<PageTemplate show_navbar={false} check_token={false} >
						<AuthenticationPage />
					</PageTemplate>
				} />

				<Route path={MODELS} element={
					<PageTemplate>
						<AllModelsListPage />
					</PageTemplate>
				} />

				<Route path={ModelListRoutePath} element={
					<PageTemplate>
						<ModelsListPage />
					</PageTemplate>
				} />

				<Route path={ModelCreateRoutePath} element={
					<PageTemplate>
						<ModelsCreatePage />
					</PageTemplate>
				} />

				<Route path={ModelEditRoutePath} element={
					<PageTemplate>
						<ModelsEditPage />
					</PageTemplate>
				} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
