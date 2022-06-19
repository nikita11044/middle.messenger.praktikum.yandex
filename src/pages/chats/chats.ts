import { Block } from '../../core';
import { Store } from '../../store';
import { errorInField, getComponentsLayoutFromArray } from '../../utils';

interface ChatsPageProps {
  events: { children?: Record<string, Record<string, (e: SubmitEvent) => void>> }
}

export class ChatsPage extends Block<ChatsPageProps> {
  constructor() {
    super({
      events: {
        children: {
          messageForm: {
            submit: (e: SubmitEvent) => {
              e.preventDefault();
              const messageText = (this.getContent().querySelector('#messageText') as HTMLInputElement).value;
              if (!errorInField('message', messageText)) {
                console.log({ messageText });
              }
            },
          },
        },
      },
    });
  }

  protected render(): string {
    const chatsLayout = getComponentsLayoutFromArray('Chat', Store.getAppState().chats);
    const messageLayout = getComponentsLayoutFromArray('Message', Store.getAppState().messages);

    return `
      <main>
        <div class="chats">
            <div class="chats__chat-list-wrapper">
            {{{Link classes="profile-button" to="PROFILE" text="Профиль"}}}
            <div class="search-field">
                <input class="search-field__input" id="chatName" name="chatName" placeholder=" Поиск" type="text" />
            </div>
            <ul class="chats-list">
                ${chatsLayout}
            </ul>
            </div>
            <div class="feed">
                <div class="feed__feed-panel">
                    <div class="chat-info">
                        <div class="avatar-placeholder"></div>
                        <h3 class="chat-name">Вадим</h3>
                    </div>
                    <button class="icon-button icon-button_menu"></button>
                </div>
                <div class="messages-wrapper">
                    <section class="date-message-group">
                        <div class="date-message-group__date">12 мая</div>
                        <ul class="message-list">
                            ${messageLayout}
                        </ul>  
                    </section>
                </div>
                <form data-append-event="messageForm" class="message-form" name="message-form">
                    <input class="message-form__attachment-input" type="file" name="image" form="message-form"/>
                    <button class="icon-button icon-button_attachment"></button>
                    <input id="messageText" class="message-form__message-input" oninput="this.parentNode.dataset.value = this.value" name="message" form="message-form" placeholder="Сообщение"/>
                    <button class="icon-button icon-button_arrow-right" type="submit"></button>
                </form>
            </div>
        </div>
       </main>
    `;
  }
}
