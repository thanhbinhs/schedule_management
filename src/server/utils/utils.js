// src/server/utils.js

export function generateUsername(name, appendNumber = false) {
    // Remove diacritics
    const nameWithoutDiacritics = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Remove non-alphanumeric characters and spaces
    const username = nameWithoutDiacritics.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return appendNumber ? `${username}1` : username;
  }
  