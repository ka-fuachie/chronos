export var Theme;
(function (Theme) {
    Theme[Theme["LIGHT"] = 0] = "LIGHT";
    Theme[Theme["DARK"] = 1] = "DARK";
    Theme[Theme["SYSTEM"] = 2] = "SYSTEM";
})(Theme || (Theme = {}));
export function getThemeSetting() {
    const setting = localStorage.getItem('theme');
    if (setting === Theme.LIGHT.toString())
        return Theme.LIGHT;
    else if (setting === Theme.DARK.toString())
        return Theme.DARK;
    else if (setting === Theme.SYSTEM.toString())
        return Theme.SYSTEM;
    else
        return Theme.SYSTEM;
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
function handleSystemThemeChange(e) {
    if (e.matches)
        setLightTheme();
    else
        setDarkTheme();
}
export function updateTheme(setting) {
    matchMedia('(prefers-color-scheme: light)').removeEventListener('change', handleSystemThemeChange);
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
            matchMedia('(prefers-color-scheme: light)').addEventListener('change', handleSystemThemeChange);
            break;
        case undefined:
            newSetting = toggleTheme();
            break;
        default:
            break;
    }
    localStorage.setItem('theme', newSetting.toString());
    return newSetting;
}
