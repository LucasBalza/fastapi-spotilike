-- Association des morceaux avec leurs genres dans la table morceau_genre
INSERT INTO morceau_genre (morceau_id, genre_id)
VALUES
-- Alice Wonderland
((SELECT id FROM morceaux WHERE titre = 'The Dreamer'), (SELECT id FROM genres WHERE titre = 'Electro')),
((SELECT id FROM morceaux WHERE titre = 'Echoes'), (SELECT id FROM genres WHERE titre = 'Electro')),
((SELECT id FROM morceaux WHERE titre = 'Lost'), (SELECT id FROM genres WHERE titre = 'Pop')),
((SELECT id FROM morceaux WHERE titre = 'Invisible'), (SELECT id FROM genres WHERE titre = 'Pop')),

-- Bob Steel
((SELECT id FROM morceaux WHERE titre = 'Heavy Metal Heart'), (SELECT id FROM genres WHERE titre = 'Metal')),
((SELECT id FROM morceaux WHERE titre = 'Iron Will'), (SELECT id FROM genres WHERE titre = 'Metal')),
((SELECT id FROM morceaux WHERE titre = 'Flames of Rock'), (SELECT id FROM genres WHERE titre = 'Metal')),
((SELECT id FROM morceaux WHERE titre = 'Stormy Nights'), (SELECT id FROM genres WHERE titre = 'Metal')),

-- Charlie Velvet
((SELECT id FROM morceaux WHERE titre = 'Whispers'), (SELECT id FROM genres WHERE titre = 'Jazz')),
((SELECT id FROM morceaux WHERE titre = 'Velvet Dreams'), (SELECT id FROM genres WHERE titre = 'Jazz')),
((SELECT id FROM morceaux WHERE titre = 'Sonic Waves'), (SELECT id FROM genres WHERE titre = 'Electro')),
((SELECT id FROM morceaux WHERE titre = 'Electric Sun'), (SELECT id FROM genres WHERE titre = 'Electro')),

-- Diana Storm
((SELECT id FROM morceaux WHERE titre = 'Raindrops'), (SELECT id FROM genres WHERE titre = 'Pop')),
((SELECT id FROM morceaux WHERE titre = 'Thunderstruck'), (SELECT id FROM genres WHERE titre = 'Pop')),
((SELECT id FROM morceaux WHERE titre = 'Broken Heart'), (SELECT id FROM genres WHERE titre = 'Pop')),
((SELECT id FROM morceaux WHERE titre = 'The Storm Within'), (SELECT id FROM genres WHERE titre = 'Pop')),

-- Elvis Fuego
((SELECT id FROM morceaux WHERE titre = 'Viva La Fuego'), (SELECT id FROM genres WHERE titre = 'R&B')),
((SELECT id FROM morceaux WHERE titre = 'Fuego en Mi Alma'), (SELECT id FROM genres WHERE titre = 'R&B')),
((SELECT id FROM morceaux WHERE titre = 'Corazon Ardiente'), (SELECT id FROM genres WHERE titre = 'R&B')),
((SELECT id FROM morceaux WHERE titre = 'Baila Conmigo'), (SELECT id FROM genres WHERE titre = 'R&B')),

-- Freddie Moon
((SELECT id FROM morceaux WHERE titre = 'Starlight'), (SELECT id FROM genres WHERE titre = 'Pop')),
((SELECT id FROM morceaux WHERE titre = 'Dancing in the Moonlight'), (SELECT id FROM genres WHERE titre = 'Pop')),
((SELECT id FROM morceaux WHERE titre = 'Pop Revolution'), (SELECT id FROM genres WHERE titre = 'Pop')),
((SELECT id FROM morceaux WHERE titre = 'Under the Spotlight'), (SELECT id FROM genres WHERE titre = 'Pop')),

-- Grace Phoenix
((SELECT id FROM morceaux WHERE titre = 'Rise Again'), (SELECT id FROM genres WHERE titre = 'Rock')),
((SELECT id FROM morceaux WHERE titre = 'The Fire Within'), (SELECT id FROM genres WHERE titre = 'Rock')),
((SELECT id FROM morceaux WHERE titre = 'Unchained'), (SELECT id FROM genres WHERE titre = 'Rock')),
((SELECT id FROM morceaux WHERE titre = 'Wild Heart'), (SELECT id FROM genres WHERE titre = 'Rock')),

-- Hugo Blitz
((SELECT id FROM morceaux WHERE titre = 'Fury of the Gods'), (SELECT id FROM genres WHERE titre = 'Classique')),
((SELECT id FROM morceaux WHERE titre = 'Echoes of War'), (SELECT id FROM genres WHERE titre = 'Classique')),
((SELECT id FROM morceaux WHERE titre = 'Blitzkrieg'), (SELECT id FROM genres WHERE titre = 'Metal')),
((SELECT id FROM morceaux WHERE titre = 'Metalstorm'), (SELECT id FROM genres WHERE titre = 'Metal')),

-- Isla Blue
((SELECT id FROM morceaux WHERE titre = 'Blue Sky'), (SELECT id FROM genres WHERE titre = 'Blues')),
((SELECT id FROM morceaux WHERE titre = 'Whispers in the Wind'), (SELECT id FROM genres WHERE titre = 'Blues')),
((SELECT id FROM morceaux WHERE titre = 'Sea Breeze'), (SELECT id FROM genres WHERE titre = 'Blues')),
((SELECT id FROM morceaux WHERE titre = 'Ocean of Dreams'), (SELECT id FROM genres WHERE titre = 'Blues'));
