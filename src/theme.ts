export enum Theme {
  LIGHT,
  DARK,
  SYSTEM
}

export function getThemeSetting(): Theme {
  const setting = localStorage.getItem('theme')

  if (setting === Theme.LIGHT.toString()) return Theme.LIGHT
  else if (setting === Theme.DARK.toString()) return Theme.DARK
  else if (setting === Theme.SYSTEM.toString()) return Theme.SYSTEM

  else return Theme.SYSTEM
}

export function setDarkTheme(): void {
  document.body.classList.add('dark')
}

export function setLightTheme(): void {
  document.body.classList.remove('dark')
}

function toggleTheme(): Theme {
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
      
      break;

    case undefined:
      newSetting = toggleTheme()
      break;

    default:
      break;
  }

  localStorage.setItem('theme', newSetting!.toString())
  return newSetting!
}