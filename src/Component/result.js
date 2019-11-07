import React, {Fragment, useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import './result.css';
import {API_URL, API_UNIT_SYSTEM, KEY, DEFAULT_LANG} from '../_shared/api/index';

function Result() {
	const [isLoading, loadingChange] = useState(false);
	const [weather, weatherChange] = useState({
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
	});

	/**
	 * Use OpenWeather API
	 * @param city
	 * @param country
	 * @returns {Promise<void>}
	 */
	async function fetchWeather(city, country) {
		loadingChange(true);
		const openWeather = `${API_URL}weather?q=${city},${country}${API_UNIT_SYSTEM}${DEFAULT_LANG}${KEY}`;

		await fetch(openWeather)
			.then(response => response.json())
			.then(data =>
				weatherChange(data)
			)
			.catch( () => loadingChange(false))
			.finally(() => loadingChange(false))
	}

	useEffect(() => {
		fetchWeather('paris', 'fr');
	}, []);

	function convertUNIXUTCDate(data) {
		let date = new Date(data * 1000);
		let hours = date.getHours();
		let minutes = "0" + date.getMinutes();

		return hours + ':' + minutes.substr(-2);
	}

	function list(object) {
		return (
			<li className="col-12 col-md-6 col-lg-4 col-xl-3 list-item-none">
				<div className="card">
					<img className="img-responsive mx-auto d-block"
							 src={'http://openweathermap.org/img/wn/' + object.weather[0].icon + '@2x.png'}
							 alt={"weather of " + object.name}/>
					<div className="card-header bg-primary text-white">
						<h2>{object.name} <small>({object.sys.country})</small></h2>
					</div>
					<div className="card-body">
						<h3>
							<b>
								{
									object.weather[0].description.charAt(0).toLocaleUpperCase() +
									object.weather[0].description.slice(1)
								}
							</b>
						</h3>

						<div className="row">
							<div className="col-12">
								<h4>Température</h4>
								<div className="d-flex justify-content-between align-items-end">
										<b className="actual-temp">{object.main.temp}°C</b>
									<div>
										<small><b>Max</b></small>
										<p>{object.main.temp_max}°C</p>
									</div>
									<div>
										<small><b>Min</b></small>
										<p>{object.main.temp_min}°C</p>
									</div>
								</div>
							</div>
							<div className="col-12 col-md-6">

							</div>
						</div>
					</div>
					<div className="card-footer">
						<div className="row">
							<p className="col-12 col-md-6">Levé: <br/> {convertUNIXUTCDate(object.sys.sunrise)}</p>
							<p className="col-12 col-md-6">Couché: <br/> {convertUNIXUTCDate(object.sys.sunset)}</p>
						</div>
					</div>
				</div>
			</li>
		)
	}

	return (
		<Fragment>
			{
				(isLoading === true) ?
					(<Alert variant="warning">Loading, please wait</Alert>) :
					(
						<ul className="list-group row">{list(weather)}</ul>
					)
			}
		</Fragment>
	)
}

export default Result;
