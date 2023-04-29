interface IUser {
	name: string;
	email: string;
	password: string;
}

const users: IUser[] = [];

export const getUsers = () => {
	return users;
};
