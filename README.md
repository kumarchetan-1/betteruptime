![Steps](task-1.png)


```bash
docker run -p 5432:5432 -d -e POSTGRES_DB=postgres -e POSTGRES_PASSWORD=postgres --name=postgres-local postgres 
```