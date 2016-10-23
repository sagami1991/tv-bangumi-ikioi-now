require("expose?Handlebars!handlebars");
require("../sass/main.scss")

import {Test} from "./test";
import {BangumiInfo} from "../../../server/share/interfaces" ;
import dateFormat = require('dateformat');
/**
 * MainApp
 */
class MainApp {
    private static HTML = Handlebars.compile(`
    <table class="table">
        <tr>
            <th>id</th>
            <th>開始時刻</th>
            <th>終了時刻</th>
            <th>タイトル</th>
            <th>コメント数</th>
        </tr>
            {{#each bangumiList}}
                <tr>
                    <td>
                        <img src="/resource/channel/{{id}}.png"></img>
                    </td>
                    <td>{{dateformat beginDate "HH:mm"}}</td>
                    <td>{{endDate}}</td>
                    <td>{{title}}</td>
                    <td>{{commentCount}}</td>
                </tr>
            {{/each}}
    </table>

    `);

    public static init() {
        const mainApp = new MainApp();
        mainApp.setHandlebarsHelper();
        mainApp.displayBangumi();
    }

    private setHandlebarsHelper() {
        Handlebars.registerHelper("dateformat", (date: Date, pattern: string) => dateFormat(date, pattern) );
    }

    /**
     * 番組表の表示
     */
    private displayBangumi() {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', '/api/bangumi');
        xhr.send();
        xhr.onload = () => {
            const dataText = xhr.responseText;
            let dataJson: BangumiInfo[] = JSON.parse(dataText);
            dataJson.sort((before , after) => before.id - after.id);
            const element = document.querySelector('.table-wrapper');
            element.innerHTML = MainApp.HTML({bangumiList: dataJson});
            console.log(dataJson);
        }
    }
}

MainApp.init();