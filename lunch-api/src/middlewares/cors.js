module.exports = function(ctx, next) {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  ctx.set('Access-Control-Allow-Credentials', true);
  return next();
};
