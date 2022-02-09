export enum Theme {
  LIGHT,
  DARK,
  SYSTEM
}

export function getThemeSetting(): Theme {
  const setting = localStorage.getItem('theme')

  if (setting === null) return Theme.SYSTEM
  else if (setting === Theme.LIGHT.toString()) return Theme.LIGHT
  else return Theme.DARK
}

function setDarkTheme(): void {
  document.body.classList.add('dark')
}

function setLightTheme(): void {
  document.body.classList.remove('dark')
}

function toggleTheme(): Theme{
  const newSetting = document.body.classList.toggle('dark') ? Theme.DARK : Theme.LIGHT

  return newSetting
}

export function updateTheme(setting?: Theme): Theme {
  let newSetting = setting

  switch (setting) {
    case Theme.LIGHT:
      setLightTheme()
      break;

    case Theme.DARK:
      setDarkTheme()
      break;

    case Theme.SYSTEM:
      if (matchMedia('(prefers-color-scheme: light)').matches) {
        setLightTheme()
      } else {
        setDarkTheme()
      }

      Theme.SYSTEM
      break;

    case undefined:
      newSetting = toggleTheme()
      break;

    default:
      break;
  }

  return newSetting!
}