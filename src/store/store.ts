type ChatData = {
  avatarUrl?: string;
  selected?: boolean;
  chatName: string;
  lastMessageTime: string;
  lastMessage: string;
  lastMessageCount?: number;
};

type MessageData = {
  destination: 'to' | 'from';
  text?: string;
  imageUrl?: string;
  messageTime: string;
};

type UserProfileDataElement = {
  elementValue: string;
  formValue: string;
  ref: string;
  label: string;
  inputType: InputTypeAttribute;
};

type AppState = {
  chats: ChatData[];
  messages: MessageData[];
  userProfileDataElements: UserProfileDataElement[];
  password: string;
};

export class Store {
  private static _appState: AppState = {
    chats: [
      {
        chatName: 'Андрей',
        lastMessageTime: '10:49',
        lastMessage: 'Изображение',
        lastMessageCount: 2,
      },
      {
        chatName: 'Киноклуб',
        lastMessageTime: '12:00',
        lastMessage: '<strong>Вы: </strong>стикер',
      },
      {
        chatName: 'Илья',
        lastMessageTime: '15:00',
        lastMessage: 'Друзья, у меня для вас особенный выпуск новостей!...',
        lastMessageCount: 4,
      },
      {
        selected: true,
        chatName: 'Вадим',
        lastMessageTime: 'Пт',
        lastMessage: '<strong>Вы: </strong>Круто!',
      },
    ],
    messages: [
      {
        destination: 'to',
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        messageTime: '11:56',
      },
      // {
      //   destination: 'to',
      //   imageUrl: '../../static/images/image-in-message.png',
      //   messageTime: '11:56',
      // },
      {
        destination: 'from',
        text: 'Круто!',
        messageTime: '11:56',
      },
    ],
    userProfileDataElements: [
      {
        elementValue: 'noname',
        formValue: 'login',
        ref: 'login',
        label: 'Логин',
        inputType: 'text',
      },
      {
        elementValue: 'Ноунейм',
        formValue: 'first_name',
        ref: 'first_name',
        label: 'Имя',
        inputType: 'text',
      },
      {
        elementValue: 'Ноунеймов',
        formValue: 'second_name',
        ref: 'second_name',
        label: 'Фамилия',
        inputType: 'text',
      },
      {
        elementValue: 'Ноунейм',
        formValue: 'display_name',
        ref: 'display_name',
        label: 'Имя в чате',
        inputType: 'text',
      },
      {
        elementValue: 'pochta@yandex.ru',
        formValue: 'email',
        ref: 'email',
        label: 'Почта',
        inputType: 'email',
      },
      {
        elementValue: '+79099673030',
        formValue: 'phone',
        ref: 'phone',
        label: 'Телефон',
        inputType: 'phone',
      },
    ],
    password: 'Supersecretpassword777',
  };

  static getAppState(): AppState {
    return this._appState;
  }
}