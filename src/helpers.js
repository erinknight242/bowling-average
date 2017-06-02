export function getAverage(games) {
  var scoreTotal = 0;
  var scoreCount = 0;
  games.forEach(function(game) {
    game.scores.forEach(function(score) {
      scoreCount++;
      scoreTotal += score;
    }, this);
  }, this);

  if (scoreCount === 0) {
    return null;
  }
  return scoreTotal / scoreCount;
}