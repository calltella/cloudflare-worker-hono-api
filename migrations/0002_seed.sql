-- Migration number: 0003 	 2026-02-01T05:31:47.635Z

-- Insert User
INSERT INTO User ( email, name) VALUES ('yuichi.asa+local@gmail.com', 'Yuichi Asa (local)');

-- Insert notes
INSERT INTO notes ( title, content, createdAt) VALUES ('ローカルテスト', 'local d1 ok', datetime('now'));"

