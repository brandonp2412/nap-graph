create view date_duration as
select UUID() as id, sum(duration) as total_duration, u.login, nap.local_date
from nap
    inner join jhi_user u on u.id = nap.user_id
group by u.login, nap.local_date
