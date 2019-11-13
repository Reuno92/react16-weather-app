import React, {Fragment} from "react";

function CitySelect(props) {

	return (
		<Fragment>
			<select name="city"
							id="city-select"
							className="custom-select"
							value={props.city} onChange={ event => changeCity(event, props.cityChange)}>
				<option	defaultValue>Choississez une ville</option>
				<option value="amsterdam">Amsterdam</option>
				<option value="berlin">Berlin</option>
				<option value="copenhague">Copenhague</option>
				<option value="doha">Doha</option>
			</select>
		</Fragment>
	)
}

function changeCity(event, cityChange) {
	cityChange(event.target.value);
}

export default CitySelect
