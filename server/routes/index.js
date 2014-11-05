module.exports = function(app) {
  app.get('*', function(req, res) {
    res.render('index', {
      title: 'Wooepa',
      is_mobile: req.is_mobile,
      user: req.user ? JSON.stringify(req.user) : 'null',
      fbAppId: global.fbAppId,
      //events: events,
      //pos: pos
    });
    // res.json({
    //   is_mobile: req.is_mobile
    // });
  });
};