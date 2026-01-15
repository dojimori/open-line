# API endpoints documentation

## Auth Routes

### POST /api/auth/register

**request payload**

```json
{
  "username": "doujin22",
  "password": "password"
}
```

**response**
- status **201**
```json
{
  "message": "Registered succesfully, please login"
}
```

### POST /api/auth/login

**request payload**

```json
{
  "username": "doujin22",
  "password": "password"
}
```

**response**
- status **200**
```json
{
  "message": "Login succesfully"
}
```
- `after logging in, the user information is stored in the session.`