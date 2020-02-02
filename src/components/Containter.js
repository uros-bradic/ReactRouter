import React, { useState, useEffect } from "react";
import { PlanetsContainer } from "./PlanetsContainer";

export const Container = function Container(props) {
  const [planetList, setPlanetList] = useState({});

  const [requestUrl, setRequestUrl] = useState(
    "https://swapi.co/api/planets?page=1"
  );
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(false);

  const handleNextClick = function(e) {
    e.preventDefault();
    if (!planetList.next) return;

    setRequestUrl(planetList.next);
    setHasPrevious(true);
  };

  const handlePreviousClick = function(e) {
    e.preventDefault();
    if (!planetList.previous) return;

    setRequestUrl(planetList.previous);
    setHasNext(true);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const myRequest = new Request(requestUrl);
        const response = await fetch(myRequest);
        const planets = await response.json();
        setPlanetList(planets);
        if (!planets.previous) setHasPrevious(false);
        if (!planets.next) setHasNext(false);
        setIsLoading(false);
      } catch {
        setHasErrors(true);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [requestUrl]); // Or [] if effect doesn't need props or state

  return (
    <div>
      <h2>React Router example</h2>
      {hasErrors ? (
        <div>Sorry, server is not working</div>
      ) : (
        <PlanetsContainer
          isLoading={isLoading}
          planetList={planetList}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onNextClick={handleNextClick}
          onPreviousClick={handlePreviousClick}
        />
      )}
    </div>
  );
};
