document.addEventListener('DOMContentLoaded', (event) => {
  const toggleThemeButton = document.getElementById("toggleTheme");
  const root = document.documentElement;

  function updateButton(theme) {
    if (theme === 'dark') {
      toggleThemeButton.innerHTML = "Claro"; // Sol para tema claro
    } else {
      toggleThemeButton.innerHTML = "Escuro"; // Lua para tema escuro
    }
  }

  // Carregar tema salvo no localStorage, se houver
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    root.style.setProperty('--text-color', 'var(--text-color-dark)');
    root.style.setProperty('--bg-color', 'var(--bg-color-dark)');
    updateButton('dark');
  } else {
    updateButton('light');
  }

  toggleThemeButton.addEventListener("click", function() {
    if (root.style.getPropertyValue('--text-color') === 'var(--text-color-dark)') {
      root.style.setProperty('--text-color', 'var(--text-color-light)');
      root.style.setProperty('--bg-color', 'var(--bg-color-light)');
      localStorage.setItem('theme', 'light');
      updateButton('light');
    } else {
      root.style.setProperty('--text-color', 'var(--text-color-dark)');
      root.style.setProperty('--bg-color', 'var(--bg-color-dark)');
      localStorage.setItem('theme', 'dark');
      updateButton('dark');
    }
  });
});


