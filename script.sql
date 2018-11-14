CREATE TABLE IF NOT EXISTS BASE_ITEM(itemid SERIAL, itemame varchar(100),
imagePath varchar(500), washingprice integer,category varchar(50), datecreated timestamp);

INSERT INTO BASE_ITEM(itemame,imagePath,washingprice,category, datecreated)
values
('cardigal', '/asset/Images/casual_cardigal_men.jpg', 200,'men', NOW()),
('colored trouser', '/asset/Images/casual_colored_trouser.jpg', 150,'men', NOW()),
('colored 3 piece suit', '/asset/Images/colored_3_piece_suit.jpg', 200,'men', NOW()),
('colored full agbdada', '/asset/Images/colored_full_agbada_set_men.png', 200,'men', NOW()),
('long sleeve', '/asset/Images/colored_long_sleeve.jpg', 200,'men', NOW()),
('colored tuxedo', '/asset/Images/tuxedo_men_colored.jpg', 200,'men', NOW()),
('colored 2 piece suit', '/asset/Images/white_2_piece_suit.jpg', 200,'men', NOW()),
('white trouser', '/asset/Images/white_trouser_men.jpg', 200,'men', NOW()),
('white full agbada', '/asset/Images/white_full_agbada.jpg', 200,'men', NOW()),
('white polo', '/asset/Images/white_polo_men.jpg', 200,'men', NOW()),
('white tuxedo', '/asset/Images/white_complete_tuxedo.jpg', 200,'men', NOW()),
('colored shorts', '/asset/Images/colored_shorts.jpg', 200,'men', NOW());