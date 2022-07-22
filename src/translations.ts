import i18next from 'i18next';
import enlang from './assets/i18n/en.json';
import ptlang from './assets/i18n/pt.json';

class Translations {
    private workYears: number;
    private livingInUkYears: number;
    private language: string;

    constructor(workYears: number, livingInUkYears: number) {
        this.workYears = workYears;
        this.livingInUkYears = livingInUkYears;

        let defaultLang = localStorage.getItem('LANG_KEY') || 'en';
        defaultLang = defaultLang === 'pt' || defaultLang === 'en' ? defaultLang : 'en';
        localStorage.setItem('LANG_KEY', defaultLang);
        document.documentElement.lang = defaultLang;

        this.language = defaultLang;
    }

    public initTranslations(): void {
        i18next
            .init({
                lng: this.language,
                resources: {
                    en: {
                        translation: {
                            introHeader: enlang.INTRO.HEADER,
                            introParagraph1: enlang.INTRO.PARAGRAPH1,
                            introParagraph2: enlang.INTRO.PARAGRAPH2,
                            aboutSubtitle: enlang.ABOUT.SUBTITLE,
                            aboutParagraph: enlang.ABOUT.PARAGRAPH,
                            radarHeader: enlang.RADAR.HEADER,
                            radarParagraph: enlang.RADAR.PARAGRAPH,
                            feHeader: enlang.FE.HEADER,
                            feParagraph: enlang.FE.PARAGRAPH,
                            socialFindMe: enlang.SOCIAL.FINDME,
                        },
                    },
                    pt: {
                        translation: {
                            introHeader: ptlang.INTRO.HEADER,
                            introParagraph1: ptlang.INTRO.PARAGRAPH1,
                            introParagraph2: ptlang.INTRO.PARAGRAPH2,
                            aboutSubtitle: ptlang.ABOUT.SUBTITLE,
                            aboutParagraph: ptlang.ABOUT.PARAGRAPH,
                            radarHeader: ptlang.RADAR.HEADER,
                            radarParagraph: ptlang.RADAR.PARAGRAPH,
                            feHeader: ptlang.FE.HEADER,
                            feParagraph: ptlang.FE.PARAGRAPH,
                            socialFindMe: ptlang.SOCIAL.FINDME,
                        },
                    },
                },
            })
            .then(() => this.updateContent(this.workYears, this.livingInUkYears));
        i18next.on('languageChanged', () => this.updateContent(this.workYears, this.livingInUkYears));
    }

    public changeLanguage(language: string): void {
        localStorage.setItem('LANG_KEY', language);
        document.documentElement.lang = language;
        i18next.changeLanguage(language);
    }

    private updateContent(workYears: number, livingInUkYears: number): void {
        document.getElementsByTagName('h2')![0].textContent = i18next.t('introHeader');
        document.getElementById('intro-p-1')!.textContent = i18next.t('introParagraph1');
        document.getElementById('intro-p-2')!.textContent = i18next.t('introParagraph2');
        document.getElementById('about-subtitle')!.textContent = i18next.t('aboutSubtitle');
        document.getElementById('about-p')!.textContent = i18next.t('aboutParagraph', { years: livingInUkYears });
        document.getElementsByTagName('h2')![1].textContent = i18next.t('radarHeader');
        document.getElementById('radar-p')!.textContent = i18next.t('radarParagraph', { years: workYears });
        document.getElementsByTagName('h2')![2].textContent = i18next.t('feHeader');
        document.getElementById('fe-p')!.textContent = i18next.t('feParagraph');
        document.getElementById('findme-s')!.textContent = i18next.t('socialFindMe');
    }

    public getCurrentLanguage(): string {
        return this.language;
    }
}

export { Translations };
