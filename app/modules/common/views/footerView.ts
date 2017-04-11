type SeoLinks = Array<{
    content: string,
    url: string
}>;

class FooterView {
    public render(seoLinks: SeoLinks) {
        const year = new Date().getFullYear();

        return {
            copyright: `© Маркет Мела ${year}`,
            contactLinks: footerView.contactLinks(),
            seoLinks: seoLinks
        };
    };

    public contactLinks() {
        return [{
            content: 'Сотрудничество',
            url: 'mailto:vs@mel.fm'
        }, {
            content: 'Пользовательское соглашение',
            url: 'http://mel.fm/terms-of-use'
        }];
    }
}

const footerView = new FooterView();

export {footerView};
