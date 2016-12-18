require("expose?Handlebars!handlebars");
require("../sass/main.scss")

import {BangumiInfo} from "./../../../server/share/interfaces" ;
import dateFormat = require('dateformat');

class MainApp {
    private static HTML = Handlebars.compile(`
    <table class="table">
		<thead>
			<tr>
				<th></th>
				<th>開始</th>
				<th>終了</th>
				<th width="300">タイトル</th>
				<th class="center">コメント</th>
			</tr>
		</thead>
		<tbody>
			{{#each bangumiList}}
				<tr style="{{rowColor commentCount}}">
					<td class="img">
						<img src="/resource/channel/{{id}}.png"></img>
					</td>
					<td>{{dateformat beginDate "HH:MM"}}</td>
					<td>{{dateformat endDate "HH:MM"}}</td>
					<td>{{title}}</td>
					<td class="comment-count">{{commentCount}}</td>
				</tr>
			{{/each}}
		</tbody>
	</table>
	`);

	private tableContainer: HTMLElement;
	public static init() {
		this.setHandlebarsHelper();
		const mainApp = new MainApp();
		mainApp.setContainer();
		mainApp.displayBangumi();
		mainApp.setInterval();
	}

	private static setHandlebarsHelper() {
		Handlebars.registerHelper("dateformat", (date: string, pattern: string) => dateFormat(new Date(date), pattern) );
		Handlebars.registerHelper("rowColor", (comment: number) => {
			const gb = 255 - Math.min(Math.ceil(comment / 400 * 255), 255);
			return `background-color: rgba(255, ${gb}, ${gb}, 0.3);`;
		});
    }

	private setContainer() {
		this.tableContainer = <HTMLElement> document.querySelector('.table-container');
	}

	private setInterval() {
		setInterval(() => this.displayBangumi(), 60 * 1000);
	}

	/** 番組表の表示 */
	private displayBangumi() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/bangumi');
		xhr.send();
		xhr.onload = () => {
			const dataText = xhr.responseText;
			let dataJson: BangumiInfo[] = JSON.parse(dataText);
			dataJson.sort((before , after) => before.id - after.id);
			this.tableContainer.innerHTML = MainApp.HTML({bangumiList: dataJson});
		};
	}
}

MainApp.init();