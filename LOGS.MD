2026-01-26T21:12:44.037820562Z [err]  2026-01-26 21:12:37.484 UTC [321] ERROR:  relation "players" does not exist at character 151
2026-01-26T21:12:44.037827400Z [err]  2026-01-26 21:12:37.484 UTC [321] STATEMENT:  SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:12:44.037834073Z [err]  	FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id
2026-01-26T21:12:46.544222343Z [inf]   HTTP  1/26/2026 9:12:36 PM 100.64.0.2 GET /vite.svg
2026-01-26T21:12:46.544232263Z [inf]   HTTP  1/26/2026 9:12:36 PM 100.64.0.2 GET /assets/index-BLLbdB4T.js
2026-01-26T21:12:46.544232284Z [inf]   HTTP  1/26/2026 9:12:36 PM 100.64.0.2 Returned 304 in 2 ms
2026-01-26T21:12:46.544239192Z [inf]   HTTP  1/26/2026 9:12:37 PM 100.64.0.2 GET /vite.svg
2026-01-26T21:12:46.544242984Z [inf]   HTTP  1/26/2026 9:12:36 PM 100.64.0.2 Returned 200 in 6 ms
2026-01-26T21:12:46.544245141Z [inf]   HTTP  1/26/2026 9:12:37 PM 100.64.0.2 Returned 304 in 1 ms
2026-01-26T21:12:46.544250471Z [inf]   HTTP  1/26/2026 9:12:36 PM 100.64.0.2 GET /assets/index-AzQvfEJp.css
2026-01-26T21:12:46.544257016Z [inf]   HTTP  1/26/2026 9:12:36 PM 100.64.0.2 Returned 304 in 5 ms
2026-01-26T21:12:46.545541024Z [inf]   HTTP  1/26/2026 9:12:36 PM 100.64.0.2 GET /new?
2026-01-26T21:12:46.545545921Z [inf]   HTTP  1/26/2026 9:12:36 PM 100.64.0.2 Returned 200 in 24 ms
2026-01-26T21:12:46.897009062Z [err]    File "/app/routes/players.py", line 15, in get_players
2026-01-26T21:12:46.897014792Z [err]      ).outerjoin(GamePlayer).group_by(Player.id).all()
2026-01-26T21:12:46.897022892Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 917, in full_dispatch_request
2026-01-26T21:12:46.897028112Z [err]      rv = self.dispatch_request()
2026-01-26T21:12:46.897036412Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.897041892Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 902, in dispatch_request
2026-01-26T21:12:46.897052231Z [err]      return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
2026-01-26T21:12:46.897057771Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.897066771Z [err]      return self._execute_internal(
2026-01-26T21:12:46.897069901Z [err]                                                  ^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.897076661Z [err]      result: Union[ScalarResult[_T], Result[_T]] = self.session.execute(
2026-01-26T21:12:46.897080061Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.897090321Z [err]                                                    ^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.897092801Z [err]  [2026-01-26 21:12:37,487] ERROR in app: Exception on /api/players [GET]
2026-01-26T21:12:46.897105140Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2351, in execute
2026-01-26T21:12:46.897106300Z [err]  Traceback (most recent call last):
2026-01-26T21:12:46.897113290Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:12:46.897118710Z [err]      self.dialect.do_execute(
2026-01-26T21:12:46.897126150Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:12:46.897128640Z [err]             ^^^^^^^^^^^^
2026-01-26T21:12:46.897133490Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:12:46.897137510Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2857, in _iter
2026-01-26T21:12:46.897142299Z [err]  psycopg2.errors.UndefinedTable: relation "players" does not exist
2026-01-26T21:12:46.897150749Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:12:46.897156329Z [err]                                                  ^^^^^
2026-01-26T21:12:46.897159169Z [err]               ^
2026-01-26T21:12:46.897166239Z [err]  
2026-01-26T21:12:46.897170919Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2704, in all
2026-01-26T21:12:46.897175269Z [err]  
2026-01-26T21:12:46.897180399Z [err]      return self._iter().all()  # type: ignore
2026-01-26T21:12:46.897183569Z [err]  The above exception was the direct cause of the following exception:
2026-01-26T21:12:46.897188318Z [err]  
2026-01-26T21:12:46.897193278Z [err]  Traceback (most recent call last):
2026-01-26T21:12:46.897198758Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 1511, in wsgi_app
2026-01-26T21:12:46.897203818Z [err]      response = self.full_dispatch_request()
2026-01-26T21:12:46.897210388Z [err]                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.897215448Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 919, in full_dispatch_request
2026-01-26T21:12:46.897220268Z [err]      rv = self.handle_user_exception(e)
2026-01-26T21:12:46.897225328Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.897230968Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask_cors/extension.py", line 176, in wrapped_function
2026-01-26T21:12:46.897236517Z [err]      return cors_after_request(app.make_response(f(*args, **kwargs)))
2026-01-26T21:12:46.900541389Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2249, in _execute_internal
2026-01-26T21:12:46.900545338Z [err]      result: Result[Any] = compile_state_cls.orm_execute_statement(
2026-01-26T21:12:46.900548828Z [err]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.900552278Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/context.py", line 306, in orm_execute_statement
2026-01-26T21:12:46.900555608Z [err]      result = conn.execute(
2026-01-26T21:12:46.900559268Z [err]               ^^^^^^^^^^^^^
2026-01-26T21:12:46.900562868Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1419, in execute
2026-01-26T21:12:46.900566598Z [err]      return meth(
2026-01-26T21:12:46.900570138Z [err]             ^^^^^
2026-01-26T21:12:46.900573888Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/sql/elements.py", line 527, in _execute_on_connection
2026-01-26T21:12:46.900577318Z [err]      return connection._execute_clauseelement(
2026-01-26T21:12:46.900580998Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.900585258Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1641, in _execute_clauseelement
2026-01-26T21:12:46.900589137Z [err]      ret = self._execute_context(
2026-01-26T21:12:46.900593757Z [err]            ^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.900597107Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
2026-01-26T21:12:46.900600857Z [err]      return self._exec_single_context(
2026-01-26T21:12:46.900605358Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:12:46.900609188Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
2026-01-26T21:12:46.900613868Z [err]      self._handle_dbapi_exception(
2026-01-26T21:12:46.900736635Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2363, in _handle_dbapi_exception
2026-01-26T21:12:46.900740355Z [err]      raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
2026-01-26T21:12:46.900743575Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:12:46.900746805Z [err]      self.dialect.do_execute(
2026-01-26T21:12:46.900750395Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:12:46.900753915Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:12:46.900757305Z [err]  sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "players" does not exist
2026-01-26T21:12:46.900760815Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:12:46.900764335Z [err]               ^
2026-01-26T21:12:46.900768455Z [err]  
2026-01-26T21:12:46.900774595Z [err]  [SQL: SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:12:46.900777934Z [err]  FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id]
2026-01-26T21:12:46.900781524Z [err]  (Background on this error at: https://sqlalche.me/e/20/f405)
2026-01-26T21:13:55.884842257Z [err]  2026-01-26 21:13:52.203 UTC [321] ERROR:  relation "players" does not exist at character 151
2026-01-26T21:13:55.884856511Z [err]  2026-01-26 21:13:52.203 UTC [321] STATEMENT:  SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:13:55.884864587Z [err]  	FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id
2026-01-26T21:13:56.919428583Z [inf]   HTTP  1/26/2026 9:13:51 PM 100.64.0.3 GET /new?
2026-01-26T21:13:56.920252224Z [inf]   HTTP  1/26/2026 9:13:51 PM 100.64.0.3 Returned 304 in 8 ms
2026-01-26T21:13:56.920262853Z [inf]   HTTP  1/26/2026 9:13:51 PM 100.64.0.3 GET /assets/index-BLLbdB4T.js
2026-01-26T21:13:56.920270344Z [inf]   HTTP  1/26/2026 9:13:51 PM 100.64.0.3 Returned 304 in 2 ms
2026-01-26T21:13:56.920276680Z [inf]   HTTP  1/26/2026 9:13:51 PM 100.64.0.3 GET /assets/index-AzQvfEJp.css
2026-01-26T21:13:56.920378624Z [inf]   HTTP  1/26/2026 9:13:51 PM 100.64.0.3 Returned 304 in 2 ms
2026-01-26T21:13:56.920385680Z [inf]   HTTP  1/26/2026 9:13:51 PM 100.64.0.3 GET /vite.svg
2026-01-26T21:13:56.920392708Z [inf]   HTTP  1/26/2026 9:13:51 PM 100.64.0.3 Returned 304 in 3 ms
2026-01-26T21:13:56.920398973Z [inf]   HTTP  1/26/2026 9:13:52 PM 100.64.0.3 GET /vite.svg
2026-01-26T21:13:56.920405279Z [inf]   HTTP  1/26/2026 9:13:52 PM 100.64.0.3 Returned 304 in 3 ms
2026-01-26T21:13:57.004990241Z [err]      return cors_after_request(app.make_response(f(*args, **kwargs)))
2026-01-26T21:13:57.005001201Z [err]      self.dialect.do_execute(
2026-01-26T21:13:57.005013120Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:13:57.005015430Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 919, in full_dispatch_request
2026-01-26T21:13:57.005022010Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 1511, in wsgi_app
2026-01-26T21:13:57.005023810Z [err]      rv = self.handle_user_exception(e)
2026-01-26T21:13:57.005025730Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:13:57.005030680Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.005037240Z [err]  psycopg2.errors.UndefinedTable: relation "players" does not exist
2026-01-26T21:13:57.005038150Z [err]      response = self.full_dispatch_request()
2026-01-26T21:13:57.005039740Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask_cors/extension.py", line 176, in wrapped_function
2026-01-26T21:13:57.005044990Z [err]  The above exception was the direct cause of the following exception:
2026-01-26T21:13:57.005048900Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:13:57.005051360Z [err]                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.005053810Z [err]  [2026-01-26 21:13:52,208] ERROR in app: Exception on /api/players [GET]
2026-01-26T21:13:57.005056570Z [err]  
2026-01-26T21:13:57.005061259Z [err]  Traceback (most recent call last):
2026-01-26T21:13:57.005061909Z [err]               ^
2026-01-26T21:13:57.005064229Z [err]  Traceback (most recent call last):
2026-01-26T21:13:57.005066399Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:13:57.005070719Z [err]  
2026-01-26T21:13:57.005076569Z [err]  
2026-01-26T21:13:57.006675386Z [err]                                                  ^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.006680166Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 917, in full_dispatch_request
2026-01-26T21:13:57.006683886Z [err]      rv = self.dispatch_request()
2026-01-26T21:13:57.006689226Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.006693106Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 902, in dispatch_request
2026-01-26T21:13:57.006696926Z [err]      return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
2026-01-26T21:13:57.006700816Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.006704516Z [err]    File "/app/routes/players.py", line 15, in get_players
2026-01-26T21:13:57.006708306Z [err]      ).outerjoin(GamePlayer).group_by(Player.id).all()
2026-01-26T21:13:57.006714166Z [err]                                                  ^^^^^
2026-01-26T21:13:57.006717676Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2704, in all
2026-01-26T21:13:57.006721576Z [err]      return self._iter().all()  # type: ignore
2026-01-26T21:13:57.006725566Z [err]             ^^^^^^^^^^^^
2026-01-26T21:13:57.006729976Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2857, in _iter
2026-01-26T21:13:57.007089298Z [err]      result: Union[ScalarResult[_T], Result[_T]] = self.session.execute(
2026-01-26T21:13:57.007102668Z [err]                                                    ^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.007108608Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2351, in execute
2026-01-26T21:13:57.007114157Z [err]      return self._execute_internal(
2026-01-26T21:13:57.007118407Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.008809912Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2249, in _execute_internal
2026-01-26T21:13:57.008821222Z [err]      result: Result[Any] = compile_state_cls.orm_execute_statement(
2026-01-26T21:13:57.008826932Z [err]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.008831672Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/context.py", line 306, in orm_execute_statement
2026-01-26T21:13:57.008836721Z [err]      result = conn.execute(
2026-01-26T21:13:57.008841881Z [err]               ^^^^^^^^^^^^^
2026-01-26T21:13:57.008848881Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1419, in execute
2026-01-26T21:13:57.008853711Z [err]      return meth(
2026-01-26T21:13:57.008865031Z [err]             ^^^^^
2026-01-26T21:13:57.008870411Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/sql/elements.py", line 527, in _execute_on_connection
2026-01-26T21:13:57.008875101Z [err]      return connection._execute_clauseelement(
2026-01-26T21:13:57.008879601Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.008884340Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1641, in _execute_clauseelement
2026-01-26T21:13:57.008890670Z [err]      ret = self._execute_context(
2026-01-26T21:13:57.008895670Z [err]            ^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.008901290Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
2026-01-26T21:13:57.008906130Z [err]      return self._exec_single_context(
2026-01-26T21:13:57.008911580Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:13:57.008916160Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
2026-01-26T21:13:57.008921980Z [err]      self._handle_dbapi_exception(
2026-01-26T21:13:57.011562665Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2363, in _handle_dbapi_exception
2026-01-26T21:13:57.011570305Z [err]      raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
2026-01-26T21:13:57.011576175Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:13:57.011581895Z [err]      self.dialect.do_execute(
2026-01-26T21:13:57.011586704Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:13:57.011592174Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:13:57.011598384Z [err]  sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "players" does not exist
2026-01-26T21:13:57.011603814Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:13:57.011608274Z [err]               ^
2026-01-26T21:13:57.011613924Z [err]  
2026-01-26T21:13:57.011619174Z [err]  [SQL: SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:13:57.011623854Z [err]  FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id]
2026-01-26T21:13:57.011628554Z [err]  (Background on this error at: https://sqlalche.me/e/20/f405)
2026-01-26T21:17:00.000000000Z [inf]  Starting Container
2026-01-26T21:17:01.312046281Z [err]  [2026-01-26 21:17:00 +0000] [1] [INFO] Starting gunicorn 23.0.0
2026-01-26T21:17:01.312049976Z [err]  [2026-01-26 21:17:00 +0000] [1] [INFO] Listening at: http://0.0.0.0:8080 (1)
2026-01-26T21:17:01.312053131Z [err]  [2026-01-26 21:17:00 +0000] [1] [INFO] Using worker: sync
2026-01-26T21:17:01.312055665Z [err]  [2026-01-26 21:17:00 +0000] [4] [INFO] Booting worker with pid: 4
2026-01-26T21:17:05.000000000Z [inf]  Stopping Container
2026-01-26T21:17:06.694960896Z [err]  [2026-01-26 21:17:04 +0000] [1] [INFO] Handling signal: term
2026-01-26T21:17:06.694966526Z [err]  [2026-01-26 21:17:04 +0000] [4] [INFO] Worker exiting (pid: 4)
2026-01-26T21:17:06.694970836Z [err]  [2026-01-26 21:17:05 +0000] [1] [INFO] Shutting down: Master
2026-01-26T21:17:29.706437872Z [inf]   HTTP  1/26/2026 9:17:23 PM 100.64.0.4 GET /new?
2026-01-26T21:17:29.706443418Z [inf]   HTTP  1/26/2026 9:17:23 PM 100.64.0.4 Returned 304 in 2 ms
2026-01-26T21:17:29.706448174Z [inf]   HTTP  1/26/2026 9:17:24 PM 100.64.0.4 GET /assets/index-BLLbdB4T.js
2026-01-26T21:17:29.706452585Z [inf]   HTTP  1/26/2026 9:17:24 PM 100.64.0.4 Returned 304 in 1 ms
2026-01-26T21:17:29.706457584Z [inf]   HTTP  1/26/2026 9:17:24 PM 100.64.0.4 GET /assets/index-AzQvfEJp.css
2026-01-26T21:17:29.706462006Z [inf]   HTTP  1/26/2026 9:17:24 PM 100.64.0.4 Returned 304 in 1 ms
2026-01-26T21:17:29.706466368Z [inf]   HTTP  1/26/2026 9:17:24 PM 100.64.0.4 GET /vite.svg
2026-01-26T21:17:29.706470772Z [inf]   HTTP  1/26/2026 9:17:24 PM 100.64.0.4 Returned 304 in 1 ms
2026-01-26T21:17:29.706475319Z [inf]   HTTP  1/26/2026 9:17:24 PM 100.64.0.4 GET /vite.svg
2026-01-26T21:17:29.706479751Z [inf]   HTTP  1/26/2026 9:17:24 PM 100.64.0.4 Returned 304 in 1 ms
2026-01-26T21:17:29.706483628Z [inf]   HTTP  1/26/2026 9:17:27 PM 100.64.0.4 GET /new?
2026-01-26T21:17:29.706487976Z [inf]   HTTP  1/26/2026 9:17:27 PM 100.64.0.4 Returned 304 in 1 ms
2026-01-26T21:17:29.706493482Z [inf]   HTTP  1/26/2026 9:17:27 PM 100.64.0.4 GET /assets/index-BLLbdB4T.js
2026-01-26T21:17:29.706497570Z [inf]   HTTP  1/26/2026 9:17:27 PM 100.64.0.4 Returned 304 in 1 ms
2026-01-26T21:17:29.706501773Z [inf]   HTTP  1/26/2026 9:17:27 PM 100.64.0.4 GET /assets/index-AzQvfEJp.css
2026-01-26T21:17:29.706505927Z [inf]   HTTP  1/26/2026 9:17:27 PM 100.64.0.4 Returned 304 in 2 ms
2026-01-26T21:17:29.706510616Z [inf]   HTTP  1/26/2026 9:17:27 PM 100.64.0.4 GET /vite.svg
2026-01-26T21:17:29.706515847Z [inf]   HTTP  1/26/2026 9:17:27 PM 100.64.0.4 Returned 304 in 1 ms
2026-01-26T21:17:31.307438933Z [err]  [2026-01-26 21:17:24,882] ERROR in app: Exception on /api/players [GET]
2026-01-26T21:17:31.307439604Z [err]      return cors_after_request(app.make_response(f(*args, **kwargs)))
2026-01-26T21:17:31.307443540Z [err]  Traceback (most recent call last):
2026-01-26T21:17:31.307446254Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:17:31.307449790Z [err]      self.dialect.do_execute(
2026-01-26T21:17:31.307453285Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:17:31.307457071Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:17:31.307461167Z [err]  psycopg2.errors.UndefinedTable: relation "players" does not exist
2026-01-26T21:17:31.307464592Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:17:31.307468508Z [err]               ^
2026-01-26T21:17:31.307472133Z [err]  
2026-01-26T21:17:31.307475729Z [err]  
2026-01-26T21:17:31.307479554Z [err]  The above exception was the direct cause of the following exception:
2026-01-26T21:17:31.307482869Z [err]  
2026-01-26T21:17:31.307486485Z [err]  Traceback (most recent call last):
2026-01-26T21:17:31.307490130Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 1511, in wsgi_app
2026-01-26T21:17:31.307493505Z [err]      response = self.full_dispatch_request()
2026-01-26T21:17:31.307496490Z [err]                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.307499674Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 919, in full_dispatch_request
2026-01-26T21:17:31.307502108Z [err]      rv = self.handle_user_exception(e)
2026-01-26T21:17:31.307504892Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.307507246Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask_cors/extension.py", line 176, in wrapped_function
2026-01-26T21:17:31.307971542Z [err]                                                  ^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.307975388Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 917, in full_dispatch_request
2026-01-26T21:17:31.307976990Z [err]             ^^^^^^^^^^^^
2026-01-26T21:17:31.307978302Z [err]      rv = self.dispatch_request()
2026-01-26T21:17:31.307980866Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.307982619Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2857, in _iter
2026-01-26T21:17:31.307984141Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 902, in dispatch_request
2026-01-26T21:17:31.307985804Z [err]      result: Union[ScalarResult[_T], Result[_T]] = self.session.execute(
2026-01-26T21:17:31.307986765Z [err]      return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
2026-01-26T21:17:31.307988458Z [err]                                                    ^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.307990571Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.307991853Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2351, in execute
2026-01-26T21:17:31.307995158Z [err]    File "/app/routes/players.py", line 15, in get_players
2026-01-26T21:17:31.307995568Z [err]      return self._execute_internal(
2026-01-26T21:17:31.307998873Z [err]      ).outerjoin(GamePlayer).group_by(Player.id).all()
2026-01-26T21:17:31.308002449Z [err]                                                  ^^^^^
2026-01-26T21:17:31.308003160Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.308006364Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2704, in all
2026-01-26T21:17:31.308009629Z [err]      return self._iter().all()  # type: ignore
2026-01-26T21:17:31.308509349Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2249, in _execute_internal
2026-01-26T21:17:31.308512774Z [err]      result: Result[Any] = compile_state_cls.orm_execute_statement(
2026-01-26T21:17:31.308515298Z [err]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.308517721Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/context.py", line 306, in orm_execute_statement
2026-01-26T21:17:31.308520055Z [err]      result = conn.execute(
2026-01-26T21:17:31.308522989Z [err]               ^^^^^^^^^^^^^
2026-01-26T21:17:31.308525403Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1419, in execute
2026-01-26T21:17:31.308527676Z [err]      return meth(
2026-01-26T21:17:31.308529890Z [err]             ^^^^^
2026-01-26T21:17:31.308532193Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/sql/elements.py", line 527, in _execute_on_connection
2026-01-26T21:17:31.308534497Z [err]      return connection._execute_clauseelement(
2026-01-26T21:17:31.308536850Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.308539194Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1641, in _execute_clauseelement
2026-01-26T21:17:31.308542318Z [err]      ret = self._execute_context(
2026-01-26T21:17:31.308544652Z [err]            ^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.308546925Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
2026-01-26T21:17:31.308549259Z [err]      return self._exec_single_context(
2026-01-26T21:17:31.308551993Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.308554336Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
2026-01-26T21:17:31.308556590Z [err]      self._handle_dbapi_exception(
2026-01-26T21:17:31.309161487Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:17:31.309162629Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2363, in _handle_dbapi_exception
2026-01-26T21:17:31.309164902Z [err]      self.dialect.do_execute(
2026-01-26T21:17:31.309165874Z [err]      raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
2026-01-26T21:17:31.309167716Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:17:31.309168588Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:17:31.309171352Z [err]      self.dialect.do_execute(
2026-01-26T21:17:31.309173926Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:17:31.309176500Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:17:31.309179174Z [err]  sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "players" does not exist
2026-01-26T21:17:31.309182178Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:17:31.309184712Z [err]               ^
2026-01-26T21:17:31.309187085Z [err]  
2026-01-26T21:17:31.309189519Z [err]  [SQL: SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:17:31.309191813Z [err]  FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id]
2026-01-26T21:17:31.309194597Z [err]  (Background on this error at: https://sqlalche.me/e/20/f405)
2026-01-26T21:17:31.309196830Z [err]  [2026-01-26 21:17:27,728] ERROR in app: Exception on /api/players [GET]
2026-01-26T21:17:31.309199424Z [err]  Traceback (most recent call last):
2026-01-26T21:17:31.309866254Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 902, in dispatch_request
2026-01-26T21:17:31.309867566Z [err]      return cors_after_request(app.make_response(f(*args, **kwargs)))
2026-01-26T21:17:31.309870330Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:17:31.309870921Z [err]                                                  ^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.309870971Z [err]      rv = self.dispatch_request()
2026-01-26T21:17:31.309873765Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.309873926Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 917, in full_dispatch_request
2026-01-26T21:17:31.309874867Z [err]                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.309876460Z [err]  psycopg2.errors.UndefinedTable: relation "players" does not exist
2026-01-26T21:17:31.309878072Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 919, in full_dispatch_request
2026-01-26T21:17:31.309879885Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:17:31.309881016Z [err]      rv = self.handle_user_exception(e)
2026-01-26T21:17:31.309883841Z [err]               ^
2026-01-26T21:17:31.309883901Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.309886424Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask_cors/extension.py", line 176, in wrapped_function
2026-01-26T21:17:31.309887947Z [err]  
2026-01-26T21:17:31.309891051Z [err]  
2026-01-26T21:17:31.309893625Z [err]  The above exception was the direct cause of the following exception:
2026-01-26T21:17:31.309896269Z [err]  
2026-01-26T21:17:31.309898813Z [err]  Traceback (most recent call last):
2026-01-26T21:17:31.309901157Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 1511, in wsgi_app
2026-01-26T21:17:31.309903991Z [err]      response = self.full_dispatch_request()
2026-01-26T21:17:31.310437982Z [err]      return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
2026-01-26T21:17:31.310441497Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.310444652Z [err]    File "/app/routes/players.py", line 15, in get_players
2026-01-26T21:17:31.310447857Z [err]      ).outerjoin(GamePlayer).group_by(Player.id).all()
2026-01-26T21:17:31.310452123Z [err]                                                  ^^^^^
2026-01-26T21:17:31.310455568Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2704, in all
2026-01-26T21:17:31.310458693Z [err]      return self._iter().all()  # type: ignore
2026-01-26T21:17:31.310462248Z [err]             ^^^^^^^^^^^^
2026-01-26T21:17:31.310465623Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2857, in _iter
2026-01-26T21:17:31.310468748Z [err]      result: Union[ScalarResult[_T], Result[_T]] = self.session.execute(
2026-01-26T21:17:31.310471783Z [err]                                                    ^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.310474747Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2351, in execute
2026-01-26T21:17:31.310477752Z [err]      return self._execute_internal(
2026-01-26T21:17:31.310480426Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.310483090Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2249, in _execute_internal
2026-01-26T21:17:31.310485473Z [err]      result: Result[Any] = compile_state_cls.orm_execute_statement(
2026-01-26T21:17:31.310487736Z [err]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.310490320Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/context.py", line 306, in orm_execute_statement
2026-01-26T21:17:31.311026875Z [err]      result = conn.execute(
2026-01-26T21:17:31.311026885Z [err]      raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
2026-01-26T21:17:31.311029980Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:17:31.311030020Z [err]               ^^^^^^^^^^^^^
2026-01-26T21:17:31.311032714Z [err]      self.dialect.do_execute(
2026-01-26T21:17:31.311033225Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1419, in execute
2026-01-26T21:17:31.311036129Z [err]      return meth(
2026-01-26T21:17:31.311038803Z [err]             ^^^^^
2026-01-26T21:17:31.311042188Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/sql/elements.py", line 527, in _execute_on_connection
2026-01-26T21:17:31.311044331Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
2026-01-26T21:17:31.311045433Z [err]      return connection._execute_clauseelement(
2026-01-26T21:17:31.311048127Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.311049930Z [err]      return self._exec_single_context(
2026-01-26T21:17:31.311051232Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1641, in _execute_clauseelement
2026-01-26T21:17:31.311054236Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.311054276Z [err]      ret = self._execute_context(
2026-01-26T21:17:31.311056900Z [err]            ^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:17:31.311058322Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
2026-01-26T21:17:31.311061647Z [err]      self._handle_dbapi_exception(
2026-01-26T21:17:31.311065143Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2363, in _handle_dbapi_exception
2026-01-26T21:17:31.311535268Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:17:31.311537591Z [err]  (Background on this error at: https://sqlalche.me/e/20/f405)
2026-01-26T21:17:31.311539034Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:17:31.311543520Z [err]  sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "players" does not exist
2026-01-26T21:17:31.311546915Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:17:31.311549750Z [err]               ^
2026-01-26T21:17:31.311557261Z [err]  
2026-01-26T21:17:31.311561838Z [err]  [SQL: SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:17:31.311565583Z [err]  FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id]
2026-01-26T21:17:32.041031912Z [err]  2026-01-26 21:17:24.880 UTC [352] ERROR:  relation "players" does not exist at character 151
2026-01-26T21:17:32.041044514Z [err]  2026-01-26 21:17:24.880 UTC [352] STATEMENT:  SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:17:32.041092754Z [err]  	FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id
2026-01-26T21:17:32.041105767Z [err]  2026-01-26 21:17:27.725 UTC [352] ERROR:  relation "players" does not exist at character 151
2026-01-26T21:17:32.041116191Z [err]  2026-01-26 21:17:27.725 UTC [352] STATEMENT:  SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:17:32.041124438Z [err]  	FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id
2026-01-26T21:19:11.352707715Z [err]               ^
2026-01-26T21:19:11.352711370Z [err]  [2026-01-26 21:19:05,018] ERROR in app: Exception on /api/games [GET]
2026-01-26T21:19:11.352711550Z [err]                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.352712782Z [err]  
2026-01-26T21:19:11.352717239Z [err]  
2026-01-26T21:19:11.352717730Z [err]  Traceback (most recent call last):
2026-01-26T21:19:11.352718741Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 919, in full_dispatch_request
2026-01-26T21:19:11.352722056Z [err]  The above exception was the direct cause of the following exception:
2026-01-26T21:19:11.352722968Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:19:11.352723448Z [err]      rv = self.handle_user_exception(e)
2026-01-26T21:19:11.352726182Z [err]  
2026-01-26T21:19:11.352727174Z [err]      self.dialect.do_execute(
2026-01-26T21:19:11.352727785Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.352730198Z [err]  Traceback (most recent call last):
2026-01-26T21:19:11.352730889Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:19:11.352731861Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask_cors/extension.py", line 176, in wrapped_function
2026-01-26T21:19:11.352734064Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 1511, in wsgi_app
2026-01-26T21:19:11.352735627Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:19:11.352735817Z [err]      return cors_after_request(app.make_response(f(*args, **kwargs)))
2026-01-26T21:19:11.352737880Z [err]      response = self.full_dispatch_request()
2026-01-26T21:19:11.352739372Z [err]  psycopg2.errors.UndefinedTable: relation "games" does not exist
2026-01-26T21:19:11.352742697Z [err]  LINE 2: FROM games ORDER BY games.date_played DESC 
2026-01-26T21:19:11.353153794Z [err]      games = query.limit(50).all()
2026-01-26T21:19:11.353157980Z [err]              ^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353160564Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2351, in execute
2026-01-26T21:19:11.353161065Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2704, in all
2026-01-26T21:19:11.353164149Z [err]      return self._iter().all()  # type: ignore
2026-01-26T21:19:11.353167114Z [err]             ^^^^^^^^^^^^
2026-01-26T21:19:11.353167404Z [err]      return self._execute_internal(
2026-01-26T21:19:11.353168967Z [err]                                                  ^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353169878Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2857, in _iter
2026-01-26T21:19:11.353172001Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353173213Z [err]      result: Union[ScalarResult[_T], Result[_T]] = self.session.execute(
2026-01-26T21:19:11.353176207Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 917, in full_dispatch_request
2026-01-26T21:19:11.353176318Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2249, in _execute_internal
2026-01-26T21:19:11.353176338Z [err]                                                    ^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353180103Z [err]      rv = self.dispatch_request()
2026-01-26T21:19:11.353183448Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353186583Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 902, in dispatch_request
2026-01-26T21:19:11.353189658Z [err]      return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
2026-01-26T21:19:11.353193383Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353196478Z [err]    File "/app/routes/games.py", line 222, in list_games
2026-01-26T21:19:11.353580484Z [err]      result: Result[Any] = compile_state_cls.orm_execute_statement(
2026-01-26T21:19:11.353584440Z [err]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353587865Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/context.py", line 306, in orm_execute_statement
2026-01-26T21:19:11.353591300Z [err]      result = conn.execute(
2026-01-26T21:19:11.353594545Z [err]      return self._exec_single_context(
2026-01-26T21:19:11.353594765Z [err]               ^^^^^^^^^^^^^
2026-01-26T21:19:11.353599112Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1419, in execute
2026-01-26T21:19:11.353601816Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353602927Z [err]      return meth(
2026-01-26T21:19:11.353606282Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
2026-01-26T21:19:11.353606563Z [err]             ^^^^^
2026-01-26T21:19:11.353610369Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/sql/elements.py", line 527, in _execute_on_connection
2026-01-26T21:19:11.353610449Z [err]      self._handle_dbapi_exception(
2026-01-26T21:19:11.353614134Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2363, in _handle_dbapi_exception
2026-01-26T21:19:11.353614224Z [err]      return connection._execute_clauseelement(
2026-01-26T21:19:11.353617950Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353621545Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1641, in _execute_clauseelement
2026-01-26T21:19:11.353625491Z [err]      ret = self._execute_context(
2026-01-26T21:19:11.353628736Z [err]            ^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.353631821Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
2026-01-26T21:19:11.354102507Z [err]      raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
2026-01-26T21:19:11.354103178Z [err]      self.dialect.do_execute(
2026-01-26T21:19:11.354106923Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:19:11.354106973Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:19:11.354110318Z [err]      self.dialect.do_execute(
2026-01-26T21:19:11.354113493Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:19:11.354116768Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:19:11.354119843Z [err]  sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "games" does not exist
2026-01-26T21:19:11.354124099Z [err]  LINE 2: FROM games ORDER BY games.date_played DESC 
2026-01-26T21:19:11.354127224Z [err]               ^
2026-01-26T21:19:11.354130539Z [err]  
2026-01-26T21:19:11.354133744Z [err]  [SQL: SELECT games.id AS games_id, games.game_type AS games_game_type, games.target_score AS games_target_score, games.is_active AS games_is_active, games.date_played AS games_date_played 
2026-01-26T21:19:11.354136728Z [err]  FROM games ORDER BY games.date_played DESC 
2026-01-26T21:19:11.354139662Z [err]   LIMIT %(param_1)s]
2026-01-26T21:19:11.354144670Z [err]  [parameters: {'param_1': 50}]
2026-01-26T21:19:11.354148376Z [err]  (Background on this error at: https://sqlalche.me/e/20/f405)
2026-01-26T21:19:11.354151440Z [err]  [2026-01-26 21:19:09,592] ERROR in app: Exception on /api/stats/leaderboard [GET]
2026-01-26T21:19:11.354154405Z [err]  Traceback (most recent call last):
2026-01-26T21:19:11.354157589Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:19:11.354625311Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:19:11.354630579Z [err]  psycopg2.errors.UndefinedTable: relation "games" does not exist
2026-01-26T21:19:11.354633573Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 919, in full_dispatch_request
2026-01-26T21:19:11.354634054Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.354636728Z [err]                                                  ^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.354637790Z [err]  LINE 2: FROM games 
2026-01-26T21:19:11.354637900Z [err]      rv = self.handle_user_exception(e)
2026-01-26T21:19:11.354638861Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 902, in dispatch_request
2026-01-26T21:19:11.354641235Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 917, in full_dispatch_request
2026-01-26T21:19:11.354641796Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.354642246Z [err]               ^
2026-01-26T21:19:11.354645471Z [err]      rv = self.dispatch_request()
2026-01-26T21:19:11.354645792Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask_cors/extension.py", line 176, in wrapped_function
2026-01-26T21:19:11.354646923Z [err]  The above exception was the direct cause of the following exception:
2026-01-26T21:19:11.354647114Z [err]  
2026-01-26T21:19:11.354649607Z [err]      return cors_after_request(app.make_response(f(*args, **kwargs)))
2026-01-26T21:19:11.354650839Z [err]  
2026-01-26T21:19:11.354651570Z [err]  
2026-01-26T21:19:11.354654244Z [err]  Traceback (most recent call last):
2026-01-26T21:19:11.354657419Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 1511, in wsgi_app
2026-01-26T21:19:11.354660624Z [err]      response = self.full_dispatch_request()
2026-01-26T21:19:11.354663919Z [err]                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.354990499Z [err]      return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
2026-01-26T21:19:11.354994885Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.354998350Z [err]    File "/app/routes/games.py", line 233, in leaderboard
2026-01-26T21:19:11.355001625Z [err]      completed_games = Game.query.filter_by(is_active=False).all()
2026-01-26T21:19:11.355004850Z [err]                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.355012041Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2704, in all
2026-01-26T21:19:11.355016117Z [err]      return self._iter().all()  # type: ignore
2026-01-26T21:19:11.355019372Z [err]             ^^^^^^^^^^^^
2026-01-26T21:19:11.355022517Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2857, in _iter
2026-01-26T21:19:11.355025852Z [err]      result: Union[ScalarResult[_T], Result[_T]] = self.session.execute(
2026-01-26T21:19:11.355028866Z [err]                                                    ^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.355032191Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2351, in execute
2026-01-26T21:19:11.355035156Z [err]      return self._execute_internal(
2026-01-26T21:19:11.355038611Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.355042346Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2249, in _execute_internal
2026-01-26T21:19:11.355045691Z [err]      result: Result[Any] = compile_state_cls.orm_execute_statement(
2026-01-26T21:19:11.355050529Z [err]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.355060323Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/context.py", line 306, in orm_execute_statement
2026-01-26T21:19:11.355443278Z [err]      result = conn.execute(
2026-01-26T21:19:11.355452412Z [err]               ^^^^^^^^^^^^^
2026-01-26T21:19:11.355457038Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1419, in execute
2026-01-26T21:19:11.355462346Z [err]      return meth(
2026-01-26T21:19:11.355466152Z [err]             ^^^^^
2026-01-26T21:19:11.355475045Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/sql/elements.py", line 527, in _execute_on_connection
2026-01-26T21:19:11.355478891Z [err]      return connection._execute_clauseelement(
2026-01-26T21:19:11.355482477Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.355486543Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1641, in _execute_clauseelement
2026-01-26T21:19:11.355491290Z [err]      ret = self._execute_context(
2026-01-26T21:19:11.355495987Z [err]            ^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.355499863Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
2026-01-26T21:19:11.355503829Z [err]      return self._exec_single_context(
2026-01-26T21:19:11.355508345Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:19:11.355512221Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
2026-01-26T21:19:11.355516067Z [err]      self._handle_dbapi_exception(
2026-01-26T21:19:11.355519622Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2363, in _handle_dbapi_exception
2026-01-26T21:19:11.355524019Z [err]      raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
2026-01-26T21:19:11.355528105Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:19:11.355532141Z [err]      self.dialect.do_execute(
2026-01-26T21:19:11.355765752Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:19:11.355769888Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:19:11.355773273Z [err]  sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "games" does not exist
2026-01-26T21:19:11.355777099Z [err]  LINE 2: FROM games 
2026-01-26T21:19:11.355781575Z [err]               ^
2026-01-26T21:19:11.355785030Z [err]  
2026-01-26T21:19:11.355788846Z [err]  [SQL: SELECT games.id AS games_id, games.game_type AS games_game_type, games.target_score AS games_target_score, games.is_active AS games_is_active, games.date_played AS games_date_played 
2026-01-26T21:19:11.355792391Z [err]  FROM games 
2026-01-26T21:19:11.355795817Z [err]  WHERE games.is_active = false]
2026-01-26T21:19:11.355799833Z [err]  (Background on this error at: https://sqlalche.me/e/20/f405)
2026-01-26T21:19:13.924861137Z [err]  2026-01-26 21:19:05.016 UTC [352] ERROR:  relation "games" does not exist at character 189
2026-01-26T21:19:13.924870882Z [err]  2026-01-26 21:19:05.016 UTC [352] STATEMENT:  SELECT games.id AS games_id, games.game_type AS games_game_type, games.target_score AS games_target_score, games.is_active AS games_is_active, games.date_played AS games_date_played 
2026-01-26T21:19:13.924878504Z [err]  	FROM games ORDER BY games.date_played DESC 
2026-01-26T21:19:13.924887922Z [err]  	 LIMIT 50
2026-01-26T21:19:13.924895702Z [err]  2026-01-26 21:19:09.590 UTC [352] ERROR:  relation "games" does not exist at character 189
2026-01-26T21:19:13.924903054Z [err]  2026-01-26 21:19:09.590 UTC [352] STATEMENT:  SELECT games.id AS games_id, games.game_type AS games_game_type, games.target_score AS games_target_score, games.is_active AS games_is_active, games.date_played AS games_date_played 
2026-01-26T21:19:13.924909988Z [err]  	FROM games 
2026-01-26T21:19:13.924916874Z [err]  	WHERE games.is_active = false
2026-01-26T21:28:03.000000000Z [inf]  Starting Container
2026-01-26T21:28:04.275384091Z [err]  npm warn config production Use `--omit=dev` instead.
2026-01-26T21:28:04.275387701Z [inf]   INFO  Accepting connections at http://localhost:8080
2026-01-26T21:28:08.000000000Z [inf]  Stopping Container
2026-01-26T21:28:16.817109999Z [err]  npm error path /app
2026-01-26T21:28:16.817119378Z [err]  npm error command failed
2026-01-26T21:28:16.817127102Z [err]  npm error signal SIGTERM
2026-01-26T21:28:16.817133975Z [err]  npm error command sh -c serve -s dist -l 8080
2026-01-26T21:28:16.817141377Z [err]  npm error A complete log of this run can be found in: /root/.npm/_logs/2026-01-26T21_07_58_507Z-debug-0.log
2026-01-26T21:28:23.000000000Z [inf]  Starting Container
2026-01-26T21:28:23.531787004Z [err]  [2026-01-26 21:28:23 +0000] [1] [INFO] Starting gunicorn 23.0.0
2026-01-26T21:28:23.531790914Z [err]  [2026-01-26 21:28:23 +0000] [1] [INFO] Listening at: http://0.0.0.0:8080 (1)
2026-01-26T21:28:23.531794264Z [err]  [2026-01-26 21:28:23 +0000] [1] [INFO] Using worker: sync
2026-01-26T21:28:23.531796904Z [err]  [2026-01-26 21:28:23 +0000] [4] [INFO] Booting worker with pid: 4
2026-01-26T21:28:27.000000000Z [inf]  Stopping Container
2026-01-26T21:28:32.341850810Z [err]  [2026-01-26 21:28:26 +0000] [1] [INFO] Handling signal: term
2026-01-26T21:28:32.341856178Z [err]  [2026-01-26 21:28:26 +0000] [4] [INFO] Worker exiting (pid: 4)
2026-01-26T21:28:32.341859433Z [err]  [2026-01-26 21:28:27 +0000] [1] [INFO] Shutting down: Master
2026-01-26T21:38:22.321238172Z [err]  2026-01-26 21:38:21.197 UTC [415] ERROR:  relation "players" does not exist at character 151
2026-01-26T21:38:22.321253030Z [err]  2026-01-26 21:38:21.197 UTC [415] STATEMENT:  SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:38:22.321260122Z [err]  	FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id
2026-01-26T21:38:24.094360325Z [err]  2026-01-26 21:38:24.090 UTC [415] ERROR:  relation "players" does not exist at character 151
2026-01-26T21:38:24.094368766Z [err]  2026-01-26 21:38:24.090 UTC [415] STATEMENT:  SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:38:24.094374868Z [err]  	FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id
2026-01-26T21:38:25.359664710Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 GET /
2026-01-26T21:38:25.359669980Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 Returned 200 in 15 ms
2026-01-26T21:38:25.359675220Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 GET /assets/index-BLLbdB4T.js
2026-01-26T21:38:25.359680160Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 Returned 304 in 2 ms
2026-01-26T21:38:25.359684929Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 GET /assets/index-AzQvfEJp.css
2026-01-26T21:38:25.359688929Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 Returned 304 in 2 ms
2026-01-26T21:38:25.359692819Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 GET /vite.svg
2026-01-26T21:38:25.359697249Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 Returned 304 in 2 ms
2026-01-26T21:38:25.359702279Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 GET /vite.svg
2026-01-26T21:38:25.359706829Z [inf]   HTTP  1/26/2026 9:38:19 PM 100.64.0.2 Returned 304 in 1 ms
2026-01-26T21:38:25.359710829Z [inf]   HTTP  1/26/2026 9:38:23 PM 100.64.0.2 GET /new?
2026-01-26T21:38:25.359715579Z [inf]   HTTP  1/26/2026 9:38:23 PM 100.64.0.2 Returned 304 in 2 ms
2026-01-26T21:38:25.359719599Z [inf]   HTTP  1/26/2026 9:38:23 PM 100.64.0.2 GET /assets/index-AzQvfEJp.css
2026-01-26T21:38:25.359723699Z [inf]   HTTP  1/26/2026 9:38:23 PM 100.64.0.2 Returned 304 in 1 ms
2026-01-26T21:38:25.359728369Z [inf]   HTTP  1/26/2026 9:38:23 PM 100.64.0.2 GET /assets/index-BLLbdB4T.js
2026-01-26T21:38:25.359732039Z [inf]   HTTP  1/26/2026 9:38:23 PM 100.64.0.2 Returned 304 in 1 ms
2026-01-26T21:38:25.359737089Z [inf]   HTTP  1/26/2026 9:38:24 PM 100.64.0.2 GET /vite.svg
2026-01-26T21:38:25.359741178Z [inf]   HTTP  1/26/2026 9:38:24 PM 100.64.0.2 Returned 304 in 1 ms
2026-01-26T21:38:25.846508939Z [err]  [2026-01-26 21:38:21,198] ERROR in app: Exception on /api/players [GET]
2026-01-26T21:38:25.846511979Z [err]  Traceback (most recent call last):
2026-01-26T21:38:25.846515019Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:38:25.846518369Z [err]      self.dialect.do_execute(
2026-01-26T21:38:25.846521319Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:38:25.846523589Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:38:25.846526209Z [err]  psycopg2.errors.UndefinedTable: relation "players" does not exist
2026-01-26T21:38:25.846528889Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:38:25.846531369Z [err]               ^
2026-01-26T21:38:25.846535089Z [err]  
2026-01-26T21:38:25.846537459Z [err]  
2026-01-26T21:38:25.846540689Z [err]  The above exception was the direct cause of the following exception:
2026-01-26T21:38:25.846543479Z [err]  
2026-01-26T21:38:25.846545818Z [err]  Traceback (most recent call last):
2026-01-26T21:38:25.846548488Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 1511, in wsgi_app
2026-01-26T21:38:25.846551318Z [err]      response = self.full_dispatch_request()
2026-01-26T21:38:25.846553848Z [err]                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.846556308Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 919, in full_dispatch_request
2026-01-26T21:38:25.846558938Z [err]      rv = self.handle_user_exception(e)
2026-01-26T21:38:25.846561328Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.846565718Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask_cors/extension.py", line 176, in wrapped_function
2026-01-26T21:38:25.846569248Z [err]      return cors_after_request(app.make_response(f(*args, **kwargs)))
2026-01-26T21:38:25.847978899Z [err]                                                    ^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.847992799Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2351, in execute
2026-01-26T21:38:25.847998098Z [err]                                                  ^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.848001348Z [err]      return self._execute_internal(
2026-01-26T21:38:25.848009298Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.848017348Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 917, in full_dispatch_request
2026-01-26T21:38:25.848021078Z [err]      rv = self.dispatch_request()
2026-01-26T21:38:25.848024478Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.848039748Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 902, in dispatch_request
2026-01-26T21:38:25.848042868Z [err]      return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
2026-01-26T21:38:25.848046158Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.848062268Z [err]    File "/app/routes/players.py", line 15, in get_players
2026-01-26T21:38:25.848065138Z [err]      ).outerjoin(GamePlayer).group_by(Player.id).all()
2026-01-26T21:38:25.848068087Z [err]                                                  ^^^^^
2026-01-26T21:38:25.848070487Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2704, in all
2026-01-26T21:38:25.848082097Z [err]      return self._iter().all()  # type: ignore
2026-01-26T21:38:25.848085287Z [err]             ^^^^^^^^^^^^
2026-01-26T21:38:25.848088577Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2857, in _iter
2026-01-26T21:38:25.848091557Z [err]      result: Union[ScalarResult[_T], Result[_T]] = self.session.execute(
2026-01-26T21:38:25.849391039Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2249, in _execute_internal
2026-01-26T21:38:25.849395979Z [err]      result: Result[Any] = compile_state_cls.orm_execute_statement(
2026-01-26T21:38:25.849400239Z [err]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.849403669Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/context.py", line 306, in orm_execute_statement
2026-01-26T21:38:25.849410839Z [err]      result = conn.execute(
2026-01-26T21:38:25.849414799Z [err]               ^^^^^^^^^^^^^
2026-01-26T21:38:25.849419539Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1419, in execute
2026-01-26T21:38:25.849423399Z [err]      return meth(
2026-01-26T21:38:25.849427779Z [err]             ^^^^^
2026-01-26T21:38:25.849430989Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/sql/elements.py", line 527, in _execute_on_connection
2026-01-26T21:38:25.849434459Z [err]      return connection._execute_clauseelement(
2026-01-26T21:38:25.849437779Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.849441359Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1641, in _execute_clauseelement
2026-01-26T21:38:25.849444969Z [err]      ret = self._execute_context(
2026-01-26T21:38:25.849447969Z [err]            ^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.849451159Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
2026-01-26T21:38:25.849454198Z [err]      return self._exec_single_context(
2026-01-26T21:38:25.849458158Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.849461318Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
2026-01-26T21:38:25.849464578Z [err]      self._handle_dbapi_exception(
2026-01-26T21:38:25.850565553Z [err]  FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id]
2026-01-26T21:38:25.850571013Z [err]  (Background on this error at: https://sqlalche.me/e/20/f405)
2026-01-26T21:38:25.850574883Z [err]  [2026-01-26 21:38:24,091] ERROR in app: Exception on /api/players [GET]
2026-01-26T21:38:25.850578623Z [err]  Traceback (most recent call last):
2026-01-26T21:38:25.850582953Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:38:25.850588733Z [err]      self.dialect.do_execute(
2026-01-26T21:38:25.850592013Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:38:25.850600193Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2363, in _handle_dbapi_exception
2026-01-26T21:38:25.850605343Z [err]      raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
2026-01-26T21:38:25.850616343Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:38:25.850618813Z [err]      self.dialect.do_execute(
2026-01-26T21:38:25.850630653Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:38:25.850634052Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:38:25.850647122Z [err]  sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "players" does not exist
2026-01-26T21:38:25.850649892Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:38:25.850652612Z [err]               ^
2026-01-26T21:38:25.850655902Z [err]  
2026-01-26T21:38:25.850668842Z [err]  [SQL: SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:38:25.851601879Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:38:25.851612789Z [err]  psycopg2.errors.UndefinedTable: relation "players" does not exist
2026-01-26T21:38:25.851617679Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:38:25.851623189Z [err]               ^
2026-01-26T21:38:25.851628609Z [err]  
2026-01-26T21:38:25.851632929Z [err]  
2026-01-26T21:38:25.851636849Z [err]  The above exception was the direct cause of the following exception:
2026-01-26T21:38:25.851640259Z [err]  
2026-01-26T21:38:25.851643569Z [err]  Traceback (most recent call last):
2026-01-26T21:38:25.851647219Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 1511, in wsgi_app
2026-01-26T21:38:25.851650149Z [err]      response = self.full_dispatch_request()
2026-01-26T21:38:25.851652799Z [err]                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.851656259Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 919, in full_dispatch_request
2026-01-26T21:38:25.851659189Z [err]      rv = self.handle_user_exception(e)
2026-01-26T21:38:25.851661999Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.851664749Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask_cors/extension.py", line 176, in wrapped_function
2026-01-26T21:38:25.851667468Z [err]      return cors_after_request(app.make_response(f(*args, **kwargs)))
2026-01-26T21:38:25.851670328Z [err]                                                  ^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.851673538Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 917, in full_dispatch_request
2026-01-26T21:38:25.851677208Z [err]      rv = self.dispatch_request()
2026-01-26T21:38:25.851681378Z [err]           ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.851686058Z [err]    File "/opt/venv/lib/python3.12/site-packages/flask/app.py", line 902, in dispatch_request
2026-01-26T21:38:25.854882534Z [err]      return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args)  # type: ignore[no-any-return]
2026-01-26T21:38:25.854888994Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.854893264Z [err]    File "/app/routes/players.py", line 15, in get_players
2026-01-26T21:38:25.854896674Z [err]      ).outerjoin(GamePlayer).group_by(Player.id).all()
2026-01-26T21:38:25.854900483Z [err]                                                  ^^^^^
2026-01-26T21:38:25.854904483Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2704, in all
2026-01-26T21:38:25.854907593Z [err]      return self._iter().all()  # type: ignore
2026-01-26T21:38:25.854910623Z [err]             ^^^^^^^^^^^^
2026-01-26T21:38:25.854913903Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/query.py", line 2857, in _iter
2026-01-26T21:38:25.854917353Z [err]      result: Union[ScalarResult[_T], Result[_T]] = self.session.execute(
2026-01-26T21:38:25.854920193Z [err]                                                    ^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.854933743Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2351, in execute
2026-01-26T21:38:25.854937633Z [err]      return self._execute_internal(
2026-01-26T21:38:25.854940653Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.854943443Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/session.py", line 2249, in _execute_internal
2026-01-26T21:38:25.854946323Z [err]      result: Result[Any] = compile_state_cls.orm_execute_statement(
2026-01-26T21:38:25.854949343Z [err]                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.854952343Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/orm/context.py", line 306, in orm_execute_statement
2026-01-26T21:38:25.856314944Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 2363, in _handle_dbapi_exception
2026-01-26T21:38:25.856321704Z [err]      raise sqlalchemy_exception.with_traceback(exc_info[2]) from e
2026-01-26T21:38:25.856326924Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1967, in _exec_single_context
2026-01-26T21:38:25.856330934Z [err]      self.dialect.do_execute(
2026-01-26T21:38:25.856339764Z [err]      result = conn.execute(
2026-01-26T21:38:25.856344774Z [err]               ^^^^^^^^^^^^^
2026-01-26T21:38:25.856348264Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1419, in execute
2026-01-26T21:38:25.856351994Z [err]      return meth(
2026-01-26T21:38:25.856355193Z [err]             ^^^^^
2026-01-26T21:38:25.856358143Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/sql/elements.py", line 527, in _execute_on_connection
2026-01-26T21:38:25.856361783Z [err]      return connection._execute_clauseelement(
2026-01-26T21:38:25.856365063Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.856368513Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1641, in _execute_clauseelement
2026-01-26T21:38:25.856372193Z [err]      ret = self._execute_context(
2026-01-26T21:38:25.856375583Z [err]            ^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.856378463Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1846, in _execute_context
2026-01-26T21:38:25.856382123Z [err]      return self._exec_single_context(
2026-01-26T21:38:25.856385293Z [err]             ^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-01-26T21:38:25.856388683Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/base.py", line 1986, in _exec_single_context
2026-01-26T21:38:25.856391733Z [err]      self._handle_dbapi_exception(
2026-01-26T21:38:25.857330710Z [err]    File "/opt/venv/lib/python3.12/site-packages/sqlalchemy/engine/default.py", line 952, in do_execute
2026-01-26T21:38:25.857333570Z [err]      cursor.execute(statement, parameters)
2026-01-26T21:38:25.857336160Z [err]  sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedTable) relation "players" does not exist
2026-01-26T21:38:25.857339150Z [err]  LINE 2: FROM players LEFT OUTER JOIN game_players ON players.id = ga...
2026-01-26T21:38:25.857341960Z [err]               ^
2026-01-26T21:38:25.857344980Z [err]  
2026-01-26T21:38:25.857347780Z [err]  [SQL: SELECT players.id AS players_id, players.name AS players_name, players.created_at AS players_created_at, count(game_players.id) AS games_played 
2026-01-26T21:38:25.857349980Z [err]  FROM players LEFT OUTER JOIN game_players ON players.id = game_players.player_id GROUP BY players.id]
2026-01-26T21:38:25.857352280Z [err]  (Background on this error at: https://sqlalche.me/e/20/f405)