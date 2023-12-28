# to_do_list

Проект запущен <a href="http://95.163.231.52:3001/authentication" target="_blank">здесь</a> <br>
Код бэкенда админки <a href="https://github.com/ArseniyZh/DA-test-task/blob/main/backend/app/admin/admin_mixins.py" target="_blank">здесь</a> <br>
<hr>
Для того, чтобы добавить модель в админку необходимо унаследовать ее от миксина AdminModelMixin <br> <br>

<pre>
class SomeMode(Base, AdminModelMixin):
  ...
</pre>
После этого можно совершать CRUD-операции с этой моделью через веб-интерфейс
