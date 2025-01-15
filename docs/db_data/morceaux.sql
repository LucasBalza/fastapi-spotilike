-- Insertion des morceaux pour Alice Wonderland - "Reflections"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('The Dreamer', 3.45, (SELECT id FROM artistes WHERE nom_artiste = 'Alice Wonderland'), (SELECT id FROM albums WHERE titre = 'Reflections')),
('Echoes', 4.12, (SELECT id FROM artistes WHERE nom_artiste = 'Alice Wonderland'), (SELECT id FROM albums WHERE titre = 'Reflections'));

-- Insertion des morceaux pour Alice Wonderland - "Lost in Dreams"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Lost', 4.30, (SELECT id FROM artistes WHERE nom_artiste = 'Alice Wonderland'), (SELECT id FROM albums WHERE titre = 'Lost in Dreams')),
('Invisible', 3.59, (SELECT id FROM artistes WHERE nom_artiste = 'Alice Wonderland'), (SELECT id FROM albums WHERE titre = 'Lost in Dreams'));

-- Insertion des morceaux pour Bob Steel - "Steelheart"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Heavy Metal Heart', 5.15, (SELECT id FROM artistes WHERE nom_artiste = 'Bob Steel'), (SELECT id FROM albums WHERE titre = 'Steelheart')),
('Iron Will', 4.42, (SELECT id FROM artistes WHERE nom_artiste = 'Bob Steel'), (SELECT id FROM albums WHERE titre = 'Steelheart'));

-- Insertion des morceaux pour Bob Steel - "Firestorm"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Flames of Rock', 5.05, (SELECT id FROM artistes WHERE nom_artiste = 'Bob Steel'), (SELECT id FROM albums WHERE titre = 'Firestorm')),
('Stormy Nights', 4.28, (SELECT id FROM artistes WHERE nom_artiste = 'Bob Steel'), (SELECT id FROM albums WHERE titre = 'Firestorm'));

-- Insertion des morceaux pour Charlie Velvet - "Echoes of Velvet"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Whispers', 3.50, (SELECT id FROM artistes WHERE nom_artiste = 'Charlie Velvet'), (SELECT id FROM albums WHERE titre = 'Echoes of Velvet')),
('Velvet Dreams', 4.02, (SELECT id FROM artistes WHERE nom_artiste = 'Charlie Velvet'), (SELECT id FROM albums WHERE titre = 'Echoes of Velvet'));

-- Insertion des morceaux pour Charlie Velvet - "Sonic Dreams"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Sonic Waves', 4.15, (SELECT id FROM artistes WHERE nom_artiste = 'Charlie Velvet'), (SELECT id FROM albums WHERE titre = 'Sonic Dreams')),
('Electric Sun', 3.58, (SELECT id FROM artistes WHERE nom_artiste = 'Charlie Velvet'), (SELECT id FROM albums WHERE titre = 'Sonic Dreams'));

-- Insertion des morceaux pour Diana Storm - "Stormy Nights"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Raindrops', 4.05, (SELECT id FROM artistes WHERE nom_artiste = 'Diana Storm'), (SELECT id FROM albums WHERE titre = 'Stormy Nights')),
('Thunderstruck', 4.50, (SELECT id FROM artistes WHERE nom_artiste = 'Diana Storm'), (SELECT id FROM albums WHERE titre = 'Stormy Nights'));

-- Insertion des morceaux pour Diana Storm - "Heart of the Storm"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Broken Heart', 4.20, (SELECT id FROM artistes WHERE nom_artiste = 'Diana Storm'), (SELECT id FROM albums WHERE titre = 'Heart of the Storm')),
('The Storm Within', 5.00, (SELECT id FROM artistes WHERE nom_artiste = 'Diana Storm'), (SELECT id FROM albums WHERE titre = 'Heart of the Storm'));

-- Insertion des morceaux pour Elvis Fuego - "Fuego Vivo"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Viva La Fuego', 3.45, (SELECT id FROM artistes WHERE nom_artiste = 'Elvis Fuego'), (SELECT id FROM albums WHERE titre = 'Fuego Vivo')),
('Fuego en Mi Alma', 4.10, (SELECT id FROM artistes WHERE nom_artiste = 'Elvis Fuego'), (SELECT id FROM albums WHERE titre = 'Fuego Vivo'));

