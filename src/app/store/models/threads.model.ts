export class PostFile{
	constructor(
		public displayname: string,
		public fullname: string,
		public name: string,
		public md5: string,
		public path: string,
		public thumbnail: string,
		public type: number,
		public height: number,
		public width: number,
		public tn_height: number,
		public tn_width: number,
		public size: number
	){}
}
  
export class DvachThread{
	constructor(
		public board: string,
		public posts_count: number,
		public files_count: number,
		public current_thread: string,
		public files: PostFile[],
		public title: string,
		public threadURL: string
	){}
}