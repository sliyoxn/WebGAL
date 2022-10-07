const Keys = {
  RotateFlag: 'RotateFlag',
};

export function setRotateFlag(flag: boolean) {
  localStorage.setItem(Keys.RotateFlag, String(flag));
}

export function getRotateFlag() {
  if (localStorage.getItem(Keys.RotateFlag)) {
    return JSON.parse(String(localStorage.getItem(Keys.RotateFlag)));
  } else {
    return false;
  }
}

// export {}
