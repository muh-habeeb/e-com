http://localhost:9999/api/users/auth : login post
http://localhost:9999/api/users/ create =POST GET/put = all userdata for admin
http://localhost:9999/api/users/ id GET/put/delete = all userdata/update for admin
http://localhost:9999/api/users/logout : login post
http://localhost:9999/api/users/profile current user method= get/put see/update

# kill sever

```shell
netstat -ano | findstr :9999
```
 ull see the running 
```shell
TCP    [::]:9999   [::]:0   LISTENING   1234
```
 kill with port
````bash
taskkill /PID 1234 /F```
````
