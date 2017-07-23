import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { getDates, getAverages } from './helpers.js';

export default function ScoreRow({ game, editScores, gameId }) {
  var scores = [];
  if (game.scores) {
    scores = game.scores.map((score, i) => {
      return <span key={i} className="score">{score}</span>;
    });
  }

  return (
    <div className="score-row horizontal-flex">
      <div className="row-info horizontal-flex">
        <span className="date">{game.date}</span>
        <div className="edit-icon" onClick={editScores.bind(this, gameId)} />
      </div>
      <div className="score-list horizontal-flex">
        {scores}
      </div>
    </div>
  );
}

ScoreRow.propTypes = {
  game: PropTypes.object,
  editScores: PropTypes.func,
};
