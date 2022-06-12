import { Block } from '../../core';
import { validation } from '../../utils';

export class LoginPage extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      // Здесь начинаются проблемы с фокусом
      validateLogin: () => {
        const loginData = {
          login: (this.refs.login.children[1] as HTMLInputElement).value,
          password: (this.refs.password.children[1] as HTMLInputElement).value,
        };

        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...loginData },
        };

        if (!validation('login', loginData.login)) {
          nextState.errors.login = 'Login is invalid';
        }

        this.setState(nextState);
      },
      validatePassword: () => {},
      onLogin: () => {
        const loginData = {
          login: (this.refs.login.children[1] as HTMLInputElement).value,
          password: (this.refs.password.children[1] as HTMLInputElement).value,
        };

        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...loginData },
        };

        if (!validation('login', loginData.login)) {
          nextState.errors.login = 'Login is invalid';
        }

        if (!validation('password', loginData.password)) {
          nextState.errors.password = 'Password is invalid';
        }

        this.setState(nextState);

        console.log('action/login', loginData);
      },
    };
  }

  protected render(): string {
    const { errors, values } = this.state;

    return `
    <main>
        <div class="access sign-in">
            <h3 class="access__header">Вход</h3>
            <form class="access__form" name="sign_in">
                <div class="access__fieldset">
                    {{{AccessFormField label="Логин" ref="login" 
                    formValue="login" value="${values.login}" error="${errors.login}" 
                    inputType="text" onFocus=validateLogin}}}
                    {{{AccessFormField label="Пароль" ref="password" 
                    formValue="password" value="${values.password}" error="${errors.password}" 
                    inputType="password" onFocus=validatePassword}}}
                </div>
                <div class="access__buttons-block">
                    {{{Button classes="access__button" title="Войти" form="sign_in" type="button" onClick=onLogin}}}
                    {{{Link classes="access__link" to="SIGN_UP" text="Нет аккаунта?"}}}
                </div>
            </form>
        </div>
    </main>
    `;
  }
}
