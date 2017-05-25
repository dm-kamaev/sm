"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralData {
    getContactLinks() {
        return [{
                content: 'Сотрудничество',
                url: 'mailto:vs@mel.fm'
            }, {
                content: 'Пользовательское соглашение',
                url: 'http://mel.fm/page/terms-of-use'
            }];
    }
    getCopyright() {
        return `© Маркет Мела ${new Date().getFullYear()}`;
    }
}
;
const generalDataView = new GeneralData();
exports.generalDataView = generalDataView;
