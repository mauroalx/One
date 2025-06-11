from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from app.core.security import decode_token, get_token_from_header

class ExtractUserMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        token = get_token_from_header(request)
        if token:
            try:
                request.state.user = decode_token(token)
            except Exception:
                request.state.user = None
        else:
            request.state.user = None
        return await call_next(request)
