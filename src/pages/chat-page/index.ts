import './chat-page.css';

import image from '../../assets/4.png';

// import avatar4 from '../../assets/4.png';
// import avatar5 from '../../assets/5.png';
// import avatar6 from '../../assets/6.png';
// import avatar7 from '../../assets/7.png';
// import avatar8 from '../../assets/8.png';
// import avatar9 from '../../assets/9.png';
// import avatar10 from '../../assets/10.png';
// import avatar11 from '../../assets/11.png';

import ChatPage from './chat-page';
export default ChatPage;

export const messages = [
	{
		kind: 'incoming',
		type: 'text',
		text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила 
		Хассельблад адаптировать модель SWC для полетов на Луну. 
		Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, 
		так как астронавты с собой забрали только кассеты с пленкой.

		Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. 
		Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
		date: '11:25',
	},
	{ kind: 'incoming', type: 'image', image, date: '18:11' },
	{
		kind: 'incoming',
		type: 'text',
		text: 'Привет. Как дела?',
		date: '18:11',
	},
	{
		kind: 'outgoing',
		type: 'text',
		text: 'Привет. Хассельблад в итоге адаптировал SWC для космоса?',
		date: '18:11',
	},
];
