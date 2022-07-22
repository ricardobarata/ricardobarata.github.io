import { Translations } from './translations';

class Buttons {
    private language: string;
    private btnEn: HTMLButtonElement;
    private btnPT: HTMLButtonElement;
    private btnTheme: HTMLButtonElement;
    private btnLikes: HTMLButtonElement;
    private likes: HTMLElement;
    private likesCounter: number;

    constructor(private translations: Translations) {
        this.language = translations.getCurrentLanguage();
        this.likesCounter = 50;
        this.btnEn = document.getElementById('btn-en') as HTMLButtonElement;
        this.btnPT = document.getElementById('btn-pt') as HTMLButtonElement;
        this.btnTheme = document.getElementById('btn-theme') as HTMLButtonElement;
        this.btnLikes = document.getElementById('btn-likes') as HTMLButtonElement;
        this.likes = document.getElementById('likes') as HTMLButtonElement;
    }

    public initButtons(): void {
        switch (this.language) {
            case 'en':
                this.btnEn.disabled = true;
                this.btnEn.classList.add('btn-active');
                this.btnPT.classList.add('btn-inactive');
                break;
            case 'pt':
                this.btnPT.disabled = true;
                this.btnPT.classList.add('btn-active');
                this.btnEn.classList.add('btn-inactive');
                break;
            default:
                break;
        }

        const defaulTheme = localStorage.getItem('THEME_KEY') || 'theme-primary';
        if (defaulTheme === 'theme-primary') {
            this.btnTheme.classList.add('btn-active');
            document.body.className = document.body.className.replace('theme-secondary', 'theme-primary');
        } else {
            this.btnTheme.classList.add('btn-inactive');
            document.body.className = document.body.className.replace('theme-primary', 'theme-secondary');
        }

        this.btnEn.addEventListener('click', () => this.switchLang());
        this.btnPT.addEventListener('click', () => this.switchLang());
        this.btnTheme.addEventListener('click', () => this.switchTheme());
        this.btnLikes.addEventListener('click', () => {
            if (this.likesCounter >= 50 && this.likesCounter <= 99) {
                this.like();
            }
        });
    }

    private like(): void {
        this.likesCounter++;
        this.likes.textContent = this.likesCounter.toString();
    }

    private switchLang(): void {
        switch (this.language) {
            case 'en':
                this.language = 'pt';
                this.btnEn.disabled = false;
                this.btnPT.disabled = true;
                this.btnEn.classList.replace('btn-active', 'btn-inactive');
                this.btnPT.classList.replace('btn-inactive', 'btn-active');
                break;
            case 'pt':
                this.language = 'en';
                this.btnEn.disabled = true;
                this.btnPT.disabled = false;
                this.btnPT.classList.replace('btn-active', 'btn-inactive');
                this.btnEn.classList.replace('btn-inactive', 'btn-active');
                break;
            default:
                break;
        }
        this.translations.changeLanguage(this.language);
    }

    private switchTheme(): void {
        if (this.btnTheme.classList.contains('btn-active')) {
            this.btnTheme.classList.replace('btn-active', 'btn-inactive');
        } else {
            this.btnTheme.classList.replace('btn-inactive', 'btn-active');
        }
        this.btnTheme.blur();

        switch (document.body.className) {
            case 'theme-primary':
                document.body.className = document.body.className.replace('theme-primary', 'theme-secondary');
                localStorage.setItem('THEME_KEY', 'theme-secondary');
                break;
            case 'theme-secondary':
                document.body.className = document.body.className.replace('theme-secondary', 'theme-primary');
                localStorage.setItem('THEME_KEY', 'theme-primary');
                break;
            default:
                break;
        }
    }
}

export { Buttons };
