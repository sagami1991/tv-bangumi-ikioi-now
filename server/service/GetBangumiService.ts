import * as request from "request";
import {parseString} from "xml2js";
import {CHANNEL_INFO, BangumiInfo} from "../share/Interfaces";


interface RawXml {
	title: string[];
	description: string[];
}

interface NicoXml {
	id: string[];
	thread: { force: string[]}[];
}

export class GetBangumiService {
	private static SONET_API_URL = "http://tv.so-net.ne.jp/rss/schedulesByCurrentTime.action?group=10&stationAreaId=23";
	private static NICO_API_URL = "http://jk.nicovideo.jp/api/v2_app/getchannels";
	public fetch(): Promise<BangumiInfo[]>  {
		return new Promise((resolve, reject) => {
			this.fetchSonetApi().then(bangumiInfoList => {
				this.fetchNicoAPI(bangumiInfoList).then(() => {
					resolve(bangumiInfoList);
				});
			});
		});
	}

	/** sonetのAPIから取得 */
	private fetchSonetApi(): Promise<BangumiInfo[]> {
		return new Promise((resolve, reject) => {
			request.get(GetBangumiService.SONET_API_URL, (err, res, resBody) => {
				parseString(resBody, (err, result) => {
					const infos: RawXml[]  = result["rdf:RDF"]["item"];
					const bangumiInfoList: BangumiInfo[] = infos.map(info => {
						const description = info.description[0];
						const matchArr = description.match(/([0-9]{1,2})\/([0-9]{1,2})\s([0-9]{1,2}):([0-9]{1,2})～([0-9]{1,2}):([0-9]{1,2})\s\[(.+)\(/);
						const nowYear = new Date().getFullYear();
						return {
							title: info.title[0],
							id: this.cNameToId(matchArr[7]),
							beginDate: new Date(nowYear, +matchArr[1] - 1, +matchArr[2], +matchArr[3], +matchArr[4]),
							endDate: new Date(nowYear, +matchArr[1] - 1, +matchArr[2], +matchArr[5], +matchArr[6]),
							commentCount: 0
						};
					}).filter(info => info.id !== null);
					resolve(bangumiInfoList);
				});
			});
		});
	}

	/** ニコニコのAPIから取得 */
	private fetchNicoAPI(bangumiList: BangumiInfo[]): Promise<void> {
		return new Promise((resolve, reject) => {
			request.get(GetBangumiService.NICO_API_URL, (err, res, resBody)  => {
				parseString(resBody, (err, result) => {
					const infos: NicoXml[] = result["channels"]["channel"];
					infos.forEach(info => {
						const bangumiInfo = bangumiList.find(bangumi => bangumi.id === this.nicoIdToId(+info.id[0]));
						if (bangumiInfo) {
							bangumiInfo.commentCount = +info.thread[0].force[0];
						}
					});
					resolve();
				});
			});
		});
	}

	/** チャンネル名をチャンネルIDに */
	private cNameToId(channelName: string) {
		const channel = CHANNEL_INFO.find(info => info.soNetCName === channelName);
		return channel ? channel.id : null;
	}

	/** ニコニコのIDをチャンネルIDに */
	private nicoIdToId(nicoId: number) {
		const channel = CHANNEL_INFO.find(info => info.nicoId === nicoId);
		return channel ? channel.id : null;
	}
}
