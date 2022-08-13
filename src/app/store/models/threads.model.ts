// export class PostFile{
// 	constructor(
// 		public displayname: string,
// 		public fullname: string,
// 		public name: string,
// 		public md5: string,
// 		public path: string,
// 		public thumbnail: string,
// 		public type: number,
// 		public height: number,
// 		public width: number,
// 		public tn_height: number,
// 		public tn_width: number,
// 		public size: number
// 	){}
// }
  
export class DvachThread{
	constructor(
		public board: string,
		public posts_count: number,
		public files_count: number,
		public current_thread: string,
		public files: DvachFile[],
		public title: string,
		public threadURL: string
	){}
}

export interface DvachFile {
	displayname: string,
	fullname: string,
	name: string,
	md5: string,
	path: string,
	thumbnail: string,
	type: number,
	height: number,
	width: number,
	tn_height: number,
	tn_width: number,
	size: number
}

export interface ResponceDvachThread {
	board: {
		id: string
	}
	posts_count: number,
	files_count: number,
	current_thread: string,
	title: string,
	threads: {
		posts: {
			files: DvachFile[] & null
		}[]
	}[]
}
