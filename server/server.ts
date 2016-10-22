import 'source-map-support/register'; // エラー時、tsファイルの行数を教える
import {createServer}  from 'http';
import * as express from 'express';
import {Express, Request, Response} from 'express';
import {BangumiInfo} from "./share/Interfaces";
import {GetBangumiService} from "./service/GetBangumiService";

class Application {
	public static init() {
		const server = createServer();
		const app = express();
		app.use(express.static(__dirname + '/public'));
		const bangumiService = new GetBangumiService();
		new MainController(bangumiService, app).init();
		server.on('request', app);
		server.listen(process.env.PORT || 3000, () => console.log('server on port %s', server.address().port));
	}
}

class MainController {
	private bangumis: BangumiInfo[];
	constructor(private bangumiService: GetBangumiService,
				private app: Express ) {};
	public init() {
		this.fetchBangumi();
		setInterval(() => this.fetchBangumi(), 1 * 60 * 1000);
		this.app.get('/api/bangumi', (req, res) => this.getBangumi(req, res));
	}

	private fetchBangumi() {
		this.bangumiService.fetch().then(bangumiList => this.bangumis = bangumiList);
	}

	private getBangumi(req: Request, res: Response) {
		res.send(this.bangumis);
	}
}

Application.init();