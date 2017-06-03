import moment from 'moment';

export function getAverage(games) {
  var scoreTotal = 0;
  var scoreCount = 0;
  games.forEach((game) => {
    game.scores.forEach((score) => {
      scoreCount++;
      scoreTotal += score;
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
    scoreCount++;
    scoreTotal += score;
  });
  if (scoreCount === 0) {
    return null;
  }
  return scoreTotal / scoreCount;
}

export function getDates(games) {
  var dates = [];
  games.forEach((game) => dates.push(moment(game.date, 'M/D/YY')));

  return dates;
}

export function getAverages(games) {
  var daily = [];
  var cumulative = [];
  var runningTotal = 0;
  games.forEach((game) => daily.push(getDailyAverage(game)));
  daily.forEach((day, i) => {
    i++;
    runningTotal += day;
    cumulative.push(runningTotal / i);
  });
  return { daily, cumulative };
}