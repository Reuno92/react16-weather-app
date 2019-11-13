import React from "react";

function convertUNIXUTCDate(data) {
	let date = new Date(data * 1000);
	let hours = date.getHours();
	let minutes = "0" + date.getMinutes();

	return hours + ':' + minutes.substr(-2);
}

function decimalWithprecision(value, precision) {
	var multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}

export default function ResultItems(props) {
	const DATA = props.data;

	console.log(DATA);

	return (
			<div className="card">
				<img className="img-responsive mx-auto d-block"
						 src={'http://openweathermap.org/img/wn/' + DATA.weather[0].icon + '@2x.png'}
						 alt={"weather of " + DATA.name}/>
				<div className="card-header bg-primary text-white">
					<h2>{DATA.name} <small>({DATA.sys.country})</small></h2>
				</div>
				<div className="card-body">
					<h3>
						<b>
							{
								DATA.weather[0].description.charAt(0).toLocaleUpperCase() +
								DATA.weather[0].description.slice(1)
							}
						</b>
					</h3>

					<div className="row">
						<div className="col-12">
							<h4>Température</h4>
							<div className="d-flex justify-content-between align-items-end">
								<b className="actual-temp">{decimalWithprecision(DATA.main.temp, 1)}°C</b>
								<div>
									<small><b>Max</b></small>
									<p>{decimalWithprecision(DATA.main.temp_max, 1)}°C</p>
								</div>
								<div>
									<small><b>Min</b></small>
									<p>{decimalWithprecision(DATA.main.temp_min, 1)}°C</p>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6">

						</div>
					</div>
				</div>
				<div className="card-footer">
					<div className="row">
						<p className="col-12 col-md-6">Levé: <br/> {convertUNIXUTCDate(DATA.sys.sunrise)}</p>
						<p className="col-12 col-md-6">Couché: <br/> {convertUNIXUTCDate(DATA.sys.sunset)}</p>
					</div>
				</div>
			</div>
	)
}
