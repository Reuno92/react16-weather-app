import React, {Fragment, useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import './result.css';
import {API_UNIT_SYSTEM, API_URL, DEFAULT_LANG, KEY} from "../_shared/api";
import ResultItems from "./result/ResultItems";

function Result() {

	const [isLoading, loadingChange] = useState(false);

	const [query, queryChange] = useState('');
	const [weather, weatherChange] = useState( { cities:
			[{
				base: '',
				clouds: {},
				cod: null,
				coord: {lat: null, lon: null},
				dt: null,
				id: null,
				main: {
					humidity: null,
					pressure: null,
					temp: null,
					temp_max: null,
					temp_min: null,
				},
				name: '',
				sys: {
					country: '',
					id: '',
					sunrise: null,
					sunset: null
				},
				timezone: null,
				visibility: null,
				weather: [{id: null, main: '', description: '', icon: ''}],
				wind: {speed: null, deg: null}
			}]
	});

	useEffect(() => {
		/**
		 * Use OpenWeather API
		 * @param term
		 * @param country
		 * @returns {Promise<void>}
		 */
		async function fetchWeather(term, country) {
			loadingChange(true);
			const openWeather = `${API_URL}weather?q=${term},${country}${API_UNIT_SYSTEM}${DEFAULT_LANG}${KEY}`;


			await fetch(openWeather)
				.then(response => response.json())
				.then(data =>
					weatherChange({
						cities: [data]
					})
				).catch( () => loadingChange(false))
				.finally( () => loadingChange(false))
		}

		fetchWeather('paris', 'fr');
	}, []);

	async function fetchNewWeather(term) {
		queryChange(term);
		const openWeather = `${API_URL}weather?q=${term}${API_UNIT_SYSTEM}${DEFAULT_LANG}${KEY}`;

		await fetch(openWeather)
			.then(response => response.json())
			.then(data =>
				weatherChange({
					cities: [
						weather,
						...data
					]
				})
			).catch( () => loadingChange(false))
			.finally( () => loadingChange(false))
	}

	return (
		<Fragment>
			{
				(isLoading === true) ?
					(<Alert variant="warning">Loading, please wait</Alert>) :
					(
						<ul className="list-group row">
							{ weather.cities.map( data => <li key={data.id} className="col-12 col-md-6 col-lg-4 col-xl-3 list-item-none">
								<ResultItems data={data} />
							</li> )
							}
						</ul>
					)
			}
		</Fragment>
	)
}

export default Result;