-- Insertion des morceaux pour Elvis Fuego - "Ritmos del Corazon"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Corazon Ardiente', 4.30, (SELECT id FROM artistes WHERE nom_artiste = 'Elvis Fuego'), (SELECT id FROM albums WHERE titre = 'Ritmos del Corazon')),
('Baila Conmigo', 3.55, (SELECT id FROM artistes WHERE nom_artiste = 'Elvis Fuego'), (SELECT id FROM albums WHERE titre = 'Ritmos del Corazon'));

-- Insertion des morceaux pour Freddie Moon - "Moonlight Magic"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Starlight', 3.30, (SELECT id FROM artistes WHERE nom_artiste = 'Freddie Moon'), (SELECT id FROM albums WHERE titre = 'Moonlight Magic')),
('Dancing in the Moonlight', 4.20, (SELECT id FROM artistes WHERE nom_artiste = 'Freddie Moon'), (SELECT id FROM albums WHERE titre = 'Moonlight Magic'));

-- Insertion des morceaux pour Freddie Moon - "Pop Chronicles"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Pop Revolution', 3.50, (SELECT id FROM artistes WHERE nom_artiste = 'Freddie Moon'), (SELECT id FROM albums WHERE titre = 'Pop Chronicles')),
('Under the Spotlight', 4.00, (SELECT id FROM artistes WHERE nom_artiste = 'Freddie Moon'), (SELECT id FROM albums WHERE titre = 'Pop Chronicles'));

-- Insertion des morceaux pour Grace Phoenix - "Phoenix Rising"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Rise Again', 4.30, (SELECT id FROM artistes WHERE nom_artiste = 'Grace Phoenix'), (SELECT id FROM albums WHERE titre = 'Phoenix Rising')),
('The Fire Within', 3.55, (SELECT id FROM artistes WHERE nom_artiste = 'Grace Phoenix'), (SELECT id FROM albums WHERE titre = 'Phoenix Rising'));

-- Insertion des morceaux pour Grace Phoenix - "Free Spirit"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Unchained', 4.10, (SELECT id FROM artistes WHERE nom_artiste = 'Grace Phoenix'), (SELECT id FROM albums WHERE titre = 'Free Spirit')),
('Wild Heart', 4.20, (SELECT id FROM artistes WHERE nom_artiste = 'Grace Phoenix'), (SELECT id FROM albums WHERE titre = 'Free Spirit'));

-- Insertion des morceaux pour Hugo Blitz - "Symphonic Fury"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Fury of the Gods', 5.10, (SELECT id FROM artistes WHERE nom_artiste = 'Hugo Blitz'), (SELECT id FROM albums WHERE titre = 'Symphonic Fury')),
('Echoes of War', 4.50, (SELECT id FROM artistes WHERE nom_artiste = 'Hugo Blitz'), (SELECT id FROM albums WHERE titre = 'Symphonic Fury'));

-- Insertion des morceaux pour Hugo Blitz - "Blitzkrieg Metal"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Blitzkrieg', 4.45, (SELECT id FROM artistes WHERE nom_artiste = 'Hugo Blitz'), (SELECT id FROM albums WHERE titre = 'Blitzkrieg Metal')),
('Metalstorm', 5.20, (SELECT id FROM artistes WHERE nom_artiste = 'Hugo Blitz'), (SELECT id FROM albums WHERE titre = 'Blitzkrieg Metal'));

-- Insertion des morceaux pour Isla Blue - "Blue Skies"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Blue Sky', 4.00, (SELECT id FROM artistes WHERE nom_artiste = 'Isla Blue'), (SELECT id FROM albums WHERE titre = 'Blue Skies')),
('Whispers in the Wind', 3.45, (SELECT id FROM artistes WHERE nom_artiste = 'Isla Blue'), (SELECT id FROM albums WHERE titre = 'Blue Skies'));

-- Insertion des morceaux pour Isla Blue - "Whispers of the Sea"
INSERT INTO morceaux (titre, duree, artiste_id, album_id) VALUES
('Sea Breeze', 3.50, (SELECT id FROM artistes WHERE nom_artiste = 'Isla Blue'), (SELECT id FROM albums WHERE titre = 'Whispers of the Sea')),
('Ocean of Dreams', 4.30, (SELECT id FROM artistes WHERE nom_artiste = 'Isla Blue'), (SELECT id FROM albums WHERE titre = 'Whispers of the Sea'));
