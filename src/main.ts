import Handlebars from 'handlebars';
import './style.css';
import * as Components from './components';
import * as Pages from './pages';
import avatar from './assets/5.png';
import dots from './assets/dots.svg';
import larger from './assets/larger.svg';
import arrow from './assets/arrow.svg';
import defaultAvatar from './assets/avatar.png';

const pages = {
    login: [Pages.loginPage],
    signin: [Pages.signinPage],
    chatPage: [Pages.chatPage, { avatar, dots, larger }],
    profile: [Pages.profile, { arrow, defaultAvatar }],
    errorPage: [Pages.errorPage],
    notFoundPage: [Pages.notFoundPage],
};

Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

document.addEventListener('DOMContentLoaded', () => navigate('login'));

function navigate(page: string) {
    //@ts-ignore
    const [source, context] = pages[page];
    const container = document.getElementById('app')!;
    container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('click', (e) => {
    //@ts-ignore
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
