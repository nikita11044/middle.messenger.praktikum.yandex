export function errorInField(field: string, value: string): string {
  switch (field) {
    case 'login': {
      const isValid = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/.test(value);
      return isValid ? '' : 'Недопустимый логин';
    }
    case 'password': {
      const isValid = /^((?=.*[0-9])|(?=.*[A-Za-z]+))(?=.*[A-Z])(?!.*\s)(?!.*[а-яёА-ЯЁ]).{8,40}$/.test(value);
      return isValid ? '' : 'Недопустимый пароль';
    }
    case 'email': {
      const isValid = /.+@[^@]+[a-z]+\.[^@]{2,}/.test(value);
      return isValid ? '' : 'Неверный формат почты';
    }
    case 'phone': {
      const isValid = /((\\+7|7|8)+([0-9]){10})$|\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\b/.test(value);
      return isValid ? '' : 'Неверный формат номера';
    }
    case 'message': {
      const isValid = value !== '';
      return isValid ? '' : 'Сообщение не может быть пустым';
    }
    case 'first_name': {
      const isValid = /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/.test(value);
      return isValid ? '' : 'Некорректный формат имени';
    }
    case 'second_name': {
      const isValid = /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/.test(value);
      return isValid ? '' : 'Некорректный формат фамилии';
    }
    default: {
      return '';
    }
  }
}
