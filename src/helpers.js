import moment from 'moment';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import remove from 'lodash/remove';

export function getAverage(games) {
  var scoreTotal = 0;
  var scoreCount = 0;

  games.forEach((game) => {
    game.scores.forEach((score) => {
      if (score !== '') {
        scoreCount++;
        scoreTotal += parseInt(score);
      }
    });
  });
  if (scoreCount === 0) {
    return null;
  }
  return scoreTotal / scoreCount;
}

export function getDailyAverage(game) {
  var scoreTotal = 0;
  var scoreCount = 0;
  game.scores.forEach((score) => {
    if (score !== '') {
      scoreCount++;
      scoreTotal += parseInt(score);
    }
  });
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

export function getAverages(games) {
  var daily = [];
  var cumulative = [];
  var runningTotal = 0;

  games.forEach((game) => {
    daily.push(getDailyAverage(game))
  })

  daily.forEach((day, i) => {
    i++;
    runningTotal += day;
    cumulative.push(+(runningTotal / i).toFixed(3));
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

  return sortBy(games, [function(game) { return moment(game.date, 'M/D/YY'); }]);
}

export function dateUsed(date, games) {
  return find(games, function(game) { return game.date === moment(date).format('M/D/YY'); });
}

export function clean(scores) {
  return remove(scores, function(score) {
    return score !== '';
  });
}

export function getHighScore(games) {
  var highScore = 0;
    games.forEach((game) => {
    game.scores.forEach((score) => {
      if (parseInt(score) > parseInt(highScore)) {
        highScore = score;
      }
    });
  });
  return parseInt(highScore);
}