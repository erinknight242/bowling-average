import moment from 'moment';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import remove from 'lodash/remove';
import reverse from 'lodash/reverse';

const AVERAGE_COUNT = 27;

/* getAverage: Averages the most recent 27 scores, filling in the manually entered starting
   average (if it exists) if less than 27 scores exist) */
export function getAverage(orderedScores, seedAverage) {
  var scores = orderedScores.slice(0, AVERAGE_COUNT);
  if (typeof seedAverage === 'string' && seedAverage != '' && orderedScores.length < 27) {
    var filler = [];
    for (let i = 0; i < AVERAGE_COUNT - orderedScores.length; i++) {
      filler.push(seedAverage);
    }
    scores = filler.concat(scores);
  }

  var scoreTotal = 0;
  var scoreCount = 0;

  scores.forEach((score) => {
    scoreCount++;
    scoreTotal += parseInt(score);
  });
  if (scoreCount === 0) {
    return null;
  }

  return scoreTotal / scoreCount;
}

export function getOrderedScores(orderedGames) {
  var orderedScores = [];
  orderedGames.forEach((game) => {
    if (game.scores) {
      game.scores.forEach((score) => {
        if (score !== '') {
          orderedScores.push(score);
        }
      });
    }
  });
  return orderedScores;
}

export function getDailyAverage(game) {
  var scoreTotal = 0;
  var scoreCount = 0;
  if (game.scores) {
    game.scores.forEach((score) => {
      if (score !== '') {
        scoreCount++;
        scoreTotal += parseInt(score);
      }
    });
  }
  if (scoreCount === 0) {
    return null;
  }
  return +((scoreTotal / scoreCount).toFixed(3));
}

export function getDates(games) {
  var dates = [];

  games.forEach((game) => {
    dates.push(moment(game.date, 'M/D/YY'));
  })

  return dates;
}

export function getAverages(games, seedAverage) {
  var daily = [];
  var cumulative = [];
  var runningTotal = 0;
  var orderedScores = [];

  reverse(games).forEach((game) => {
    daily.push(getDailyAverage(game));
    game.scores.forEach((score) => {
      orderedScores.push(score);
    });
    cumulative.push(+(getAverage(orderedScores.slice(-AVERAGE_COUNT), seedAverage)).toFixed(3));
  });

  return { daily, cumulative };
}

export function format(date) {
  return moment(date).format('M/D/YY');
}

export function sortDates(games) {
  for (var game in games) {
    if (games.hasOwnProperty(game)) {
      games[game].id = game;
    }
  }

  return reverse(sortBy(games, [function(game) { return moment(game.date, 'M/D/YY'); }]));
}

export function dateUsed(date, games) {
  return find(games, function(game) { return game.date === moment(date).format('M/D/YY'); });
}

export function clean(scores) {
  return remove(scores, function(score) {
    return score !== '';
  });
}

export function getHighScore(games, best) {
  var highScore = best || 0;
  games.forEach((game) => {
    if (game.scores) {
      game.scores.forEach((score) => {
        if (parseInt(score) > parseInt(highScore)) {
          highScore = score;
        }
      });
    }
  });
  return parseInt(highScore);
}
