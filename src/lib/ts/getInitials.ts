	// Function to split fullname and combine the first two letter of first and last name
	export function getInitials(name: string) {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('');
	}