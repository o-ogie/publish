 WITH RECURSIVE comments (id, content, depth, parentid, createdAt, updatedAt, boardid, userid, PATH) AS (
SELECT id, content, depth, parentid, createdAt, updatedAt, boardid, userid, id
FROM Comment
WHERE parentid = 0
UNION ALL
SELECT t.id, t.content, comments.depth + 1, t.parentid, t.createdAt, t.updatedAt, t.boardid, t.userid, PATH
FROM comments
JOIN Comment t ON comments.id = t.parentid
)
SELECT comments.*, B.userimg
FROM comments
JOIN User AS B
ON comments.userid = B.userid
WHERE comments.boardid = 1
ORDER BY PATH;





WITH RECURSIVE comments (id, content, depth, parentid, createdAt, updatedAt, boardid, userid, PATH) AS (
SELECT id, content, depth, parentid, createdAt, updatedAt, boardid, userid, id
FROM Comment
WHERE parentid = 0
UNION ALL
SELECT t.id, t.content, comments.depth + 1, t.parentid, t.createdAt, t.updatedAt, t.boardid, t.userid, PATH
FROM comments
JOIN Comment t ON comments.id = t.parentid
)
SELECT comments.*, B.userimg
FROM comments
JOIN User AS B
ON comments.userid = B.userid
WHERE comments.boardid = 1
ORDER BY PATH;