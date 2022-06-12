export function validation(field: string, value: string): boolean {
  switch (field) {
    case 'login': {
      return /^[a-zA-Z0-9_-]{3,20}$/.test(value);
    }
    case 'password': {
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value);
    }
    case 'email': {
      return /^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/.test(value);
    }
    case 'phone': {
      return /^((\\+7|7|8)+([0-9]){10})$|\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\b/.test(value);
    }
    case 'message': {
      return value !== '';
    }
    case 'first_name':
    case 'last_name': {
      return /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/.test(value);
    }
    default: {
      return false;
    }
  }
}
