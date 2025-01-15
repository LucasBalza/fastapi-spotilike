-- Insertion des albums pour Alice Wonderland
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Reflections', 'reflections.jpg', '2023-05-10', (SELECT id FROM artistes WHERE nom_artiste = 'Alice Wonderland')),
('Lost in Dreams', 'lost_in_dreams.jpg', '2021-09-15', (SELECT id FROM artistes WHERE nom_artiste = 'Alice Wonderland'));

-- Insertion des albums pour Bob Steel
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Steelheart', 'steelheart.jpg', '2022-03-05', (SELECT id FROM artistes WHERE nom_artiste = 'Bob Steel')),
('Firestorm', 'firestorm.jpg', '2020-07-22', (SELECT id FROM artistes WHERE nom_artiste = 'Bob Steel'));

-- Insertion des albums pour Charlie Velvet
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Echoes of Velvet', 'echoes_of_velvet.jpg', '2023-02-12', (SELECT id FROM artistes WHERE nom_artiste = 'Charlie Velvet')),
('Sonic Dreams', 'sonic_dreams.jpg', '2021-11-30', (SELECT id FROM artistes WHERE nom_artiste = 'Charlie Velvet'));

-- Insertion des albums pour Diana Storm
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Stormy Nights', 'stormy_nights.jpg', '2022-06-18', (SELECT id FROM artistes WHERE nom_artiste = 'Diana Storm')),
('Heart of the Storm', 'heart_of_the_storm.jpg', '2020-08-05', (SELECT id FROM artistes WHERE nom_artiste = 'Diana Storm'));

-- Insertion des albums pour Elvis Fuego
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Fuego Vivo', 'fuego_vivo.jpg', '2023-01-20', (SELECT id FROM artistes WHERE nom_artiste = 'Elvis Fuego')),
('Ritmos del Corazon', 'ritmos_del_corazon.jpg', '2021-10-10', (SELECT id FROM artistes WHERE nom_artiste = 'Elvis Fuego'));

-- Insertion des albums pour Freddie Moon
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Moonlight Magic', 'moonlight_magic.jpg', '2023-04-25', (SELECT id FROM artistes WHERE nom_artiste = 'Freddie Moon')),
('Pop Chronicles', 'pop_chronicles.jpg', '2022-01-15', (SELECT id FROM artistes WHERE nom_artiste = 'Freddie Moon'));

-- Insertion des albums pour Grace Phoenix
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Phoenix Rising', 'phoenix_rising.jpg', '2022-11-30', (SELECT id FROM artistes WHERE nom_artiste = 'Grace Phoenix')),
('Free Spirit', 'free_spirit.jpg', '2020-03-10', (SELECT id FROM artistes WHERE nom_artiste = 'Grace Phoenix'));

-- Insertion des albums pour Hugo Blitz
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Symphonic Fury', 'symphonic_fury.jpg', '2022-02-15', (SELECT id FROM artistes WHERE nom_artiste = 'Hugo Blitz')),
('Blitzkrieg Metal', 'blitzkrieg_metal.jpg', '2020-09-05', (SELECT id FROM artistes WHERE nom_artiste = 'Hugo Blitz'));

-- Insertion des albums pour Isla Blue
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Blue Skies', 'blue_skies.jpg', '2022-07-20', (SELECT id FROM artistes WHERE nom_artiste = 'Isla Blue')),
('Whispers of the Sea', 'whispers_of_the_sea.jpg', '2021-05-18', (SELECT id FROM artistes WHERE nom_artiste = 'Isla Blue'));

-- Insertion des albums pour Jack Rockwell
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Rock On Fire', 'rock_on_fire.jpg', '2022-09-12', (SELECT id FROM artistes WHERE nom_artiste = 'Jack Rockwell')),
('Wild Heart', 'wild_heart.jpg', '2021-02-14', (SELECT id FROM artistes WHERE nom_artiste = 'Jack Rockwell'));

-- Insertion des albums pour Kara Swift
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Swift Melody', 'swift_melody.jpg', '2023-01-10', (SELECT id FROM artistes WHERE nom_artiste = 'Kara Swift')),
('Country Roads', 'country_roads.jpg', '2021-11-20', (SELECT id FROM artistes WHERE nom_artiste = 'Kara Swift'));

-- Insertion des albums pour Luca Dark
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Dark Beats', 'dark_beats.jpg', '2022-10-05', (SELECT id FROM artistes WHERE nom_artiste = 'Luca Dark')),
('Electric Dreams', 'electric_dreams.jpg', '2020-12-15', (SELECT id FROM artistes WHERE nom_artiste = 'Luca Dark'));

-- Insertion des albums pour Maya Sun
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Solar Winds', 'solar_winds.jpg', '2023-03-30', (SELECT id FROM artistes WHERE nom_artiste = 'Maya Sun')),
('Cosmic Journey', 'cosmic_journey.jpg', '2021-06-10', (SELECT id FROM artistes WHERE nom_artiste = 'Maya Sun'));

-- Insertion des albums pour Nathan Cross
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Blues in the Rain', 'blues_in_the_rain.jpg', '2022-08-25', (SELECT id FROM artistes WHERE nom_artiste = 'Nathan Cross')),
('Crossroads', 'crossroads.jpg', '2020-04-18', (SELECT id FROM artistes WHERE nom_artiste = 'Nathan Cross'));

-- Insertion des albums pour Olivia Rain
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Soul Storm', 'soul_storm.jpg', '2022-12-01', (SELECT id FROM artistes WHERE nom_artiste = 'Olivia Rain')),
('Heartfelt', 'heartfelt.jpg', '2020-09-30', (SELECT id FROM artistes WHERE nom_artiste = 'Olivia Rain'));

-- Insertion des albums pour Pablo Rojas
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Flamenco Fire', 'flamenco_fire.jpg', '2022-05-15', (SELECT id FROM artistes WHERE nom_artiste = 'Pablo Rojas')),
('Guitar Dreams', 'guitar_dreams.jpg', '2020-11-20', (SELECT id FROM artistes WHERE nom_artiste = 'Pablo Rojas'));

-- Insertion des albums pour Quinn Rivers
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Electric Echo', 'electric_echo.jpg', '2023-06-10', (SELECT id FROM artistes WHERE nom_artiste = 'Quinn Rivers')),
('Waves of Sound', 'waves_of_sound.jpg', '2021-03-30', (SELECT id FROM artistes WHERE nom_artiste = 'Quinn Rivers'));

-- Insertion des albums pour Rita Blaze
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Blaze of Glory', 'blaze_of_glory.jpg', '2022-04-25', (SELECT id FROM artistes WHERE nom_artiste = 'Rita Blaze')),
('Punk Revolution', 'punk_revolution.jpg', '2021-07-12', (SELECT id FROM artistes WHERE nom_artiste = 'Rita Blaze'));

-- Insertion des albums pour Steve Hawk
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Wings of Solitude', 'wings_of_solitude.jpg', '2022-03-05', (SELECT id FROM artistes WHERE nom_artiste = 'Steve Hawk')),
('Echoes of Silence', 'echoes_of_silence.jpg', '2021-09-20', (SELECT id FROM artistes WHERE nom_artiste = 'Steve Hawk'));

-- Insertion des albums pour Tara Snow
INSERT INTO albums (titre, pochette, date_sortie, artiste_id) VALUES
('Snowflakes', 'snowflakes.jpg', '2023-01-05', (SELECT id FROM artistes WHERE nom_artiste = 'Tara Snow')),
('Nature\'s Song', 'natures_song.jpg', '2020-12-10', (SELECT id FROM artistes WHERE nom_artiste = 'Tara Snow'));
