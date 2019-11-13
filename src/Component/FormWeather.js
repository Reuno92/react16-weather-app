import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import CitySelect from "./FormWeather/CitySelect";
import Button from "react-bootstrap/Button";
import {API_URL, API_UNIT_SYSTEM, KEY, DEFAULT_LANG} from '../_shared/api/index';

function FormWeather(props) {
	const [city, cityChange] = useState('');

	return (
		<li className="col-12 col-md-6 col-lg-4 col-xl-3 list-item-none">
			<Card>
				<Card.Header>
					<h2>Ajouter une ville</h2>
				</Card.Header>
				<form onSubmit={fetchNewCity(city, props.weatherChange)}>
				<Card.Body>
					<CitySelect city={city} cityChange={cityChange} />
				</Card.Body>
				<Card.Footer>
					<Button variant="primary" disabled={city.length === 0} type="submit">
						Soumettre une ville
					</Button>
				</Card.Footer>
				</form>
			</Card>
		</li>
	)
}

function fetchNewCity(city, setState) {
	const openWeather = `${API_URL}weather?q=${city}${API_UNIT_SYSTEM}${DEFAULT_LANG}${KEY}`;
	fetch(openWeather)
		.then(response => response.json())
		.then(data => setState = data)
}

export default FormWeather;
