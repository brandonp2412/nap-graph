create view duration_rating as
select UUID() as id, duration, avg(rating) as average_rating, u.login
from nap
    inner join jhi_user u on u.id = nap.user_id
group by duration, u.login
