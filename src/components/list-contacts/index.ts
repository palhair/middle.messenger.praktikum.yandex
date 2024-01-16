import Handlebars from 'handlebars';
import avatar1 from '../../assets/1.png';
import avatar2 from '../../assets/2.png';
import avatar3 from '../../assets/3.png';
import avatar4 from '../../assets/4.png';
import avatar5 from '../../assets/5.png';
import avatar6 from '../../assets/6.png';
import avatar7 from '../../assets/7.png';
import avatar8 from '../../assets/8.png';
import avatar9 from '../../assets/9.png';
import avatar10 from '../../assets/10.png';
import avatar11 from '../../assets/11.png';

export { ListContacts as default } from './list-contacts';

Handlebars.registerHelper('contacts', () => {
	return [
		{
			avatar: avatar1,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
		},
		{
			avatar: avatar2,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
		},
		{
			avatar: avatar3,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
			unreadMessage: 12,
		},
		{
			avatar: avatar4,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
		},
		{
			avatar: avatar5,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
			unreadMessage: 122,
		},
		{
			avatar: avatar6,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
		},
		{
			avatar: avatar7,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
		},
		{
			avatar: avatar8,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
		},
		{
			avatar: avatar9,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
		},
		{
			avatar: avatar10,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
		},
		{
			avatar: avatar11,
			name: 'Sasha Grey',
			lastMessage: 'Привет',
			lastMessageDate: '11:20',
		},
	];
});
