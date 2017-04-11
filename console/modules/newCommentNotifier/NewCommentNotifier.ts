/**
 * @fileOverview Abstract new comment notifier
 */
interface MailSenderConstructor {
    new(transporter: any, fromAddress: string): MailSender;
}

interface MailSender {
    sendMail(email: string, letter: any);
}

interface Notifiable {
    isNoticeSend: boolean;
}

interface Entity {
    id?: number;
    name?: string;
}

const MailSender: MailSenderConstructor =
    require('../../../node_modules/nodules/mail').MailSender;
const Letter = require('../../../node_modules/nodules/mail').Letter;
const transporterGenerator =
    require('../../../node_modules/nodules/mail').TransporterGenerator;
import {
    service as pageService
} from '../../../api/modules/entity/services/page';

/** Models initialization */
const modules = require('../../../api/modules');

const stopList: Array<string> = require('./stop-list.json');

abstract class NewCommentNotifier {
    protected stopList: Array<string>;
    protected mailSender: MailSender;
    protected email: string;
    protected entityType: string;

    constructor() {
        this.stopList = stopList;

        this.mailSender = this.initMailSender();
    }

    public async start() {
        const notNotifiedComments = await this.getNotNotifiedComments();
        await this.sendNotifications(notNotifiedComments);
    }

    protected async abstract getNotNotifiedComments():
        Promise<Array<Notifiable>>

    protected async sendNotifications(
            comments: Array<Notifiable>): Promise<Array<void>> {
        return Promise.all(
            comments.map(comment => this.sendNotification(comment))
        );
    };

    protected async sendNotification(comment: Notifiable) {
        const theme = this.generateTheme(comment),
            letterText = await this.generateLetterText(comment);

        this.sendLetter(theme, letterText);
        await this.setSentNotificationState(comment);
    }

    protected generateTheme(comment): string {
        return this.checkCommentText(comment) ?
            'ВАЖНО: Оставлен некорректный комментарий' :
            'Оставлен комментарий';
    }

    protected async generateLetterText(comment: Notifiable): Promise<string> {
        const entity = await this.getEntityByComment(comment),
            entityLink = await this.getEntityLink(entity),
            entityName = this.getEntityName(entity),
            commentText = this.getFormattedCommentText(comment),
            commentEditLink = this.getCommentEditLink(comment, entity);

        return `Для ${entityName} (${entityLink})` +
            ` был оставлен комментарий:<br />` +
            `${commentText}<br /><br />` +
            `Ссылка для редактирования: ${commentEditLink}`;
    }

    protected abstract async getEntityByComment(
            comment: Notifiable): Promise<Entity>;

    protected abstract async getEntityLink(entity: Entity): Promise<string>;

    protected async getEntityAlias(entity: Entity): Promise<string> {
        const page = await pageService.getOne(entity.id, this.entityType);
        return page.alias;
    };

    protected getEntityName(entity: Entity): string {
        return entity.name;
    }

    protected abstract getFormattedCommentText(comment: Notifiable): string;

    protected abstract getCommentEditLink(
        comment: Notifiable, entity: Entity): string;

    protected async abstract setSentNotificationState(
            comment: Notifiable): Promise<void>;

    /**
     * Checks comment's text on forbidden words from stop-words list
     */
    protected checkCommentText(comment: Notifiable): boolean {
        const text = this.getRawCommentText(comment);
        let i = this.stopList.length,
            isExplicit = false;

        while (i-- && !isExplicit) {
            if (text.indexOf(this.stopList[i]) > -1) {
                isExplicit = true;
            }
        }
        return isExplicit;
    };

    protected abstract getRawCommentText(comment: Notifiable): string;

    protected sendLetter(theme: string, letterText: string) {
        const letter = new Letter(theme, letterText, 'html');
        this.mailSender.sendMail(this.email, letter);
    }

    protected initMailSender(): MailSender {
        const transporter = transporterGenerator.createSMTPTransporter({
            debug: true,
            name: 'cochanges.com'
        });
        return new MailSender(
            transporter, 'market.mel.fm <sender@mel.fm>'
        );
    }
}

export {NewCommentNotifier};
