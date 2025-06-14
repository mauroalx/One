from fastapi import Request, HTTPException, status, Depends

def require_auth():
    async def wrapper(request: Request):
        user = getattr(request.state, "user", None)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Não autenticado")
        return user
    return Depends(wrapper)
