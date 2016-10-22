export interface BangumiInfo {
	title: string;
	id: number;
	beginDate: Date;
	endDate: Date;
	commentCount: number;
}

interface ChannnelInfo {
	id: number;
	soNetCName: string;
	nicoId: number;
}
export const CHANNEL_INFO: ChannnelInfo[] = [
	{
		id: 0,
		soNetCName: "ＮＨＫ総合・東京",
		nicoId: 1
	}, {
		id: 1,
		soNetCName: "ＮＨＫＥテレ１・東京",
		nicoId: 2
	}, {
		id: 2,
		soNetCName: "日テレ",
		nicoId: 4
	}, {
		id: 3,
		soNetCName: "ＴＢＳ",
		nicoId: 6
	}, {
		id: 4,
		soNetCName: "フジテレビ",
		nicoId: 8
	}, {
		id: 5,
		soNetCName: "テレビ朝日",
		nicoId: 5
	}, {
		id: 6,
		soNetCName: "テレビ東京",
		nicoId: 7
	}, {
		id: 7,
		soNetCName: "ＴＯＫＹＯ　ＭＸ１",
		nicoId: 9
	}
];

