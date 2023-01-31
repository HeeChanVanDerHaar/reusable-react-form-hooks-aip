let lastId = 0;

export function newId(prefix: string = ''): string {
	return `${prefix}_${++lastId}`;
}
