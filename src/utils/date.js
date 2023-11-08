import { format } from 'date-fns';
import locale from 'date-fns/locale/uk';
import localeS from 'date-fns/locale/en-GB';

export function formatDate(date, isEnglish = true, mail = false) {
  const monthsUkr = [
    'січ.',
    'лют.',
    'бер.',
    'квіт.',
    'трав.',
    'черв.',
    'лип.',
    'серп.',
    'вер.',
    'жовт.',
    'лист.',
    'груд.',
  ];

  const monthsEng = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formattedDate = new Date(date);
  const currentDate = new Date();
  if (mail) {
    return format(formattedDate, 'dd LLL yyyy, HH:mm', {
      locale: isEnglish ? localeS : locale,
    });
  } else if (formattedDate.toDateString() === currentDate.toDateString()) {
    return formattedDate.toLocaleString(isEnglish ? 'en-US' : 'uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    const day = formattedDate.getDate();
    const monthArray = isEnglish ? monthsEng : monthsUkr;
    const month = monthArray[formattedDate.getMonth()];
    const year = formattedDate.getFullYear();

    if (year !== currentDate.getFullYear()) {
      return `${day} ${month}. ${year}р.`;
    } else {
      return `${day} ${month}.`;
    }
  }
}
