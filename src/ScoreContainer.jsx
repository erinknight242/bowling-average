import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { getDates, getAverages } from './helpers.js';
import ScoreRow from './ScoreRow.jsx';

export default function ScoreContainer({ games, addScores }) {
  const dates = [];
  var count = 0;
  for (var game in games) {
    if (games.hasOwnProperty(game)) {
      dates.push(<ScoreRow game={games[game]} key={count}/>);
      count++;
    }
  }

  return (
    <div className="score-container">
      <div className="horizontal-flex">
        <h1 className="margin-right">Scores</h1>
        <RaisedButton
          label="Add Scores"
          secondary={true}
          onClick={addScores}
        />
      </div>
      {dates}
    </div>
  );
}

ScoreContainer.propTypes = {
  games: PropTypes.object
};
