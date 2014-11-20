var moment = require('moment');

function getDatesActives(ev, freq) {
  var tab = new Array();
  var j = 0;
  var dateactive = ev.start_time;

  switch (freq) {
    case 'daily':
      while (((ev.end_time.getTime() / 1000 / 3600) - (dateactive.getTime() / 1000 / 3600)) >= 24) {
        console.log(ev.end_time);
        console.log(dateactive);
        console.log(((ev.end_time.getTime() / 1000 / 3600 / 24) - (dateactive.getTime() / 1000 / 3600 / 24)));
        dateactive = new Date(ev.start_time.getTime() + (j * 86400000));
        tab[j] = dateactive;
        ++j;
      }
      break;
    case 'weekly':
      while (ev.end_time.getTime() / 1000 / 3600 / 24 - dateactive.getTime() / 1000 / 3600 / 24 >= 7) {
        dateactive = new Date(ev.start_time.getTime() + (j * 86400000 * 7));
        tab[j] = dateactive;
        ++j;
      }
      break;
    case 'monthly':
      while (ev.end_time.getTime() / 1000 / 3600 / 24 - dateactive.getTime() / 1000 / 3600 / 24 >= 24) {
        dateactive = new Date(ev.start_time.getTime() + (j * 86400000 * 7));
        tab[j] = dateactive;
        ++j;
      }
      if (dateactive.getMonth() + 1 == ev.start_time.getMonth() + 1)
        dateactive = new Date(ev.start_time.getTime() + (j * 86400000 * 7));
      if ((ev.start_time.getDate() > 7 && ev.start_time.getDate() < 14) && (dateactive.getDate() <= 7))
        dateactive = new Date(ev.start_time.getTime() + (j * 86400000 * 7));
      else if ((ev.start_time.getDate() > 14 && ev.start_time.getDate() < 21) && (dateactive.getDate() <= 14))
        dateactive = new Date(ev.start_time.getTime() + (j * 86400000 * 7));
      else if ((ev.start_time.getDate() > 21 && ev.start_time.getDate() < 28) && (dateactive.getDate() <= 21))
        dateactive = new Date(ev.start_time.getTime() + (j * 86400000 * 7));
      tab[j] = dateactive;
      ++j;
      break;
  }
  return (tab);
}

function parseDate(date, tz) {
      if (!tz) {
        return date;
      }
      var parsed = moment(date).tz(tz).format("YYYY/MM/DD hh:mm A");
      return new Date(parsed);
    }

function getMulti_Dates(ev) {
  var date = new Date();

  if (ev.end_time.getTime() > date.getTime() && ((ev.end_time.getTime() / 1000 / 3600) - ev.start_time.getTime() / 1000 / 3600) >= 24) {
    ev.multi_date = true;
    if (((ev.end_time.getTime() / 1000 / 3600 / 24) - (ev.start_time.getTime() / 1000 / 3600 / 24)) <= 7) {
      ev.dateactive = getDatesActives(ev, 'daily');
    } else {
      ev.dateactive = getDatesActives(ev, 'weekly');
    }
    ev.start_time = getladateActive(ev.dateactive);
    ev.start_time2 = ev.start_time.toString();
  } else
    ev.multi_date = false;
  return (ev.multi_date);
}

function getladateActive(tab) {
  var date = new Date();
  date.setHours(0, 0, 0, 0);

  var i = 0;

  while (tab[i].getTime() < date.getTime() && i < tab.length) {
    ++i;
  }
  return (tab[i]);

}

module.exports.getMultiDates = getMulti_Dates;
module.exports.getDatesActives = getDatesActives;