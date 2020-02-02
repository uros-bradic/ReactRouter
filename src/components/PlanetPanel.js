import React from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";

const Next = function({ onNextClick, disabled }) {
  return (
    <button className="button" disabled={disabled} onClick={onNextClick}>
      Next
    </button>
  );
};

const Previous = function({ onPreviousClick, disabled }) {
  return (
    <button className="button" disabled={disabled} onClick={onPreviousClick}>
      Previous
    </button>
  );
};

const PlanetList = function({
  planetList,
  hasPrevious,
  onPreviousClick,
  hasNext,
  onNextClick
}) {
  const planetNames = planetList.results
    ? planetList.results.map(result => (
        <li key={result.name}>
          <Link to={`/planet/${result.name}`} className="link">
            {result.name}
          </Link>
        </li>
      ))
    : null;
  return (
    <div>
      <h3>This is a list of planets</h3>
      <p>Click on a planet to see planet details</p>
      <Previous disabled={!hasPrevious} onPreviousClick={onPreviousClick} />
      <Next disabled={!hasNext} onNextClick={onNextClick} />
      <ul>{planetNames}</ul>
    </div>
  );
};

const Planet = function({ planetList }) {
  const planet = useParams();
  const planetDetails = planetList.results
    ? planetList.results.filter(pl => pl.name === planet.id)
    : null;
  return (
    <div>
      <h3>Planet {planetDetails[0].name}</h3>
      <div>
        <span>Back to </span>
        <Link to="/">planet list</Link>
      </div>
      <div className="planet">
        <pre>{JSON.stringify(planetDetails[0], null, 2)}</pre>
      </div>
    </div>
  );
};

export const PlanetPanel = function PlanetPanel(props) {
  const {
    planetList,
    onNextClick,
    hasNext,
    onPreviousClick,
    hasPrevious
  } = props;

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <PlanetList
            planetList={planetList}
            hasPrevious={hasPrevious}
            onPreviousClick={onPreviousClick}
            hasNext={hasNext}
            onNextClick={onNextClick}
          />
        )}
      />
      <Route
        path="/planet/:id"
        render={() => <Planet planetList={planetList} />}
      />
    </Switch>
  );
};
