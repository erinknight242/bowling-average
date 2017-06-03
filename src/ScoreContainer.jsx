import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { getDates, getAverages } from './helpers.js';

export default function ScoreContainer({ games, addScores }) {
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
    </div>
  );
}

ScoreContainer.propTypes = {
  games: PropTypes.object
};
