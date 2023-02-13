
SELECT 
      A.id,
      A.userid, 
      A.subject, 
      A.introduce,
      A.createdAt, 
      A.hit,
      A.image,
      A.category,
      A.state,
      B.userImg,
      B.nickname,
      (SELECT GROUP_CONCAT(D.userid SEPARATOR ', ') FROM Liked AS D WHERE A.id = D.boardid) AS likeidlist,
      GROUP_CONCAT(C.tagname SEPARATOR ', ') AS tagname,
      (SELECT COUNT(boardid) FROM Comment WHERE boardid = A.id) AS commentCount, 
      (SELECT COUNT(BoardId) FROM Liked WHERE BoardId = A.id) AS likeCount
      FROM Board AS A 
      JOIN User AS B 
      ON A.userid = B.userid
      JOIN Hashtag AS C
      ON A.id = C.boardid
      JOIN History AS D ON A.id = D.boardid
      Where A.userid = 'web7722'
      GROUP BY A.id
      ORDER BY A.id DESC;







      SELECT 
                A.id,
                A.userid, 
                A.subject, 
                A.introduce,
                A.createdAt, 
                A.hit,
                A.image,
                A.category,
                A.state,
                B.userImg,
                B.nickname,
                (SELECT GROUP_CONCAT(D.userid SEPARATOR ', ') FROM Liked AS D WHERE A.id = D.boardid) AS likeidlist,
                GROUP_CONCAT(C.tagname SEPARATOR ', ') AS tagname,
                (SELECT COUNT(boardid) FROM Comment WHERE boardid = A.id) AS commentCount, 
                (SELECT COUNT(BoardId) FROM Liked WHERE BoardId = A.id) AS likeCount
                FROM Board AS A 
                JOIN User AS B 
                ON A.userid = B.userid
                JOIN Hashtag AS C
                ON A.id = C.boardid
                JOIN History AS D ON A.id = D.boardid
                Where A.userid = 'web7722'
                GROUP BY A.id
                ORDER BY A.id DESC;