const database = {
    "Grigiore": {
    "Mago": ["Staff of Lam Esen", "Iceheart Brais", "Gloves of the Illuminator"],
    "Bárbaro": ["Ramaladni's Magnum Opus", "Rage of Harrogath", "Ancients'Oath", "Battle Trance", "The Butcher's Cleaver"],
    "Druida": ["Insatiable Fury", "Hunter's Zenith", "Waxing Gibbous", "The Butcher's Cleaver"],
    "Necromante": ["Blood Artisan's Cuirass", "Howl from Below", "Greaves of the Empty  Tomb"],
    "Renegado": ["Word of Hakan", "Grasp of Shadow", "Windforce"],
    "Genérico": ["Penitent Greaves"]
    },
    "Varshan": {
        "Mago": ["Staff of Endless Rage", "Esu's Heirloom", "Raiment of the Infinite"],
        "Bárbaro": ["Fields of Crimson", "100,000 Steps", "Gohr's Devastating Grips"],
        "Druida": ["Mad Wolf's Glee", "Vasily's Prayer", "Greatstaff of the Crone"],
        "Necromante": ["Bloodless Scream", "Deathless Visage", "Deathspeaker's Pendant"],
        "Renegado": ["Condemnation", "Eyes in the Dark", "Skyhunter"],
        "Genérico": ["Frostburn", "Mother's Embrace"]
    },
    "Lord Zir": {
        "Mago": ["Staff of Endless Rage", "Iceheart Brais", "Raiment of the Infinite", "Esadoras Overflowing Cameo"],
        "Bárbaro": ["Ramaladni's Magnum Opus", "Rage of Harrogath", "Gohrs Devastating Grips", "Overkill", "The Butcher's Cleaver"],
        "Druida": ["Mad Wolf's Glee", "Vasily's Prayer", "Greatstaff of the Crone", "Fleshrender", "The Butcher's Cleaver"],
        "Necromante": ["Blood Artisans Cuirass", "Deathless Visage", "Greaves of the Empty Tomb", "Lidless Wall"],
        "Renegado": ["Grasp of Shadow", "Eyes in the Dark", "Skyhunter", "Ashearas Khanjar"],
        "Genérico": ["Penitent Greaves", "Razorplate", "Temerity"]
    },
    "Beast in Ice": {
        "Mago": ["Staff of Lam Esen", "Esu's Heirloom", "Gloves of the Illuminator", "The Oculus"],
        "Bárbaro": ["Fields of Crimson", "100,000 Steps", "Ancients'Oath", "Battle Trance", "Hellhammer"],
        "Druida": ["Insatiable Fury", "Hunters Zenith", "Waxing Gibbous", "Storms Companion"],
        "Necromante": ["Bloodless Scream", "Howl from Below", "Deathspeaker's Pendant", "Ring of Mendeln"],
        "Renegado": ["Condemnation", "Word of Hakan", "Windforce", "Eaglehorn"],
        "Genérico": ["Frostburn", "Mother's Embrace", "Fists of Fate", "Tassets of the Dawning Sky"]
    },
    "Duriel": {
        "Mago": ["Flamescar", "Blue Rose", "Ahavarion, Spear of Lycander (UBER)"],
        "Bárbaro": ["Azurewrath", "Tuskhelm of Joritz the Mighty", "Doombringer (UBER)", "The Grandfather (UBER)"],
        "Druida": ["Tempest Roar", "Dolmen Stone", "Ahavarion, Spear of Lycander (UBER)"],
        "Necromante": ["Black River", "Blood Moon Breeches", "Doombringer (UBER)", "The Grandfather (UBER)"],
        "Renegado": ["Cowl of the Nameless", "Scoundrels Leathers", "Doombringer (UBER)"],
        "Genérico": ["Godslayer Crown", "Flickerstep", "Tibaults Will", "XFals Corroded Signet", "Soulbrand", "Banished Lords Talisman", "Melted Heart of Selig (UBER)", "Andariels Visage (UBER)", "Harlequin Crest (UBER)", "Ring of Starless Skies (UBER)"]
    }
};

  
  const bossSelect = document.getElementById('bossSelect');
  const classSelect = document.getElementById('classSelect');
  
  for (const boss in database) {
    bossSelect.innerHTML += `<option value="${boss}">${boss}</option>`;
  }
  
  for (const cls in database[Object.keys(database)[0]]) {
    classSelect.innerHTML += `<option value="${cls}">${cls}</option>`;
  }
  
  function searchDatabase() {
    const selectedBoss = bossSelect.value;
    const selectedClass = classSelect.value;
    const itemQuery = document.getElementById('itemSearch').value.toLowerCase().trim();
    let results = '';

    if (selectedBoss) {
      results += `<h2>${selectedBoss}</h2>`;
      if (selectedClass) {
        results += `<h3>${selectedClass}</h3><ul>`;
        database[selectedBoss][selectedClass].forEach(item => {
          if (item.toLowerCase().includes(itemQuery)) {
            results += `<li>${item}</li>`;
          }
        });
        results += `</ul>`;
      } else {
        for (const [className, items] of Object.entries(database[selectedBoss])) {
          results += `<h3>${className}</h3><ul>`;
          items.forEach(item => {
            if (item.toLowerCase().includes(itemQuery)) {
              results += `<li>${item}</li>`;
            }
          });
          results += `</ul>`;
        }
      }
    } else if (selectedClass) {
      for (const [boss, classes] of Object.entries(database)) {
        if (classes[selectedClass]) {
          results += `<h2>${boss}</h2><h3>${selectedClass}</h3><ul>`;
          classes[selectedClass].forEach(item => {
            if (item.toLowerCase().includes(itemQuery)) {
              results += `<li>${item}</li>`;
            }
          });
          results += `</ul>`;
        }
      }
    } else {
      for (const [boss, classes] of Object.entries(database)) {
        for (const [className, items] of Object.entries(classes)) {
          items.forEach(item => {
            if (item.toLowerCase().includes(itemQuery)) {
              results += `<h2>${boss}</h2><h3>${className}</h3><ul><li>${item}</li></ul>`;
            }
          });
        }
      }
    }

    document.getElementById('results').addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
          const itemName = event.target.textContent;
          const itemImageName = itemName.replace(/ /g, '').toLowerCase() + '.jpg'; // Nome do arquivo da imagem
          const itemImageSrc = 'images/' + itemImageName; // Caminho da imagem
    
          // Atualiza o nome do item no cabeçalho do modal
          document.getElementById('itemModalLabel').textContent = itemName;
    
          // Atualiza a imagem no modal
          document.getElementById('itemModalImage').src = itemImageSrc;
    
          // Abre o modal
          $('#itemModal').modal('show'); // Abre o modal usando Bootstrap
        }
      });

    document.getElementById('results').innerHTML = results;
  }
  
