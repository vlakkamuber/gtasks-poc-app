-- User_Events Result

SELECT 'id', 'user_id', 'session_id', 'page', 'actions', 'city', 'properties', 'other_details', 'create_time'
UNION ALL
SELECT COALESCE(UE.id, ""), COALESCE(UE.user_id, ""), COALESCE(UE.session_id, ""), COALESCE(UE.page, ""), COALESCE(UE.actions, ""), COALESCE(UE.city, ""), COALESCE(UE.properties, ""), COALESCE(UE.other_details, ""), COALESCE(convert_tz(UE.create_time,'+00:00','+05:30'), '')
FROM `dcag-db`.`user_events` UE
JOIN  `dcag-db`.`users` U on UE.user_id = U.ID
WHERE U.user_type = 'DRIVER'
ORDER BY 9 DESC;


-- User Result

SELECT 'id', 'email', 'first_name', 'last_name', 'city_name', 'user_type', 'phone_number', 'preferred_lang', 'native_lang', 'create_time'
UNION ALL
SELECT COALESCE(id, ""), COALESCE(email, ""), COALESCE(first_name, ""), COALESCE(last_name, ""), COALESCE(city_name, ""), COALESCE(user_type, ""), COALESCE(phone_number, ""), COALESCE(preferred_lang, ""), COALESCE(native_lang, ""), COALESCE(convert_tz(create_time,'+00:00','+05:30'), "")
FROM `dcag-db`.`users`
WHERE user_type = 'DRIVER';


-- Task Result


SELECT 'id', 'name', 'task_type', 'max_number_of_users', 'input', 'status', 'city', 'lang', 'currency', 'price', 'create_time', 'last_updated_time', 'due_time', 'start_time', 'is_available', 'task_category'
UNION ALL
SELECT COALESCE(id, ""), COALESCE(name, ""), COALESCE(task_type, ""), COALESCE(max_number_of_users, ""), COALESCE(input, ""), COALESCE(status, ""), COALESCE(city, ""), COALESCE(lang, ""), COALESCE(currency, ""), COALESCE(price, ""), COALESCE(convert_tz(create_time,'+00:00','+05:30'), ""), COALESCE(convert_tz(last_updated_time,'+00:00','+05:30'), ""), COALESCE(convert_tz(due_time,'+00:00','+05:30'), ""), COALESCE(convert_tz(start_time,'+00:00','+05:30'), ""), COALESCE(is_available, ""), COALESCE(task_category, "")
FROM `dcag-db`.`tasks`;


-- UserIssues Resuly

SELECT 'id', 'user_id', 'task_type', 'summary', 'description', 'create_time'
UNION ALL
SELECT COALESCE(UI.id, ""), COALESCE(UI.user_id, ""), COALESCE(UI.task_type, ""), COALESCE(UI.summary, ""), COALESCE(UI.description, ""), COALESCE(convert_tz(UI.create_time,'+00:00','+05:30'), "")
FROM `dcag-db`.`user_issues` UI
JOIN  `dcag-db`.`users` U on UI.user_id = U.ID
WHERE U.user_type = 'DRIVER'
ORDER BY 6 DESC;


-- UserTasks Result


SELECT 'id', 'user_id', 'task_id', 'status', 'use_input_as_output', 'output', 'output_desc', 'start_time', 'completion_time', 'last_updated_time'
UNION ALL
SELECT COALESCE(UT.id, ""), COALESCE(UT.user_id, ""), COALESCE(UT.task_id, ""), COALESCE(UT.status, ""), COALESCE(UT.use_input_as_output, ""), COALESCE(UT.output, ""), COALESCE(UT.output_desc, ""), COALESCE(convert_tz(UT.start_time,'+00:00','+05:30'), ""), COALESCE(convert_tz(UT.completion_time,'+00:00','+05:30'), ""), COALESCE(convert_tz(UT.last_updated_time,'+00:00','+05:30'), "")
FROM `dcag-db`.`user_tasks` UT
JOIN  `dcag-db`.`users` U on UT.user_id = U.ID
WHERE U.user_type = 'DRIVER'
ORDER BY 10 DESC;


-- UserTask Status

SELECT 'user_id','phone_number','task_type','status','city_name','start_time (IST)'
UNION ALL
select COALESCE(UT.user_id, ''), COALESCE(U.phone_number, ''), COALESCE(T.task_type, ''),COALESCE(UT.status, ''),COALESCE(U.city_name, ''),COALESCE(convert_tz(UT.start_time,'+00:00','+05:30'), '')
FROM `dcag-db`.`user_tasks` UT
JOIN `dcag-db`.`tasks` T ON UT.task_id = T.id
JOIN  `dcag-db`.`users` U on UT.user_id = U.ID
where U.user_type = 'DRIVER'
order by 6 desc;


-- UserTask Output

SELECT 'id', 'user_id', 'task_id', 'task_type', 'output', 'last_updated_time (IST)'
UNION ALL
SELECT UT.id, UT.user_id, UT.task_id, T.task_type, COALESCE(UT.output, ""), COALESCE(convert_tz(UT.last_updated_time,'+00:00','+05:30'), "")
FROM `dcag-db`.`user_tasks` UT
JOIN `dcag-db`.`tasks` T ON UT.task_id = T.id
JOIN  `dcag-db`.`users` U on UT.user_id = U.ID
WHERE UT.status = 'COMPLETED'
AND T.task_type = 'RECEIPT_DIGITIZATION'
AND U.user_type = 'DRIVER'
ORDER BY 6 desc;