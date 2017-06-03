import moment from 'moment';

export function getAverage(games) {
  var scoreTotal = 0;
  var scoreCount = 0;

  for (var game in games) {
    if (games.hasOwnProperty(game)) {
      games[game].scores.forEach((score) => {
        if (score !== '') {
          scoreCount++;
          scoreTotal += parseInt(score);
        }
      });
    }
  }
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
  return scoreTotal / scoreCount;
}

export function getDates(games) {
  var dates = [];
  
  for (var game in games) {
    if (games.hasOwnProperty(game)) {
      dates.push(moment(games[game].date, 'M/D/YY'));
    }
  }

  return dates;
}

export function getAverages(games) {
  var daily = [];
  var cumulative = [];
  var runningTotal = 0;

  for (var game in games) {
    if (games.hasOwnProperty(game)) {
      daily.push(getDailyAverage(games[game]))
    }
  }

  daily.forEach((day, i) => {
    i++;
    runningTotal += day;
    cumulative.push(runningTotal / i);
  });
  return { daily, cumulative };
}

export function format(date) {
  return moment(date).format('M/D/YY');
}
