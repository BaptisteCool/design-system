export interface FileListItem {
	id: string;
	title: string;
	state?: string;
	name?: string;
	file?: File;
}

export interface SelectItem {
	text: string;
	value: string;
}
