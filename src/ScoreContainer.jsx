import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { getDates, getAverages } from './helpers.js';
import ScoreRow from './ScoreRow.jsx';
import reverse from 'lodash/reverse';

export default function ScoreContainer({ games, addScores, editScores }) {
  const dates = [];
  reverse(games).map((game, i) => {
    dates.push(<ScoreRow
      game={game}
      key={i}
      editScores={editScores.bind(this, game)}/>
    );
  });

  return (
    <div className="score-container margin-top">
      <div className="horizontal-flex score-header">
        <h1 className="margin-right">Scores</h1>
        <RaisedButton
          label="Add Date"
          secondary={true}
          onClick={addScores}
        />
      </div>
      {dates}
    </div>
  );
}

ScoreContainer.propTypes = {
  games: PropTypes.array,
  editScores: PropTypes.func,
  addScores: PropTypes.func,
};
