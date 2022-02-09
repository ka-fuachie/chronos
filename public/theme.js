export var Theme;
(function (Theme) {
    Theme[Theme["LIGHT"] = 0] = "LIGHT";
    Theme[Theme["DARK"] = 1] = "DARK";
    Theme[Theme["SYSTEM"] = 2] = "SYSTEM";
})(Theme || (Theme = {}));
export function getThemeSetting() {
    const setting = localStorage.getItem('theme');
    if (setting === null)
        return Theme.SYSTEM;
    else if (setting === Theme.LIGHT.toString())
        return Theme.LIGHT;
    else
        return Theme.DARK;
}
function setDarkTheme() {
    document.body.classList.add('dark');
}
function setLightTheme() {
    document.body.classList.remove('dark');
}
function toggleTheme() {
    const newSetting = document.body.classList.toggle('dark') ? Theme.DARK : Theme.LIGHT;
    return newSetting;
}
export function updateTheme(setting) {
    let newSetting = setting;
    switch (setting) {
        case Theme.LIGHT:
            setLightTheme();
            break;
        case Theme.DARK:
            setDarkTheme();
            break;
        case Theme.SYSTEM:
            if (matchMedia('(prefers-color-scheme: light)').matches) {
                setLightTheme();
            }
            else {
                setDarkTheme();
            }
            Theme.SYSTEM;
            break;
        case undefined:
            newSetting = toggleTheme();
            break;
        default:
            break;
    }
    return newSetting;
}
