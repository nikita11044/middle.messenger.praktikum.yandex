export function errorInField(field: string, value: string): string {
  switch (field) {
    case 'login': {
      const isValid = /^[a-zA-Z][a-zA-Z0-9]{3,20}$/.test(value);
      return isValid ? '' : 'Недопустимый логин';
    }
    case 'password': {
      const isValid = /^[a-zA-Zа-яёА-ЯЁ0-9]{8,25}$/.test(value);
      return isValid ? '' : 'Недопустимый пароль';
    }
    // case 'email': {
    //   return /^[a-zA-Z0-9_.+-]{2,20}@[a-zA-Z0-9-]{2,20}\.[a-z]{2,10}$/.test(value);
    // }
    // case 'phone': {
    //   return /^(\+{1}7{1}|8) ?\(?\d{3}\)? ?\d{3}[ -]?\d{2}[ -]?\d{2}$/.test(value);
    // }
    // case 'message': {
    //   return value !== '';
    // }
    // case 'first_name':
    // case 'last_name': {
    //   return /^[a-zA-Zа-яёА-ЯЁ]{2,20}$/.test(value);
    // }
    default: {
      return '';
    }
  }
}
