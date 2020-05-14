import {RU, EN} from './i18n.js';
import {render} from './render.js';
import {skills} from './skills.js';

function dateDiff(date1, date2, interval) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const monthInYear = 12;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  const timeDiff = firstDate - secondDate;

  if (isNaN(timeDiff)) {
    return NaN;
  }

  switch (interval) {
    case 'years':
      return secondDate.getFullYear() - firstDate.getFullYear();
    case 'months':
      return ((secondDate.getFullYear() * monthInYear + secondDate.getMonth()) -
      (firstDate.getFullYear() * monthInYear + firstDate.getMonth()));
    case 'weeks':
      return Math.floor(timeDiff / week);
    case 'days':
      return Math.floor(timeDiff / day);
    case 'hours':
      return Math.floor(timeDiff / hour);
    case 'minutes':
      return Math.floor(timeDiff / minute);
    case 'seconds':
      return Math.floor(timeDiff / second);
    default:
      return null;
  }
}

export const dom = (isLoaded) => {
  const careerFrom = 2008;
  const dateOfBirth = '1988/03/02';
  const dateOfLastJob = '2019/05/31';
  const today = new Date();
  const byId = document.getElementById.bind(document);
  const alreadyLoaded = true;

  if (!isLoaded) {
    const elTags = byId('tags');

    Object
      .keys(skills)
      .forEach(key =>
        skills[key].forEach(tag => {
          const elTag = document.createElement('span');

          elTag.innerHTML = tag;
          elTag.classList.add(key);
          elTags.appendChild(elTag);
        })
      );
  }

  byId('career-experience').innerText = today.getFullYear() - careerFrom;
  byId('age').innerText = Math.floor(dateDiff(dateOfBirth, today, 'months') / 12);
  byId('job-vtb').innerText = (dateDiff(dateOfLastJob, today, 'months') / 12).toFixed(1);

  // Change language.
  byId('ru').addEventListener('click', () => render(dom, RU, alreadyLoaded));
  byId('en').addEventListener('click', () => render(dom, EN, alreadyLoaded));
}
