import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { getDates, getAverages } from './helpers.js';

export default function ScoreRow({ game }) {
  const scores = game.scores.map((score, i) => {
    return <span key={i} className="score">{score}</span>;
  })

  return (
    <div className="score-row horizontal-flex">
      <span className="date">{game.date}</span>
      {scores}
    </div>
  );
}

ScoreRow.propTypes = {
  game: PropTypes.object
};