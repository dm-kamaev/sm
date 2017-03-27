import {bSmLink} from '../../../blocks/n-common/b-sm-link/params';

class GeneralData {
    public getContactLinks(): Array<bSmLink.Params.Data> {
        return [{
            content: 'Сотрудничество',
            url: 'mailto:vs@mel.fm'
        }, {
            content: 'Пользовательское соглашение',
            url: 'http://mel.fm/terms-of-use'
        }];
    }

    public getCopyright(): string {
        return `© Маркет Мела ${new Date().getFullYear()}`;
    }
};

const generalDataView = new GeneralData();
export {generalDataView};
